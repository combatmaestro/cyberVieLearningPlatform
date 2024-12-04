import React from "react";
import { Box, createMuiTheme, makeStyles, Typography } from "@material-ui/core";
import image from "./images/leaderBoard.png";
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
    // minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  heading: {
    color: "#0A2734",
    marginBlock: "20px",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "34px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
      marginBottom: theme.spacing(2),
    },
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(15),
    [theme.breakpoints.down("sm")]: {
        flexDirection:"column",
        gap:theme.spacing(3)
    },
  },
  subheading: {
    color: "#0A2734",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "18px",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
        fontSize:"16px"
    },
  },
  paragraph:{
    fontFamily:"Inter",
    fontSize:18,
    color: "#0A2734",
    width:"65%",
    fontWeight:"100",
    [theme.breakpoints.down("sm")]: {
        width:"100%",
        fontSize:16,
        marginLeft:18
    },
    [theme.breakpoints.down("xs")]: {
        marginLeft:8,
        fontSize:14
    }
  },
  img: {
    width:700,
    height:400,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
        width:"100%",
        height:"auto"
    },
  }
}));

const CurrentLeaderBoard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.heading} gutterBottom>
        Current Leaderboard
      </Typography>
      <Typography variant="body1" className={classes.subheading} gutterBottom>
        Climbe the ranks and showcase your skills
      </Typography>
      <Box className={classes.contentWrapper}>
        <img
          src={image}
          alt="Module Image"
          className={classes.img}
        />
        <Box className={classes.textWrapper}>
          <p className={classes.paragraph}>
            Complete the modules and assignments to secure your spot on our
            leaderboard. Join now, and you could be one of the top performers.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentLeaderBoard;
