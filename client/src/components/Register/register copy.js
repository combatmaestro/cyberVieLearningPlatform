import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CheckCircle from "@material-ui/icons/CheckCircle";
import { Typography, Modal } from "@material-ui/core";
import "./register.css";
import image from "./ProfileBack2.png";
import { useStyles } from "./registerStyle";
import { saveFormData } from "../../actions/leadMangementActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [howFoundUs, setHowFoundUs] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [error, setError] = useState(false);
  let history = useHistory();

  const validateName = (value) => /^[A-Za-z\s]*$/.test(value);
  const validateMobile = (value) => /^\d*$/.test(value); // Changed to allow empty string

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = { name, email, mobile, currentSalary, expectedSalary, howFoundUs };

    const response = await dispatch(saveFormData(formData));
    if (response?.status === 200) {
      setError(false);
      setSuccessModalOpen(true);
    } else {
      setSuccessModalOpen(true);
      setError(true);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        if (validateName(value)) setName(value);
        break;
      case "mobile":
        if (validateMobile(value)) setMobile(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "currentSalary":
        setCurrentSalary(value);
        break;
      case "expectedSalary":
        setExpectedSalary(value);
        break;
      case "howFoundUs":
        setHowFoundUs(value);
        break;
      default:
        break;
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setError(false);
    history.push("/batch");
  };

  return (
    <>
      <div className="mainContainer">
        <Box className={classes.root} display="flex" flexDirection="row">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box>
              <IconButton className={classes.iconHolder}>
                <AccountCircleIcon style={{ fontSize: "70px" }} />
              </IconButton>
            </Box>
            <Box display="flex" flexDirection="column">
              <Box className={classes.heading}>Your Profile</Box>
              <Box className={classes.subHeading}>Manage your account</Box>
            </Box>
          </Box>
        </Box>

        <Paper elevation={5} className={classes.paper}>
          <Grid container justify="center" className={classes.container}>
            <Grid item xs={12} sm={4} md={3} className={classes.avatarHolder}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{ paddingTop: "20%" }}
              >
                <div style={{ height: "130px", width: "130px" }}>
                  <img
                    src={image}
                    alt="profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{ marginTop: 30 }}>
                <form onSubmit={submitHandler}>
                  <Box display="flex" flexDirection="column">
                    <label htmlFor="name-input" className={classes.customLabel}>
                      Full Name
                    </label>
                    <input
                      className={classes.customInput}
                      type="text"
                      name="name"
                      id="name-input"
                      value={name}
                      onChange={changeHandler}
                      required
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label
                      htmlFor="email-input"
                      className={classes.customLabel}
                    >
                      Email
                    </label>
                    <input
                      className={classes.customInput}
                      type="email"
                      name="email"
                      id="email-input"
                      value={email}
                      onChange={changeHandler}
                      required
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label
                      htmlFor="mobile-input"
                      className={classes.customLabel}
                    >
                      Mobile No.
                    </label>
                    <input
                      className={classes.customInput}
                      type="text"
                      name="mobile"
                      id="mobile-input"
                      value={mobile}
                      onChange={changeHandler}
                      required
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label
                      htmlFor="current-salary-input"
                      className={classes.customLabel}
                    >
                      Current Salary
                    </label>
                    <input
                      className={classes.customInput}
                      type="number"
                      name="currentSalary"
                      id="current-salary-input"
                      value={currentSalary}
                      onChange={changeHandler}
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label
                      htmlFor="expected-salary-input"
                      className={classes.customLabel}
                    >
                      Expected Salary
                    </label>
                    <input
                      className={classes.customInput}
                      type="number"
                      name="expectedSalary"
                      id="expected-salary-input"
                      value={expectedSalary}
                      onChange={changeHandler}
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label
                      htmlFor="how-found-us-select"
                      className={classes.customLabel}
                    >
                      How did you find us?
                    </label>
                    <select
                      name="howFoundUs"
                      id="how-found-us-select"
                      value={howFoundUs}
                      onChange={changeHandler}
                      className={classes.customInput}
                      required
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Others">Others</option>
                    </select>
                  </Box>

                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={`${classes.margin} ${classes.saveButton}`}
                    type="submit"
                  >
                    Register
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
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
            <div>{!error ? "👏 Congratulations!" : "😲 Wow!"}</div>
          </Typography>
          <Typography
            style={{ textAlign: "center" }}
            variant="body2"
            id="simple-modal-description"
          >
            {!error
              ? "You are successfully registered with us. Our Team will get back to you in the next 24 hours."
              : "You are already registered with us. We will be reaching out to you shortly."}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button
              style={{
                paddingInline: "50px",
                backgroundColor: "green",
                background:
                  "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
              }}
              variant="contained"
              color="primary"
              onClick={handleSuccessModalClose}
            >
              Check Our Upcoming Batches
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Register;
