import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../actions/userActions";

//styles
import "./styles/ProfilePage.css";
import { useStyles } from "./styles/ProfileJsStyles";

function ProfilePage() {
  document.title = "Profile";
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { data, loading } = user;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [mobile, setMobile] = useState(data.mobile);
  const [education, setEducation] = useState(data.education || "");
  const [workingDomain, setWorkingDomain] = useState(data.workingDomain || "");
  const [experience, setExperience] = useState(data.experience || "");
  const [currentSalary, setCurrentSalary] = useState(data.currentSalary || "");
  const [expectedSalary, setExpectedSalary] = useState(data.expectedSalary || "");
  const [preferredLocation, setPreferredLocation] = useState(data.preferredLocation || "");

  const submitHandler = (e) => {
    e.preventDefault();

    // Regex patterns for validation
    const salaryPattern = /^\d+$/;
    const char40Pattern = /^.{0,40}$/;

    // Validate inputs
    if (!salaryPattern.test(currentSalary) || !salaryPattern.test(expectedSalary)) {
      alert("Salary must be a number");
      return;
    }
    if (!char40Pattern.test(education)) {
      alert("Education must be less than or equal to 40 characters");
      return;
    }
    if (!char40Pattern.test(workingDomain)) {
      alert("Working Domain must be less than or equal to 40 characters");
      return;
    }
    if (!char40Pattern.test(experience)) {
      alert("Experience must be less than or equal to 40 characters");
      return;
    }
    if (!char40Pattern.test(preferredLocation)) {
      alert("Preferred Location must be less than or equal to 40 characters");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("mobile", mobile);
    formData.set("education", education);
    formData.set("workingDomain", workingDomain);
    formData.set("experience", experience);
    formData.set("currentSalary", currentSalary);
    formData.set("expectedSalary", expectedSalary);
    formData.set("preferredLocation", preferredLocation);
    dispatch(updateUser(formData));
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "mobile":
        setMobile(value);
        break;
      case "education":
        setEducation(value);
        break;
      case "workingDomain":
        setWorkingDomain(value);
        break;
      case "experience":
        setExperience(value);
        break;
      case "currentSalary":
        setCurrentSalary(value);
        break;
      case "expectedSalary":
        setExpectedSalary(value);
        break;
      case "preferredLocation":
        setPreferredLocation(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mainContainer">
        <Box className={classes.root} display="flex" flexDirection="row">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box>
              <IconButton className={classes.iconHolder}>
                <AccountCircleIcon />
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
            <Grid item xs={12} sm={4} md={3} className={classes.avatarHolder} style={{justifyContent:""}}>
              <Box display="flex" flexDirection="column" alignItems="center" style={{paddingTop:"20%"}}>
                <div
                  style={{
                    height: "130px",
                    width: "130px",
                  }}
                >
                  <img
                    src={data.avatar.url}
                    alt="profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className={classes.ctfHolder}>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                    className={classes.marginY}
                  >
                    CTF Score
                  </p>
                  <p
                    style={{
                      fontStyle: "normal",
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                    className={classes.marginY}
                  >
                    {data.marks}.0
                  </p>
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
                    <label htmlFor="email-input" className={classes.customLabel}>
                      Email
                    </label>
                    <input
                      className={classes.customInput}
                      type="email"
                      name="email"
                      id="email-input"
                      value={email}
                      style={{ backgroundColor: "#EFEFEF" }}
                      disabled
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label htmlFor="mobile-input" className={classes.customLabel}>
                      Mobile No.
                    </label>
                    <input
                      className={classes.customInput}
                      type="number"
                      name="mobile"
                      id="mobile-input"
                      value={mobile}
                      onChange={changeHandler}
                      required
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <label htmlFor="education-input" className={classes.customLabel}>
                      Education
                    </label>
                    <input
                      className={classes.customInput}
                      type="text"
                      name="education"
                      id="education-input"
                      value={education}
                      onChange={changeHandler}
                      required
                      pattern="^.{0,40}$"
                      title="Education must be less than or equal to 40 characters"
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label htmlFor='workingDomain-input' className={classes.customLabel}>
                      Current Working Domain
                    </label>
                    <input
                      className={classes.customInput}
                      type='text'
                      name='workingDomain'
                      id='workingDomain-input'
                      value={workingDomain}
                      onChange={changeHandler}
                      required
                      pattern="^.{0,40}$"
                      title="Working Domain must be less than or equal to 40 characters"
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label htmlFor='experience-input' className={classes.customLabel}>
                      Total Experience
                    </label>
                    <input
                      className={classes.customInput}
                      type='text'
                      name='experience'
                      id='experience-input'
                      value={experience}
                      onChange={changeHandler}
                      required
                      pattern="^.{0,40}$"
                      title="Experience must be less than or equal to 40 characters"
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label htmlFor='currentSalary-input' className={classes.customLabel}>
                      Current Salary
                    </label>
                    <input
                      className={classes.customInput}
                      type='number'
                      name='currentSalary'
                      id='currentSalary-input'
                      value={currentSalary}
                      onChange={changeHandler}
                      required
                      pattern="^\d+$"
                      title="Current Salary must be a number"
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label htmlFor='expectedSalary-input' className={classes.customLabel}>
                      Expected Salary
                    </label>
                    <input
                      className={classes.customInput}
                      type='number'
                      name='expectedSalary'
                      id='expectedSalary-input'
                      value={expectedSalary}
                      onChange={changeHandler}
                      required
                      pattern="^\d+$"
                      title="Expected Salary must be a number"
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label htmlFor='preferredLocation-input' className={classes.customLabel}>
                      Preferred Location
                    </label>
                    <input
                      className={classes.customInput}
                      type='text'
                      name='preferredLocation'
                      id='preferredLocation-input'
                      value={preferredLocation}
                      onChange={changeHandler}
                      required
                      pattern="^.{0,40}$"
                      title="Preferred Location must be less than or equal to 40 characters"
                    />
                  </Box>

                  <Button
                    variant="contained"
                    size="medium"
                    color="primary"
                    className={(classes.margin, classes.saveButton)}
                    type="submit"
                  >
                    Save
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default ProfilePage;
