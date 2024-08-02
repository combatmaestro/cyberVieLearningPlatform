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
import Button from "@material-ui/core/Button";
import { adminGetAllTeachers } from "../../actions/userActions";
import { getAllBatches } from "../../actions/moduleAction";
import { scheduleClass,fetchClasses } from "../../actions/classAction";

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
}));

function AdminClasses() {
  document.title = "Users";
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, classData, error } = useSelector((state) => state.getClasses);

  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState("");
  const [message, setMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [scheduleClasses,setScheduleClasses] = useState(false);
  const [scheduleOpen,setScheduleOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };


  
  useEffect(() => {
    dispatch(fetchClasses());
  }, []);

  
  useEffect(() => {
    dispatch(getAllBatches())
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
    setScheduleClasses(null)
    setScheduleOpen(true)
  }

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };
  


  const handleSubmit = async(event , allTeachersData ,selectedTeacher,selectedBatch,time ) => {
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
   await dispatch(
      scheduleClass(
        selectedBatch,
        selectedTeacherData._id,
        selectedTeacherData.name,
        time
      )
    );
    window.location.reload();
  };

  const submitClassesHandler = async (e, tier, role) => {

  }

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
        teacherId:classes.teacherId,
        teacherName: classes.teacherName,
        time: classes.time,
      });
    });

    return dataCols;
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
                  onClick={() => handleClickOpen({name: "adarsh"})}
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
    </>
  );
}

export default AdminClasses;
