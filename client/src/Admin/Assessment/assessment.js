import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { getAllModules } from "../../actions/moduleAction";
import { addNewModule, editCurrentModule } from "../../actions/moduleAction";
import { Link } from "react-router-dom";
import AssessmentDialogue from "./assessmentDialogue";
import Loader from "../../components/Loader/Loader";
import SideDrawer from "../Drawer/SideDrawer";
import SuccessBar from "../SnackBar/SuccessBar";
import ErrorBar from "../SnackBar/ErrorBar";
import { getAllAssessments } from "../../actions/assessmentAction";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { addAssessment } from "../../actions/assessmentAction";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {},
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    "& .MuiSvgIcon-root": {
      width: 15,
      height: 15,
      color: "#4285f4",
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
  modalContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
  tickIcon: {
    color: "green",
    fontSize: "4rem",
    position: "relative",
    textAlign: "center",
    left: "145px",
  },
}));

function Assessment() {
  document.title = "Assessment";
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const { data: moduleData = [] } = modules;

  const [open, setOpen] = useState(false);
  const [editModule, setEditModule] = useState(null);
  const [message, setMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { assessment, loading, error } = useSelector((state) => state.assessment);

  useEffect(() => {
    dispatch(getAllAssessments());
    dispatch(getAllModules());
  }, [dispatch]);

  const handleClickOpen = () => {
    setEditModule(null);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  const editModuleHandler = (module) => {
    setEditModule(module);
    setOpen(true);
  };

  const getModuleNameById = (id) => {
    const module = moduleData.find((module) => module._id === id);
    return module ? module.title : "Unknown Module";
  };

  const submitHandler = async (e, selectedModule, questions) => {
    e.preventDefault();
    const validQuestions = questions.filter(
      (question) => question.title && question.marks
    );
    const assessmentData = {
      selectedModule: selectedModule,
      questions: validQuestions,
    };
    const response = await dispatch(addAssessment(assessmentData));
    if (response && response.status === 200) {
      dispatch(getAllAssessments());
      setOpen(false);
      setSuccessModalOpen(true);
    } else {
      setMessage(response?.error || "An error occurred");
      setOpenFailure(true);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  if (loading) return <Loader />;

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: "Module Name",
          field: "moduleName",
          sort: "asc",
        },
        {
          label: "Total Questions",
          field: "totalQuestions",
          sort: "asc",
        },
        {
          label: "Type",
          field: "type",
          sort: "asc",
        },
      ],
      rows: [],
    };

    assessment?.forEach((assessment) => {
      data.rows.push({
        moduleName: getModuleNameById(assessment.moduleId),
        totalQuestions: (assessment.Questions && assessment.Questions.length) || 0,
        type: "Assessment",
      });
    });

    return data;
  };

  return (
    <>
      <SuccessBar
        handleClose={handleCloseBar}
        openSuccess={openSuccess}
        message={message}
      />
      <ErrorBar
        openFailure={openFailure}
        message={message}
        handleClose={handleCloseBar}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12} md={2}>
          <SideDrawer />
        </Grid>
        <Grid className={classes.tableContainer} item xs={12} md={10}>
          <Grid container justify="center">
            <Grid item xs={12} md={10}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <h1>All Assessments</h1>
                <Button
                  className={classes.create}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Create
                </Button>
              </Box>
              <MDBDataTable data={mdbJobs()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AssessmentDialogue
        open={open}
        handleClose={handleClose}
        module={editModule}
        submitHandler={submitHandler}
        moduleList={moduleData}
      />
      <Modal
        open={successModalOpen}
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
            Your assessment has been created successfully.
          </Typography>
          <Button
            style={{
              position: "relative",
              left: "120px",
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
    </>
  );
}

export default Assessment;
