import React from "react";
import { Box, createMuiTheme, makeStyles, Typography } from "@material-ui/core";
import image from "./images/certificate.jpg";
const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ffffff",
    color: "#F5F5F5",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  heading: {
    color: "#0A2734",
    width: "40%",
    margin: "0 auto",
    marginBlock: "20px",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "34px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
    },
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBlock: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(3),
    },
  },
  paragraph: {
    fontFamily: "Inter",
    fontSize: 18,
    color: "#0A2734",
    width: "65%",
    fontWeight: "100",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      fontSize: 16,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  img: {
    width:550,
    height:385,
    boxShadow: "0px 1px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    objectFit: "contain",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    },
  }
}));

const Certification = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.heading} gutterBottom>
        Seal Your Success with an Industry-Leading Certification
      </Typography>
      <Box className={classes.contentWrapper}>
        <Box className={classes.textWrapper}>
          <p className={classes.paragraph}>
            At the end of the course, you’ll have more than just
            knowledge you’ll have an Industry-Recognised Certificate that proves
            your expertise. In just 3 months and 108 hours of live training,
            you’ll be ready to take on roles in top cybersecurity firms and
            startups alike.
          </p>
        </Box>  
        <img
          src={image}
          alt="Module Image"
          className={classes.img}
        />
      </Box>
    </Box>
  );
};

export default Certification;
