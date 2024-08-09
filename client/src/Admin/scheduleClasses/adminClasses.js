import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MDBDataTable } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Loader from "../../components/Loader/Loader";
import Tooltip from "@material-ui/core/Tooltip";
import SideDrawer from "../Drawer/SideDrawer";
import SuccessBar from "../SnackBar/SuccessBar";
import ErrorBar from "../SnackBar/ErrorBar";
import { adminGetAllUsers, editCertainUser } from "../../actions/userActions";
import AdminClassesDialog from "./AdminClassesDialog";
import CheckCircle from "@material-ui/icons/CheckCircle";
import { Typography, Modal } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { adminGetAllTeachers } from "../../actions/userActions";
import { getAllBatches } from "../../actions/moduleAction";
import { scheduleClass, fetchClasses } from "../../actions/classAction";

const useStyles = makeStyles((theme) => ({
  root: {},
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    "& .MuiSvgIcon-root": {
      widthL: 15,
      height: 15,
      color: "#4285f4",
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
  tickIcon: {
    color: 'green',
    fontSize: '4rem',
    position: 'relative',
    textAlign: 'center',
    left: '145px',
  },
}));

function AdminClasses() {
  document.title = "Users";
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, classData, error } = useSelector(
    (state) => state.getClasses
  );

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [message, setMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [scheduleClasses, setScheduleClasses] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllBatches());
    dispatch(adminGetAllUsers());
    dispatch(adminGetAllTeachers());
  }, []);
  const handleScheduleClose = () => {
    setScheduleOpen(false);
  };

  const editUserHandler = () => {
    setEditUser();
    setOpen(true);
  };

  const handleClickOpen = () => {
    // setEditUser(user);
    setScheduleClasses(null);
    setScheduleOpen(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  const handleSubmit = async (
    event,
    allTeachersData,
    selectedTeacher,
    selectedBatch,
    time
  ) => {
    event.preventDefault();
    // Ensure the selected teacher is captured correctly
    const selectedTeacherData = allTeachersData.find(
      (teacher) => teacher._id === selectedTeacher
    );

    if (!selectedTeacherData) {
      console.error("Selected teacher not found");
      return;
    }

    // Dispatch the action with the correct parameters
    const response = await dispatch(
      scheduleClass(
        selectedBatch,
        selectedTeacherData._id,
        selectedTeacherData.name,
        time
      )
    );
    console.log(response)
    if(response && response.status === 200){
      dispatch(fetchClasses())
      setScheduleOpen(false);
      setSuccessModalOpen(true);
    }else{
      setMessage(response?.error || "An error occurred");
      setOpenFailure(true);
    }

    // const handleSuccessModalClose = () => {
    //   setSuccessModalOpen(false);
    // };
  };

  const submitClassesHandler = async (e, tier, role) => {};

  const mdbJobs = (data, editUserHandler) => {
    const dataCols = {
      columns: [
        {
          label: "Batch Id",
          field: "batchId",
          sort: "asc",
        },
        {
          label: "Teacher Id",
          field: "teacherId",
          sort: "asc",
        },
        {
          label: "Teacher Name",
          field: "teacherName",
          sort: "asc",
        },
        {
          label: "Scheduled Time",
          field: "time",
          sort: "asc",
        },
      ],
      rows: [],
    };

    classData?.forEach((classes) => {
      dataCols.rows.push({
        batchId: classes.batchId,
        teacherId: classes.teacherId,
        teacherName: classes.teacherName,
        time: classes.time,
      });
    });

    return dataCols;
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  if (loading) return <Loader />;

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
                <h1>All Scheduled Classes</h1>
                <Button
                  className={classes.create}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpen({ name: "adarsh" })}
                >
                  Schedule Classes
                </Button>
              </Box>

              <MDBDataTable data={mdbJobs()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <AdminClassesDialog
        open={scheduleOpen}
        handleClose={handleScheduleClose}
        // user={editUser}
        classData={editUser}
        submitHandler={handleSubmit}
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

export default AdminClasses;
