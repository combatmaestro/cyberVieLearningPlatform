import React from 'react';
import { Box, Button, Typography, makeStyles, createMuiTheme } from '@material-ui/core';
import image from './images/footer.png';
import { useHistory } from "react-router-dom";


const theme = createMuiTheme({
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
    },
  });


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#081229',
    padding: "30px 102px",
    paddingRight:0,
    maxHeight:488,
    color: '#ffffff',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingInline: theme.spacing(3),
    },
  },
  textContent: {
    maxWidth: '50%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    width: '70%',
    fontFamily: 'Inter',
    marginBottom: theme.spacing(3),
    color: '#EDEDED',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1rem',
    },
  },
  subtitle: {
    fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: "normal",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    }
  },
  registerButton: {
    color: '#F5F5F5',
    fontWeight: 'normal',
    borderRadius: '8px',
    padding: theme.spacing(1, 4),
    cursor: 'pointer',
    border: '1px solid #269397',
    backgroundColor: 'transparent',
    '&:hover': {
      border: '1px solid #269397',
      boxShadow: '0 0 10px #269397',
    },
  },
  imageSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '45%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      marginTop: theme.spacing(3),
      display:"none"
    },
  },
  heading: {
      fontFamily: "Inter",
      fontSize: "16px",
      fontWeight: "normal",
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
      }
  }
}));

const SubFooter = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleRegister = () => {
    setTimeout(() => {
      history.push('/register');
      window.location.reload();
    }); 
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.textContent}>
        <Typography variant="h6" className={classes.heading}>
          Join CyberVie’s CSEP Programme Today
        </Typography>
        <Typography className={classes.title}>
          Take the First Step Towards a Thriving Cybersecurity Career
        </Typography>
        <Typography className={classes.subtitle}>
          Limited Slots Available - Hurry up and Register now.
        </Typography>
        <Button className={classes.registerButton} variant="outlined" onClick={handleRegister}>
          Register
        </Button>
      </Box>

      <Box className={classes.imageSection}>
        
        <img src={image} alt="SubFooter Image" width={600} height={488}/>
      </Box>
    </Box>
  );
};

export default SubFooter;
