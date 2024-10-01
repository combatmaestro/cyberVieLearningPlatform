import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveFormData } from "../../actions/leadMangementActions";
import logo from "./logo.svg";
import {
  Grid,
  Button,
  Typography,
  makeStyles,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formSection: {
    flex: 1,
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 50,
    [theme.breakpoints.down(475)]: {
      width: "100%",
      marginLeft: 5,
      marginTop: 30,
    },
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0),
    color: "#ffffff",
    marginLeft: -24,
    fontSize: "2.5rem",
    [theme.breakpoints.down(475)] : {
      fontSize:"2.1rem",
      marginLeft: 0
    }
  },
  subTitle2: {
    color: "#ffffff",
    fontWeight: 400,
    fontSize: 20,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down(475)]: {
      fontSize: 16,
      textAlign: "center",
    },
  },
  logo: {
    width: 185,
    height: 85,
    marginLeft: -46,
    [theme.breakpoints.down(475)]: {
      marginLeft: -30,
    },
  },
  inputField: {
    marginBottom: theme.spacing(1),
    backgroundColor: "#2e2e2e",
    width: "75%",
    fontSize: "16px",
    borderRadius: 50,
    color: "white",
    border: "1px solid #2e2e2e", // Default border color
    padding: "17.5px 30px",
    "&:focus": {
      outline: "none",
      border: "1px solid #FFFFFF", // Focus border color
    },
    [theme.breakpoints.down(475)]: {
      width: "100%",
    },
  },
  inputFieldError: {
    border: "1px solid red", // Error border color
  },
  button: {
    backgroundColor: "#493E71",
    padding: theme.spacing(1.5),
    borderRadius: 50,
    width: "75%",
    marginBottom:10,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#52428b",
    },
    [theme.breakpoints.down(475)]: {
      width: "100%",
    },
  },
}));


const LeadForm = ({ phoneNumber }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [checkIcon, setCheckIcon] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();






  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateExperience = (experience) => /^\d+$/.test(experience);
  const validateOrganization = (organization) =>
    /^[a-zA-Z\s]+$/.test(organization);
  const validateCity = (currCity) => /^[a-zA-Z\s]+$/.test(currCity);
  const validateDesignation = (designation) =>
    /^[a-zA-Z\s]+$/.test(designation);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateName(name)) newErrors.name = true;
    if (!validateEmail(email)) newErrors.email = true;
    if (!validateExperience(experience)) newErrors.experience = true;
    if (!validateOrganization(organization)) newErrors.organization = true;
    if (!validateCity(location)) newErrors.location = true;
    if (!validateDesignation(designation)) newErrors.designation = true;


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const formData = {
      name,
      email,
      phoneNumber,
      location,
      organization,
      designation,
      experience,
    };
    console.log(formData);
    // toast.success("Form submitted successfully!");
    const response = await dispatch(saveFormData(formData));
    if (response?.status === 200) {
      setIsSubmitted(true);
      toast.success("Form submitted successfully!");
      history.push("/")
    } else {
      toast.error(
        "Email Already Exists , Please Login To Csep Cybervie Platform"
      );
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  };


  const changeHandler = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };


    switch (name) {
      case "fullName":
        setName(value);
        if (!validateName(value)) {
          newErrors.name = true;
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        setEmail(value);
        if (!validateEmail(value)) {
          newErrors.email = true;
        } else {
          delete newErrors.email;
        }
        break;
      case "currentCityOfResidence":
        setLocation(value);
        if (!validateCity(value)) {
          newErrors.location = true;
        } else {
          delete newErrors.currCity;
        }
        break;
      case "organization":
        setOrganization(value);
        if (!validateOrganization(value)) {
          newErrors.organization = true;
        } else {
          delete newErrors.organization;
        }
        break;
      case "designation":
        setDesignation(value);
        if (!validateDesignation(value)) {
          newErrors.designation = true;
        } else {
          delete newErrors.designation;
        }
        break;
      case "experience":
        setExperience(value);
        if (!validateExperience(value)) {
          newErrors.experience = true;
        } else {
          delete newErrors.experience;
        }
        break;
      case "receive":
        setCheckIcon(e.target.checked);
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };


  return (
    <Grid item xs={12} sm={6} className={classes.formSection}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <Typography variant="h2" className={classes.title}>
        Create an Account
      </Typography>
      <Typography variant="h6" gutterBottom className={classes.subTitle2}>
        We'd love to learn about you
      </Typography>
      <input
        variant="outlined"
        autoComplete="off"
        required
        name="fullName"
        placeholder="Enter your name"
        value={name}
        onChange={changeHandler}
        className={`${classes.inputField} ${
          errors.name ? classes.inputFieldError : ""
        }`}
      />
      <input
        variant="outlined"
        autoComplete="off"
        required
        name="email"
        placeholder="Enter your Email"
        value={email}
        onChange={changeHandler}
        className={`${classes.inputField} ${
          errors.email ? classes.inputFieldError : ""
        }`}
      />
      <input
        variant="outlined"
        autoComplete="off"
        required
        name="currentCityOfResidence"
        placeholder="City Of Residency"
        value={location}
        onChange={changeHandler}
        className={`${classes.inputField} ${
          errors.currCity ? classes.inputFieldError : ""
        }`}
      />
      <input
        variant="outlined"
        autoComplete="off"
        name="organization"
        placeholder="Organization"
        value={organization}
        onChange={changeHandler}
        className={`${classes.inputField} ${
          errors.organization ? classes.inputFieldError : ""
        }`}
      />
      <input
        variant="outlined"
        autoComplete="off"
        name="designation"
        placeholder="Designation"
        value={designation}
        onChange={changeHandler}
        className={`${classes.inputField} ${
          errors.designation ? classes.inputFieldError : ""
        }`}
      />
      <input
        variant="outlined"
        autoComplete="off"
        required
        name="experience"
        placeholder="Experience (in years)"
        value={experience}
        onChange={changeHandler}
        className={`${classes.inputField} ${
          errors.experience ? classes.inputFieldError : ""
        }`}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkIcon}
            onChange={changeHandler}
            name="receive"
            style={{ color: "#fff" }}
          />
        }
        label={
          <Typography style={{ color: "#fff", fontSize: "14px" }}>
            YES, I want to receive emails and sms from cybervie.
          </Typography>
        }
      />
      <Button
        type="submit"
        variant="contained"
        className={classes.button}
        onClick={handleSubmit}
      >
        Register
      </Button>
    </Grid>
  );
};


export default LeadForm;



