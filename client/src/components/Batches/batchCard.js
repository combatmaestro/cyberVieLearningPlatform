import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBatches } from "../../actions/moduleAction";
import ModuleListLoader from "../ModulesList/ModuleListLoader";
import { useStyles } from "./style";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ErrorBar from '../../Admin/SnackBar/ErrorBar'
// const useDialogStyles = makeStyles((theme) => ({
//     dialogContentText: {
//       whiteSpace: 'pre-wrap',  // Preserve whitespace and wrap long text
//     },
//   }));

function BatchList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const modules = useSelector((state) => state.batches);
  const { loading, data: moduleData = [], error } = modules;
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reqSubmitted, setRequestSubmitted] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [message, setMessage] = useState('')
  const user = useSelector((state) => state.user)
  const { data } = user
  useEffect(() => {
    dispatch(getAllBatches());
  }, [dispatch]);
  const backendUrl = "https://cyber-vie-learning-platform-server.vercel.app";
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleOpen = (module) => {
    setSelectedModule(module);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModule(null);
    setStudentName("");
    setPhoneNumber("");
    setEmail("")
    setRequestSubmitted(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateName(studentName)) {
        setMessage("Please enter a valid name (letters and spaces only).");
        return;
      }
  
      if (!validatePhoneNumber(phoneNumber)) {
        setMessage("Please enter a valid 10-digit phone number.");
        return;
      }
  
      if (!validateEmail(email)) {
        setMessage("Please enter a valid email address.");
        return;
      }
  
    const requestData = {
      studentName,
      phoneNumber,
      email:email,
      module: selectedModule,
    };

    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post(`${backendUrl}/batch/admin/studentEnroll`, requestData, config);
          setRequestSubmitted(true);

    //   if (data.ok) {
    //     console.log("Request successful:", requestData);
        
    //   } else {
    //     console.error("Request failed:", data.statusText);
    //   }
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const handleCloseBar = (event, reason) => {
    setOpenFailure(false)
  }

  if (loading && !error) return <ModuleListLoader />;
  return (
    <>
    <ErrorBar
        openFailure={openFailure}
        message={message}
        handleClose={handleCloseBar}
      />
    <div className={classes.root}>
      {moduleData.map((module) => (
        <div
          key={module._id}
          className={classes.module}
          style={{ height: "290px" }}
        >
          <div className={classes.titleBold}>{module.title}</div>
          <div className={classes.description}>{module.description}</div>
          <div className={classes.description}>
            Start Date : {formatDate(module.startDate)}
          </div>
          <div className={classes.description}>
            End Date : {formatDate(module.endDate)}
          </div>
          <div className={classes.description}>Course Fee : ₹ {module.fee}</div>
          <div className={classes.description}>
            Discounted Fee : <del>₹ {module.fee}</del> <span>₹ {module.discountedFee}</span>
          </div>
          <br />
          <div className={classes.button}>
            <Button variant="outlined" onClick={() => handleOpen(module)}>
              Enroll Now
            </Button>
          </div>
        </div>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enroll in {selectedModule?.title}</DialogTitle>

        <DialogContent>
          <DialogContentText
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {reqSubmitted
              ? "You request for enrollment has been processed , you will get a confirmation call from our team within few hours "
              : selectedModule?.description}
          </DialogContentText>
          {!reqSubmitted && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Student Name"
                type="text"
                fullWidth
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Email"
                type="text"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Phone Number"
                type="tel"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {reqSubmitted ? (
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          ) : (
            <>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

export default BatchList;