import React from "react";
import { Box, Grid, Typography, makeStyles, createMuiTheme } from "@material-ui/core";
import image1 from './images/schedule1.webp';
import image2 from './images/schedule2.jpg';

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#011327",
    color: "#fff",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  heading: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
    fontSize: "32px",
    fontWeight: "bold",
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize:" 25px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize:"22px",
    },
  },
  subHeading: {
    textAlign: "center",
    margin: "0 auto",
    marginBottom: theme.spacing(4),
    fontSize: "18px",
    fontWeight: "normal",
    width: "65%",
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize:"14px",
      width:"100%"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize:"12px",
      width:"100%"
    },
  },
  sessionBox: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
    transition: "all 0.3s ease-in-out",
    marginBottom: theme.spacing(4),
    '&:hover': {
    transform: "translateZ(10px) scale(1.01)",
  },
  },
  sessionImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "200px",
    }
  },
  sessionContent: {
    position: "absolute",
    inset: 0,
    borderRadius: "12px",
    height: "300px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "rgba(50, 50, 50, 0.5)",
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "200px",
    }
  },
  sessionTitle: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
    color: "#fff",
    fontFamily: "Inter",
    textDecoration:"underline",
    textUnderlineOffset: "7px",
  },
  sessionDescription: {
    fontSize: "16px",
    margin: "0 auto",
    width: "55%",
    color: "#fff",
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize:"16px",
      width:"80%"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize:"14px",    
    },
  },
}));

// Component
const FlexibleSchedules = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container} id="schedule">
      <Typography className={classes.heading}>
        Flexible Schedules to Match Your Lifestyle
      </Typography>
      <Typography className={classes.subHeading}>
        Whether you’re an early riser or prefer late-night classroom sessions,
        CyberVie’s live online training has options for morning and evening slots.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box className={classes.sessionBox}>
            <img
              src={image1}
              alt="Morning Session"
              className={classes.sessionImage}
            />
            <Box className={classes.sessionContent}>
              <Typography className={classes.sessionTitle}>
                Morning Sessions
              </Typography>
              <Typography className={classes.sessionDescription}>
                Pre-Work Classes – Start your day with productive learning.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={classes.sessionBox}>
            <img
              src={image2}
              alt="Evening Session"
              className={classes.sessionImage}
            />
            <Box className={classes.sessionContent}>
              <Typography className={classes.sessionTitle}>
                Evening Sessions
              </Typography>
              <Typography className={classes.sessionDescription}>
                Wind down your evening with expert-led sessions.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlexibleSchedules;
