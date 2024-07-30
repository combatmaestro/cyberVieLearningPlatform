import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ControlledAccordion from "../Accordion/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { getModule } from "../../actions/moduleAction";
import { Redirect } from "react-router-dom";
import { useStyles } from "./style";
import CongratulationsDialog from "../CongratulationsDialog/Dialog";
import { Button, Box, Typography, Modal } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Module(props) {
  document.title = "Module";
  const classes = useStyles();
  const { id } = props.match.params;
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const module = useSelector((state) => state.module);
  const [showCongratulationsDialog, setShowCongratulationsDialog] =
    useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const showCongratulations = () => setShowCongratulationsDialog(true);
  const onClose = () => setShowCongratulationsDialog(false);

  const initialState = {
    title: "",
    topic: [],
  };

  const { loading, moduleData = initialState, error } = module;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setAssessmentOpen(false);
  };

  const routeToAssessment = () => {
    history.push(`assessment/${id}`);
  };

  const openAssessmentGuidelines = () => {
    setAssessmentOpen(true);
  };

  useEffect(() => {
    dispatch(getModule(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;

  if (error) return <Redirect to={{ pathname: "/home" }} />;

  return (
    <div className={classes.root}>
      <div className={classes.moduleHeaderContainer}>
        <h2 className="moduleHeader">{moduleData.title}</h2>
        <Button
          type="submit"
          variant="contained"
          className={classes.assessmentButton}
          onClick={openAssessmentGuidelines}
        >
          Take Assessment
        </Button>
      </div>
      <div className={classes.accordionContainer}>
        {moduleData.topic.map((topic, index) => {
          return (
            <div className="accordionStyles" key={topic._id}>
              <ControlledAccordion
                index={index + 1}
                expanded={expanded}
                handleChange={handleChange}
                topic={topic}
                showCongratulations={showCongratulations}
              />
            </div>
          );
        })}
      </div>
      <CongratulationsDialog
        open={showCongratulationsDialog}
        onClose={onClose}
      />
      <Modal
        open={assessmentOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          p={3}
          maxWidth={400}
          className={classes.guidelines}
          style={{ backgroundColor: "white" }}
        >
          <Typography variant="h6" gutterBottom>
            Guidelines for Assessment
          </Typography>
          <Typography variant="body1" paragraph>
            • This assessment is a part of module 1: Pre-requisite for
            Cybersecurity.
          </Typography>
          <Typography variant="body1" paragraph>
            • The assessment contains 10 questions, out of which you have to
            attempt any 7 questions.
          </Typography>
          <Typography variant="body1" paragraph>
            • You have 60 minutes to take this assessment.
          </Typography>
          <Typography variant="body1" paragraph>
            • All questions carry 10 marks and incorrect answers carry -1 mark
            for each question.
          </Typography>
          <Typography variant="body1" paragraph>
            • No marks will be given or deducted for unattempted questions.
          </Typography>
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            sx={{ gap: "10px" }}
          >
            <Button
              className={classes.cancelBtn}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className={classes.guidelinesBtn}
              variant="contained"
              color="primary"
              onClick={routeToAssessment}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Module;
