import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Divider from "@material-ui/core/Divider";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import ErrorBar from "../../Admin/SnackBar/ErrorBar";
import ModuleListLoader from "../ModulesList/ModuleListLoader"; // Adjust path as per your file structure
import { getAllBatches } from "../../actions/moduleAction";
import { useDispatch, useSelector } from "react-redux";
import cardImg from "./Cybersecurity_Training.png";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  media: {
    height: 140,
    width: "100%",
    objectFit: "cover",
  },
  content: {
    flex: "1 0 auto",
  },
  titleBold: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  yellowDiv: {
    backgroundColor: "yellow",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
  iconTextContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  startDate: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  description: {
    marginTop: 7,
    lineHeight: "20px",
    fontSize: 15.03,
    fontWeight: 400,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: 300,
    fontFamily: "Noto Sans JP",

    [theme.breakpoints.down(830)]: {
      fontSize: 13,
      lineHeight: "18px",
    },
  },
}));

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;
  return formattedDate;
};

const BatchList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.batches);
  const { loading, data: moduleData = [], error } = modules;
  const [open, setOpen] = React.useState(false);
  const [selectedModule, setSelectedModule] = React.useState(null);
  const [studentName, setStudentName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [reqSubmitted, setRequestSubmitted] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [showDescription, setShowDescription] = React.useState(false);

  React.useEffect(() => {
    dispatch(getAllBatches());
  }, [dispatch]);

  const backendUrl =
    "https://cyber-vie-learning-platform-client-ten.vercel.app";

  const handleOpen = (module) => {
    setSelectedModule(module);
    setShowDescription(false);
    setOpen(true);
  };

  const handleMore = (module) => {
    setSelectedModule(module);
    setShowDescription(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModule(null);
    setStudentName("");
    setPhoneNumber("");
    setEmail("");
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
    e.preventDefault();

    if (!validateName(studentName)) {
      setMessage("Please enter a valid name (letters and spaces only).");
      setOpenFailure(true);
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      setOpenFailure(true);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      setOpenFailure(true);
      return;
    }

    const requestData = {
      studentName,
      phoneNumber,
      email,
      module: selectedModule,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendUrl}/batch/admin/studentEnroll`,
        requestData,
        config
      );
      setRequestSubmitted(true);
    } catch (error) {
      console.error("Error submitting request:", error);
      setMessage("Error submitting request. Please try again.");
      setOpenFailure(true);
    }
  };

  const calculateDiscountPercentage = (fee, discountedFee) => {
    const fees = Number(fee.replace(/[^0-9.]/g, ''));
    const discountedFees = Number(discountedFee.replace(/[^0-9.]/g, ''));
  
    if (fees && discountedFees) {
      return Math.round(((fees - discountedFees) / fees) * 100);
    }
    return 0;
  };


  const handleCloseBar = () => {
    setOpenFailure(false);
  };

  if (loading && !error) return <ModuleListLoader />;

  return (
    <>
      <ErrorBar
        openFailure={openFailure}
        message={message}
        handleClose={handleCloseBar}
      />
      <div className={classes.root}>
        <Grid container spacing={2}>
          {moduleData
            .filter((module) => !module.archive)
            .map((module) => (
              <Grid item xs={12} sm={6} md={4} key={module._id}>
                <Card className={classes.card}>
                  <div
                    className={classes.titleBold}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Typography variant="h6">{module.title}</Typography>
                    <div className={classes.yellowDiv}>
                      <Typography variant="body2" style={{ color: "black" }}>
                        New
                      </Typography>
                    </div>
                  </div>

                  <CardMedia
                    className={classes.media}
                    style={{ borderRadius: "10px" }}
                    image={cardImg} // Replace with your image URL
                    title={module.title}
                  />

                  <div className={classes.iconTextContainer}>
                    <AccountBoxIcon className={classes.icon} />
                    <Typography variant="body2" color="textSecondary">
                      Advanced Training Program
                    </Typography>
                  </div>

                  <div className={classes.iconTextContainer}>
                    <EventIcon className={classes.icon} />
                    <Typography variant="body2">
                      Starts <strong>{formatDate(module.startDate)}</strong> |
                      Ends on <strong>{formatDate(module.endDate)}</strong>
                    </Typography>
                  </div>

                  <CardContent className={classes.content}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className={classes.description}
                    >
                      {module.description}
                    </Typography>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant="body2" color="textSecondary">
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: "900",
                          color: "blue",
                        }}
                      >
                        ₹ {module.discountedFee}
                      </span>
                      &nbsp;
                      <del style={{ fontSize: "15px" }}>₹{module.fee}</del>{" "}
                      <span
                        style={{
                          backgroundColor: "#a4d8a4",
                          borderRadius: "5px",
                          fontSize: "12px",
                          float: "right",
                          padding: "5px",
                        }}
                      >
                      Discount of {calculateDiscountPercentage(module.fee , module.discountedFee)}% applied
                      </span>
                    </Typography>
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleMore(module)}
                      >
                        Learn More
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpen(module)}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

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
                ? "Your request for enrollment has been processed. You will get a confirmation call from our team within a few hours."
                : selectedModule?.description}
            </DialogContentText>
            {!reqSubmitted && (
              <>
                {!showDescription && (
                  <>
                    {" "}
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
                    />{" "}
                  </>
                )}
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
                {!showDescription && (
                  <>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                      Submit
                    </Button>
                  </>
                )}
              </>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default BatchList;
