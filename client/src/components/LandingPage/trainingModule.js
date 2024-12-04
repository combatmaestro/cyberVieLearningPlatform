import { Box, createMuiTheme, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import image1 from "./images/TrainingImg.png";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#011327",
    color: "#F5F5F5",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  heading: {
    fontWeight: "bold",
    marginBottom: theme.spacing(5),
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "35px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
        flexDirection:"column",
        gap:20
    },
  },
  textWrapper:{
    width:"50%",
    [theme.breakpoints.down("sm")]: {
        width:"100%"
    },
  },
  paragraph:{
    fontFamily:"Inter",
    fontSize:16,
    width:"80%",
    fontWeight:"100",
    [theme.breakpoints.down("sm")]: {
        width:"100%"
    },
    [theme.breakpoints.down("xs")]: {
        fontSize:14
    }
  },
  img: {
    width:400,
    height:500,
    objectFit:"contain",
    [theme.breakpoints.down("sm")]: {
        width:"100%",
        height:"auto"
    } 
  }
}));

const TrainingModule = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} id="modules">
      <Typography variant="h3" className={classes.heading} gutterBottom>
        Our Comprehensive Training Modules
      </Typography>
      <Box className={classes.contentWrapper}>
        <img src={image1} alt="Module Image" className={classes.img}/>
        <Box className={classes.textWrapper}>
        <p className={classes.paragraph}>
          CyberVie’s Learning Journey is designed to immerse you in the most
          advanced and relevant topics.
        </p>
        <p className={classes.paragraph}>
          Each topic is packed with hands-on experience, real-world scenarios,
          and interactive modules that ensure you’re ready for the challenges of
          a cybersecurity career.
        </p>
      </Box>
      </Box>
    </Box>
  );
};

export default TrainingModule;
