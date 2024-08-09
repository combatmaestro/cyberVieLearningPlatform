import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAssessmentQuestions,
  submitAssessmentReview,
} from "../../actions/assessmentAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircle from "@material-ui/icons/CheckCircle";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        margin: "0 60px",
        display: "flex",
        justifyContent: "space-between",
    },
    content: {
        width: "746px",
    // backgroundColor: "white",
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

const QuestionSection = ({ match }) => {
    const classes = useStyles();
    const { id } = match.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const dispatch = useDispatch();
  const { loading, questions, error } = useSelector(
    (state) => state.assessment
  );
    const [answers, setAnswers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
    const user = useSelector((state) => state.user);
  const history = useHistory();
    useEffect(() => {
        dispatch(getAssessmentQuestions(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (questions?.Questions?.length > 0) {
      setAnswers(Array(questions.Questions.length).fill(""));
        }
    }, [questions]);

    const handleNextQuestion = () => {
    if (answers[currentIndex].trim() !== "") {
            if (currentIndex < questions[0].Questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                // navigate('/completion'); // Redirect to the completion page
            }
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

  const handleSubmit = async() => {
    const answeredQuestions = questions[0]?.Questions?.map(
      (question, index) => ({
        question: question.question,
        answer: answers[index],
        marksAllocated: question.totalMarks,
        answerStatus: "under review",
      })
    );

        const assesmentSubmit = {
      userId: user.data._id,
      submittedBy: user.data.name,
      moduleId: id,
      questionandanswers: answeredQuestions,
      assessmentStatus: "submitted",
    };
   setShowLoading(true);
   const response = await dispatch(submitAssessmentReview(assesmentSubmit));
   if(response.status === 200){
    setShowLoading(false);
    setShowSubmitted(true);
   }
  };

  const handleSuccessModalClose = () =>{
    setShowSubmitted(false);
    history.push("/")
  }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const currentQuestion = questions[0]?.Questions?.[currentIndex] || {};

    return (
    <>
        <Box className={classes.root}>
            <Box className={classes.content}>
                <Typography variant="h4" gutterBottom>
                    Question {currentQuestion?.sno}
                </Typography>
        <Typography variant="body1" style={{ marginBottom: "30px" }}>
                    {currentQuestion?.question}
                </Typography>
                <Box className={classes.questionBox}>
                    <textarea
                        placeholder="Write your answer here:"
                        style={{
              width: "100%",
              height: "450px",
              padding: "8px",
              borderRadius: "8px",
              border: "0.5px solid #ccc",
                        }}
            value={answers[currentIndex] || ""}
                        onChange={handleTextareaChange}
                    />
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
                    <Button
                        onClick={handleNextQuestion}
                        variant="contained"
                        style={{
                            background:
                                "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
                        }}
            disabled={answers[currentIndex]?.trim() === ""}
                    >
            {currentIndex === questions?.Questions?.length - 1
              ? "Submit"
              : "Save & Proceed"}
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
                        Save & End Test
                    </Button>
                </Box>
                <Typography
                    variant="body2"
                    color="textSecondary"
          style={{ marginTop: "0px", marginBottom: "30px" }}
                >
          • {answers.filter((answer) => answer.trim() !== "").length} Answered •{" "}
          {answers.filter((answer) => answer.trim() === "").length} Unanswered
                </Typography>
                <Box className={classes.questionNav}>
                    {questions[0]?.Questions?.map((question, index) => (
                        <Button
                            key={question._id}
                            className={`${classes.numBtn} ${
                                answers[index] ? classes.completedNumBtn : ""
              } ${currentIndex === index ? classes.activeNumBtn : ""}`}
                            variant="outlined"
                            onClick={() => setCurrentIndex(index)}
                        >
                            {question.sno}
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
              display:"flex",
              alignItems: "center",
              justifyContent: "center",
              // left: "120px",
              top: "20px",
              paddingInline: "50px",
              backgroundColor: "green",
              background:
                "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
            }}
            variant="contained"
            color="primary"
            onClick={handleSuccessModalClose}
          >
            OK
          </Button>
        </div>
      </Modal>
  </>  );
};

export default QuestionSection;
