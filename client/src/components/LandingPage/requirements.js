import React from 'react';
import { Grid, Box, Typography, makeStyles, createMuiTheme } from '@material-ui/core';
import tick from './images/tick.png';
import image from './images/lady.png';


const theme = createMuiTheme({
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
    },
  });

// Custom styles
const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: "#0B1A35",
    color: "#fff",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: "30px 10px",
      display:"none"
    },
  },
  heading: {
    fontSize: "34px",
    fontWeight: "bold",
    marginTop: theme.spacing(4),
    fontFamily: "Inter",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  },
  subheading: {
    fontSize: "16px",
    color: "f2f2f2",
    fontFamily: "Inter",
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
  imageWrapper: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
  checklistItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  icon: {
    width: "45.43px",
    height: "40.03px",
    objectFit: "contain",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: "35px",
      height: "30px",
    },
  },
  requirements: {
    [theme.breakpoints.down('xs')]: {
      textAlign: "center",
    },
  },
  image: {
    width:635,
    height:492,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    }
  },
  text: {
    fontFamily: "Inter",
    fontSize: "20px",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      textAlign:"left"
    },
  }
}));

const RequirementsSection = () => {
  const classes = useStyles();

  return (
    <Box className={classes.section}>
        <Typography className={classes.heading}>
            Do You Have What It Takes?
          </Typography>
          <Typography className={classes.subheading}>
            Before you start, here’s what you need
          </Typography>
      <Grid container spacing={10} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box className={classes.imageWrapper}>
            <img 
              src={image}
              alt="Security Expert"
              className={classes.image}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.requirements}>
          <Box>
            <div className={classes.checklistItem}>
              <img 
                src={tick} 
                alt="Check Icon"
                className={classes.icon}
              />
              <Typography className={classes.text} >Bachelor Degree</Typography>
            </div>

            <div className={classes.checklistItem}>
              <img 
                src={tick} 
                alt="Check Icon"
                className={classes.icon}
              />
              <Typography className={classes.text} style={{ width: "80%" }}>
                Basic knowledge of programming and cybersecurity preferred
              </Typography>
            </div>

            <div className={classes.checklistItem}>
              <img 
                src={tick} 
                alt="Check Icon"
                className={classes.icon}
              />
              <Typography className={classes.text}>2+ Years of experience preferred</Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequirementsSection;
