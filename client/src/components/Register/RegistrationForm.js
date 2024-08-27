import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  Divider,
  InputAdornment,
  MenuItem,
} from "@material-ui/core";
import Logo from "./logo.jpg";
import { makeStyles } from "@material-ui/styles";
import OtpVerification from "./OtpVerifacton";
import { saveFormData } from "../../actions/leadMangementActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";

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
  logo: {
    height: "100px",
    width: "200px",
  },
}));

const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+91", name: "India" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
];

const RegistrationForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [checkIcon, setCheckIcon] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const validateExperience = (experience) => /^\d+$/.test(experience);
  const validateOrganization = (organization) =>
    /^[a-zA-Z\s]+$/.test(organization);
  const validateCity = (currCity) => /^[a-zA-Z\s]+$/.test(currCity);
  const validteDesignation = (designation) => /^[a-zA-Z\s]+$/.test(designation);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateName(name)) newErrors.name = "Please enter a valid name.";
    if (!validateEmail(email)) newErrors.email = "Please enter a valid email.";
    if (!validatePhoneNumber(phoneNumber))
      newErrors.phoneNumber = "Please enter a valid phone number.";
    if (!validateExperience(experience))
      newErrors.experience = "Please enter valid years of experience.";
    if (!validateOrganization(organization))
      newErrors.organization = "Please enter a valid organization.";
    if (!validateCity(currCity))
      newErrors.currCity = "Please enter a valid cityName.";
    if (!validteDesignation(designation))
      newErrors.designation = "Please enter a valid designation.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formData = {
      name,
      email,
      phoneNumber,
      currCity,
      organization,
      designation,
      experience,
      location,
    };
    const response = await dispatch(saveFormData(formData));
    if (response?.status === 200) {
      setIsSubmitted(true);
    } else {
      toast.error("Email Already Exists , Please Login To Csep Cybervie Platform");
      setTimeout(() => {
        history.push("/"); 
      }, 3000);
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullName":
        setName(value);
        if (!validateName(value)) {
          setErrors((prev) => ({
            ...prev,
            name: "Please enter a valid name.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, name: null }));
        }
        break;
      case "email":
        setEmail(value);
        if (!validateEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: null }));
        }
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        if (!validatePhoneNumber(value)) {
          setErrors((prev) => ({
            ...prev,
            phoneNumber: "Please enter a valid phone number.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phoneNumber: null }));
        }
        break;
      case "currentCityOfResidence":
        setCurrCity(value);
        if (!validateCity(value)) {
          setErrors((prev) => ({
            ...prev,
            currCity: "Please enter a valid city name.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, currCity: null }));
        }
        break;
      case "organization":
        setOrganization(value);
        if (!validateOrganization(value)) {
          setErrors((prev) => ({
            ...prev,
            organization: "Please enter a valid organization.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, organization: null }));
        }
        break;
      case "designation":
        setDesignation(value);
        if (!validteDesignation(value)) {
          setErrors((prev) => ({
            ...prev,
            designation: "Please enter valid years of experience.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, designation: null }));
        }
        break;
      case "experience":
        setExperience(value);
        if (!validateExperience(value)) {
          setErrors((prev) => ({
            ...prev,
            experience: "Please enter valid years of experience.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, experience: null }));
        }
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
    <Container className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} className={classes.infoPanel}>
          <img src={Logo} alt="Logo" className={classes.logo} />
          <Typography
            variant="h4"
            className={classes.title}
            style={{ marginTop: "80px" }}
            gutterBottom
          >
            CYBER SECURITY TRAINING PROGRAM 2024
          </Typography>
          <Typography variant="body1" paragraph>
            This program is designed to provide students and working
            professionals with the knowledge and skills they need to succeed in
            the field of cybersecurity.
          </Typography>
          <div className={classes.stepper}>
            <div className={classes.step}>
              <div
                className={`${classes.stepNumber} ${
                  activeStep >= 1
                    ? classes.stepNumberActive
                    : classes.stepNumberInactive
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
                  activeStep >= 2
                    ? classes.stepNumberActive
                    : classes.stepNumberInactive
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
                  activeStep >= 3
                    ? classes.stepNumberActive
                    : classes.stepNumberInactive
                }`}
              >
                3
              </div>
              <Typography variant="caption">Log in</Typography>
            </div>
          </div>
        </Grid>
        {isSubmitted ? (
          <OtpVerification fullNumber={`${countryCode}${phoneNumber}`} />
        ) : (
          <Grid item xs={12} md={6} className={classes.formPanel}>
            <Typography variant="h6" className={classes.title} gutterBottom>
              Register With Us!
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
                error={Boolean(errors.name)}
                helperText={errors.name}
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
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
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
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                type="text"
                fullWidth
                label="Current City of Residence"
                name="currentCityOfResidence"
                value={currCity}
                onChange={changeHandler}
                error={Boolean(errors.currCity)}
                helperText={errors.currCity}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Organization"
                name="organization"
                value={organization}
                onChange={changeHandler}
                error={Boolean(errors.organization)}
                helperText={errors.organization}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="Designation"
                name="designation"
                value={designation}
                onChange={changeHandler}
                error={Boolean(errors.designation)}
                helperText={errors.designation}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Experience (in years)"
                name="experience"
                value={experience}
                onChange={changeHandler}
                error={Boolean(errors.experience)}
                helperText={errors.experience}
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
                style={{ fontSize: "1px" }}
                control={
                  <Checkbox
                    checked={checkIcon}
                    onChange={changeHandler}
                    name="receive"
                    color="primary"
                  />
                }
                label="YES, I want to receive emails and sms from cybervie."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.registerButton}
              >
                Register
              </Button>
            </form>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default RegistrationForm;
