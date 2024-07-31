import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { scheduleClass } from "../../actions/classAction";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperWidthSm": {
      minWidth: "600px",
    },
  },
  tierLabel: {
    marginTop: 20,
  },
  menuItemContent: {
    display: "flex",
    alignItems: "center",
  },
}));

function AdminClassesDialog(props) {
  const classes = useStyles();
  const { open, handleClose, submitHandler } = props;
  const [tier, setTier] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState(""); // State to handle selected batch
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [time, setTime] = useState("");

  const batches = useSelector((state) => state.batches);
  const { loading, data: moduleData = [], error } = batches;

  const teachers = useSelector((state) => state.allTeachers);
  const { allTeachersData = [] } = teachers;

 


  const handleTimeChange = (event) => {
    setTime(event.target.value);
    console.log(event.target.value);
  };

  const timeOptions = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    console.log(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    submitHandler(event , allTeachersData ,selectedTeacher,selectedBatch,time)
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">
          Schedule Classes For Batch
        </DialogTitle>
        <DialogContent>
          <form id="user-form">
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="select-batch-label">Select Batch</InputLabel>
              <Select
                labelId="select-batch-label"
                id="select-batch"
                value={selectedBatch}
                onChange={handleBatchChange}
                label="Select Batch"
              >
                <MenuItem value="" disabled>
                  Select a Batch For Allocation
                </MenuItem>
                {moduleData?.data?.map((batch) => (
                  <MenuItem key={batch._id} value={batch._id}>
                    {batch.title} - {batch._id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="select-teacher-label">Select Teacher</InputLabel>
              <Select
                labelId="select-teacher-label"
                id="select-teacher"
                value={selectedTeacher}
                onChange={handleTeacherChange}
                label="Select Teacher"
              >
                <MenuItem value="" disabled>
                  Select Teacher
                </MenuItem>
                {allTeachersData.map((teacher) => (
                  <MenuItem key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="select-time-label">Select Time</InputLabel>
              <Select
                labelId="select-time-label"
                id="select-time"
                value={time}
                onChange={handleTimeChange}
                label="Select Time"
              >
                <MenuItem value="" disabled>
                  Select Time
                </MenuItem>
                {timeOptions.map((timeOption) => (
                  <MenuItem key={timeOption} value={timeOption}>
                    {timeOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            form="user-form"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminClassesDialog;
