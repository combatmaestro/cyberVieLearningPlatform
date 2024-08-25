import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  InputAdornment,
  MenuItem
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/styles";
import OtpVerification from "./OtpVerifacton";
import Logo from './logo.jpg'
import { auth } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#073B4C",
  },
  infoPanel: {
    padding: theme.spacing(4),
    color: "#FFFFFF",
    // marginTop: theme.spacing(16),
    backgroundColor: "#073B4C",
    // [theme.breakpoints.down(426)]: {
    //   marginTop: theme.spacing(4),
    // },
  },
  formPanel: {
    padding: "32px 140px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down(426)]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down(431)]: {
      padding: theme.spacing(2),
    },
  },
  title: {
    fontWeight: "bold",
  },
  listItem: {
    paddingLeft: 0,
  },
  checkIcon: {
    color: "#06D6A0",
    minWidth: "36px",
  },
  registerButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#118AB2",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#073B4C",
    },
  },
  stepper: {
    marginTop: theme.spacing(12),
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down(426)]: {
      marginTop: "20px",
      gap: "4px",
    },
  },
  step: {
    textAlign: "center",
  },
  stepNumberActive: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    marginBottom: theme.spacing(1),
    backgroundColor: "#06D6A0",
  },
  stepNumberInactive: {
    backgroundColor: "#118AB2",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    marginBottom: theme.spacing(1),
  },
  logo :{
    height:"100px",
    width:"200px",
  }
}));

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+91", name: "India" },
  { code: "+44", name: "United Kingdom" },
  // Add more country codes as needed
];

const RegistrationForm = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [checkIcon, setCheckIcon] = useState(false);
  const [isSubmited, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState({});
  const [countryCode, setCountryCode] = useState("+91");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = {
    //   name,
    //   email,
    //   phoneNumber,
    //   currCity,
    //   organization,
    //   designation,
    //   experience,
    //   location,
    //   checkIcon,
    // };
    // alert("form submitted");
    // setIsSubmitted(true);
    // setData(formData);
    // console.log(formData.phoneNumber);
    
    // setActiveStep(2);

    const fullNumber = `${countryCode}${phoneNumber}`;
    try {
      const recaptch = new RecaptchaVerifier(auth,"recaptcha",{})
      const conformation = await signInWithPhoneNumber(auth, fullNumber, recaptch)
      console.log(conformation);
      
    } catch (error) {
      console.error(error);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "currentCityOfResidence":
        setCurrCity(value);
        break;
      case "organization":
        setOrganization(value);
        break;
      case "designation":
        setDesignation(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "receive":
        setCheckIcon(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <Container className={classes.root} style={{marginTop:"1%",marginBottom:"1%"}}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} className={classes.infoPanel}>
          <img src={Logo} alt="Logo" className={classes.logo}/>
          <Typography variant="h4" className={classes.title} style={{marginTop:'80px'}} gutterBottom>
            CYBER SECURITY TRAINING PROGRAM 2024
          </Typography>
          <Typography variant="body1" paragraph>
            This program is designed to provide students and working
            professionals with the knowledge and skills they need to succeed in
            the field of cybersecurity.
          </Typography>
          {/* <List>
            <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.checkIcon}>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Prerequisite for Cybersecurity" />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.checkIcon}>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Cybersecurity Foundations" />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.checkIcon}>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Network Security Essentials" />
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.checkIcon}>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Vulnerability Assessment and Management" />
            </ListItem>
          </List> */}
          <div className={classes.stepper}>
            <div className={classes.step}>
              <div
                className={`${classes.stepNumber} ${
                  activeStep >= 1 ? classes.stepNumberActive : classes.stepNumberInactive
                }`}
              >
                1
              </div>
              <Typography variant="caption">Register</Typography>
            </div>
            <Divider
              orientation="horizontal"
              flexItem
              style={{ backgroundColor: "#FFFFFF" }}
            />
            <div className={classes.step}>
              <div
                className={`${classes.stepNumber} ${
                  activeStep >= 2 ? classes.stepNumberActive : classes.stepNumberInactive
                }`}
              >
                2
              </div>
              <Typography variant="caption">OTP Verification</Typography>
            </div>
            <Divider
              orientation="horizontal"
              flexItem
              style={{ backgroundColor: "#FFFFFF" }}
            />
            <div className={classes.step}>
              <div
                className={`${classes.stepNumber} ${
                  activeStep >= 3 ? classes.stepNumberActive : classes.stepNumberInactive
                }`}
              >
                3
              </div>
              <Typography variant="caption">Log in</Typography>
            </div>
          </div>
        </Grid>
        {isSubmited ? (
          <OtpVerification activeStep={activeStep} />
        ) : (
          <Grid item xs={12} md={6} className={classes.formPanel}>
            <Typography variant="h6" className={classes.title} gutterBottom>
              ALL FIELDS ARE REQUIRED
            </Typography>
            <form noValidate onSubmit={handleSubmit} autoComplete="off">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Full Name"
                name="fullName"
                value={name}
                onChange={changeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={changeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                type="text"
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={changeHandler}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        style={{ marginRight: "8px" }}
                        variant="standard"
                      >
                        {countryCodes.map((country) => (
                          <MenuItem key={country.code} value={country.code}>
                            {country.code}
                          </MenuItem>
                        ))}
                      </Select>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Current City of Residence"
                name="currentCityOfResidence"
                value={currCity}
                onChange={changeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Organization"
                name="organization"
                value={organization}
                onChange={changeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Designation"
                name="designation"
                value={designation}
                onChange={changeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Experience"
                name="experience"
                type="number"
                value={experience}
                onChange={changeHandler}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Location"
                name="location"
                value={location}
                onChange={changeHandler}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={checkIcon}
                    name="receive"
                    color="primary"
                    checked={checkIcon}
                    onChange={changeHandler}
                  />
                }
                label="I want to receive mails and messages from cybervie"
              />
              <div id="recaptcha"></div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.registerButton}
              >
                REGISTER
              </Button>
            </form>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default RegistrationForm;
