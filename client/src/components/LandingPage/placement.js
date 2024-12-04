import React from "react";
import { Box, createMuiTheme, makeStyles, Typography } from "@material-ui/core";
import image from "./images/placement.png";
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
      flexDirection: "column",
      gap: 4,
    },
  },
  subheading: {
    color: "#0A2734",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "18px",
    marginBottom: theme.spacing(2),
  },
  paragraph: {
    fontFamily: "Inter",
    fontSize: 18,
    color: "#0A2734",
    width: "65%",
    fontWeight: "100",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    }
  },
  img: {
    width:800,
    height:400,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    }
  }
}));

const PlacementAssistance = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.heading} gutterBottom>
        Placement Assistance
      </Typography>
      <Box className={classes.contentWrapper}>
        <img
          src={image}
          alt="Module Image"
          className={classes.img}
          style={{ objectFit: "contain" }}
          width={800}
          height={400}
        />
        <Box className={classes.textWrapper}>
          <p className={classes.paragraph}>
            We help the students with CV assistance and mock interviews. Our
            comprehensive training means that you will be Interview Ready with a
            polished CV that will ensure your success
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default PlacementAssistance;
