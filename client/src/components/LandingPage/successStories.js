import React from "react";
import { makeStyles, Typography, Box, createMuiTheme } from "@material-ui/core";

import image1 from "./images/SuccessImage1.png";
import image2 from "./images/SuccessImage2.png";
import image3 from "./images/SuccessImage3.png";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f5f5f5",
    padding: "30px 102px",
    [theme.breakpoints.down('sm')]: {
        paddingInline: theme.spacing(3),
      },
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: theme.spacing(4),
    color: "#2E3B55",
    fontSize: "35px",
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
      marginTop:-30
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "22px",
    },
  },
  contentWrapper: {
    display: "flex",
    gap: 180,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        flexDirection:"column",
        gap:50
    },
  },
  subHeading: {
    marginBottom: 0,
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 28,
    color: "#0A2734",
    [theme.breakpoints.down("sm")]: {
        fontSize:22
    },
  },
  paragraph: {
    width: "55%",
    color: "#011327",
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 16,
    [theme.breakpoints.down("sm")]: {
        width:"100%",
        fontSize:15
    },
  },
  img:{
    width:480,
    height:320,
    [theme.breakpoints.down("sm")]: {
        width:300,
        height:200,
    },
  }
}));

const SuccessStories = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.heading}>
        CyberVie - Your Shortcut to Cybersecurity Success
      </Typography>
      <Box className={classes.contentWrapper}>
        <Box className={classes.imageWrapper}>
          <img src={image1} alt="Success Image 1" className={classes.img}/>
        </Box>
        <Box className={classes.textWrapper}>
          <Typography variant="h6" gutterBottom className={classes.subHeading}>
            Live Virtual Training
          </Typography>
          <p className={classes.paragraph}>
            Forget passive recorded video lessons with us, you’ll experience
            Live Virtual Training, where every class brings the real world into
            your learning space.
          </p>
        </Box>
      </Box>
      <Box className={classes.contentWrapper}>
        <Box className={classes.textWrapper}>
          <Typography variant="h6" gutterBottom className={classes.subHeading}>
            Exclusive Community
          </Typography>
          <p className={classes.paragraph}>
            Our Community isn’t just a learning group—it’s a thriving ecosystem
            that nurtures you, and opens up opportunities and insights you would
            not have alone.
          </p>
        </Box>
        <Box className={classes.imageWrapper}>
          <img src={image2} alt="Success Image 1" className={classes.img}/>
        </Box>
      </Box>
      <Box className={classes.contentWrapper}>
        <Box className={classes.imageWrapper}>
          <img src={image3} alt="Success Image 1" className={classes.img} />
        </Box>
        <Box className={classes.textWrapper}>
          <Typography variant="h6" gutterBottom className={classes.subHeading}>
            Placement Support
          </Typography>
          <p className={classes.paragraph}>
            Our Placement Support offers dedicated assistance in landing jobs
            and internships, complete with mock interviews to help you walk into
            real interviews with confidence.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessStories;
