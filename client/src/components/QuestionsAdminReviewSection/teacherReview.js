import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    margin: "0 60px",
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    width: "746px",
    boxShadow: "none",
  },
  sidebar: {
    width: "30%",
  },
  questionBox: {
    marginBottom: theme.spacing(0),
    borderRadius: "8px",
    minHeight: "300px",
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tickIcon: {
    fontSize: "48px",
    color: "green",
  },
  navigationButtons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Ensures the input and buttons align properly
  },
  marksInput: {
    width: "50%",
  },
  questionNav: {
    display: "flex",
    flexDirection: "row",
    width: "110%",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(3),
  },
  endBtn: {
    position: "relative",
    top: "-22px",
  },
  sidebarHeader: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
    flexDirection: "row",
  },
  numBtn: {
    height: "43px",
    padding: "20px 24px",
    border: "1px solid #AAAAA",
  },
  activeNumBtn: {
    background:
      "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
    color: "white",
  },
  completedNumBtn: {
    backgroundColor: "green",
    color: "white",
  },
}));

const TeacherReview = () => {
  const classes = useStyles();
  const location = useLocation();
  const { assignment } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [marks, setMarks] = useState([]);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [finalizedAssignment, setFinalizedAssignment] = useState(assignment);
  const [showLoading, setShowLoading] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const history = useHistory();

  // Initialize the answers and marks state
  useEffect(() => {
    if (assignment?.questionAndAnswers) {
      const initialAnswers = assignment.questionAndAnswers.map(
        (q) => q.answer || ""
      );
      setAnswers(initialAnswers);

      const initialMarks = assignment.questionAndAnswers.map(
        (q) => q.marksAllocated || "" // Assuming you have marksAllocated as a field
      );
      setMarks(initialMarks);
    }
  }, [assignment]);

  const handleNextQuestion = () => {
    const currentMark = marks[currentIndex];

    if (
      !finalizedAssignment.questionAndAnswers[currentIndex].finalMark &&
      currentMark
    ) {
      setReviewedCount((prevCount) => prevCount + 1);
    }

    setFinalizedAssignment((prevAssignment) => {
      const updatedQuestionAndAnswers = [...prevAssignment.questionAndAnswers];
      updatedQuestionAndAnswers[currentIndex] = {
        ...updatedQuestionAndAnswers[currentIndex],
        finalMark: currentMark,
      };
      return {
        ...prevAssignment,
        questionAndAnswers: updatedQuestionAndAnswers,
      };
    });

    if (currentIndex < assignment.questionAndAnswers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTextareaChange = (event) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = event.target.value;
    setAnswers(newAnswers);
  };

  const handleMarksChange = (event) => {
    const newMarks = [...marks];
    newMarks[currentIndex] = event.target.value;
    setMarks(newMarks);
  };

  const handleSubmit = async () => {
    setShowLoading(true);
    // Simulate a successful submission after 2 seconds
    setTimeout(() => {
      setShowLoading(false);
      setShowSubmitted(true);
    }, 2000);
  };

  const handleSuccessModalClose = () => {
    setShowSubmitted(false);
    history.push("/home");
  };

  if (!assignment) return <p>No assignment found</p>;

  const currentQuestion = assignment.questionAndAnswers[currentIndex];

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.content}>
          <Typography variant="h4" gutterBottom>
            Question {currentIndex + 1}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "30px" }}>
            {currentQuestion?.question}
          </Typography>
          <Box className={classes.questionBox}>
            {/* <textarea
              placeholder="Write your answer here:"
              style={{
                width: "100%",
                height: "450px",
                padding: "8px",
                borderRadius: "8px",
                border: "0.5px solid #ccc",
                overflowY: "auto",
              }}
              value={answers[currentIndex] || ""}
              onChange={handleTextareaChange}
              disabled
            /> */}
            <div
              style={{
                width: "100%",
                height: "450px",
                padding: "8px",
                borderRadius: "8px",
                border: "0.5px solid #ccc",
                overflowY: "auto",
                backgroundColor: "#f9f9f9", // Disabled textarea background color
                color: "#aaa", // Disabled textarea text color
                whiteSpace: "pre-wrap", // Preserve white space and line breaks
                cursor: "not-allowed", // Show the disabled cursor
              }}
            >
              {answers[currentIndex] || "Write your answer here:"}
            </div>
            <Typography variant="caption" gutterBottom>
              Write in 500 words
            </Typography>
          </Box>
          <Box className={classes.navigationButtons}>
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentIndex === 0}
              variant="outlined"
            >
              Previous
            </Button>
            <TextField
              className={classes.marksInput}
              label="Marks out of 10"
              variant="outlined"
              type="number"
              value={marks[currentIndex] || ""}
              onChange={handleMarksChange}
              inputProps={{ min: 0, max: 10 }}
            />
            <Button
              onClick={handleNextQuestion}
              variant="contained"
              style={{
                background:
                  "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
              }}
              disabled={answers[currentIndex]?.trim() === ""}
            >
              {currentIndex === assignment.questionAndAnswers.length - 1
                ? "Submit"
                : "Proceed"}
            </Button>
          </Box>
        </Box>
        <Box className={classes.sidebar}>
          <Box className={classes.sidebarHeader}>
            <Typography style={{ marginBottom: "50px" }} variant="h6">
              Module Assessment
            </Typography>
            <Button
              className={classes.endBtn}
              variant="outlined"
              color="secondary"
              onClick={handleSubmit}
            >
              Save and Exit Review
            </Button>
          </Box>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginTop: "0px", marginBottom: "30px" }}
          >
            • {reviewedCount} Reviewed •{" "}
            {assignment.questionAndAnswers.length - reviewedCount} To Review
          </Typography>
          <Box className={classes.questionNav}>
            {assignment?.questionAndAnswers?.map((question, index) => (
              <Button
                key={question._id}
                className={`${classes.numBtn} ${
                  answers[index] ? classes.completedNumBtn : ""
                } ${currentIndex === index ? classes.activeNumBtn : ""}`}
                variant="outlined"
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
      <Modal
        open={showLoading}
        aria-labelledby="loading-modal-title"
        aria-describedby="loading-modal-description"
      >
        <div className={classes.modalContent}>
          <CircularProgress />
          <Typography style={{ textAlign: "center" }} variant="body2">
            Assessment submitting...
          </Typography>
        </div>
      </Modal>

      <Modal
        open={showSubmitted}
        onClose={handleSuccessModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContent}>
          <CheckCircle className={classes.tickIcon} />
          <Typography
            style={{ textAlign: "center" }}
            variant="h6"
            id="simple-modal-title"
            gutterBottom
          >
            Success!
          </Typography>
          <Typography
            style={{ textAlign: "center" }}
            variant="body2"
            id="simple-modal-description"
          >
            Assessment under review by your Trainer.
          </Typography>
          <Button
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: "20px",
              paddingInline: "50px",
              background:
                "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
            }}
            variant="contained"
            color="primary"
            onClick={handleSuccessModalClose}
          >
            Back to Home
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TeacherReview;
