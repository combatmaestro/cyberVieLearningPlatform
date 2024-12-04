import React from "react";
import { Box, Grid, Typography, makeStyles, createMuiTheme } from "@material-ui/core";
import image from './images/success.png'; 

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#0B1A35",
    color: "#fff",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  heading: {
    fontSize: "35px",
    fontWeight: "bold",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    textAlign: "center",
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
    },
  },
  subHeading: {
    fontSize: "18px",
    fontWeight: 100,
    fontFamily: "Inter",
    marginBottom: theme.spacing(5),
    textAlign: "center",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  contentText: {
    marginBottom: theme.spacing(2),
    fontFamily: "Inter",
    fontSize: "18px",
    width:"80%",
    lineHeight: "1.8",
    "& span": {
      fontWeight: "bold",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      textAlign: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
    },
  },
  imageContainer: {
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
  image: {
    width: "100%",
    height: "auto",
  },
}));

const CommitmentSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
        <Typography className={classes.heading}>
            Commitment to Success
          </Typography>
          <Typography className={classes.subHeading}>
            <span style={{fontFamily:"Inter, Arial, sans-serif",fontWeight:"bold"}}>90 Minutes a day</span> is all it takes
          </Typography>
      <Grid container spacing={4} alignItems="center" style={{marginBottom:"40px"}}>
        <Grid item xs={12} md={6}>
          <Typography className={classes.contentText}>
            With over <span>100+ hours of live training</span>, spread over 3 months,
            our experts will ensure you will be fully job-ready.
          </Typography>
          <Typography className={classes.contentText}>
            All you need to commit is a dedicated 90 minutes every day – at a
            <span> time slot of your choice.</span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.imageContainer}>
            <img src={image} alt="Study Session" className={classes.image} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommitmentSection;
