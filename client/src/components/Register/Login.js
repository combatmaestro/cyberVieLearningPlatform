import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// import ExpertPage from './ExpertPage';

const useStyles = makeStyles((theme) => ({
  formPanel: {
    padding: '32px 50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    height:'100vh',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down(426)]: {
      padding: theme.spacing(1),
      height:'100vh',
      justifyContent: 'flex-start',
    },
  },
  title: {
    fontWeight:600,
    textAlign:'center',
    paddingBottom:20,
    fontSize: '42px',
    [theme.breakpoints.down(426)]: {
        fontSize:'24px',
        marginTop:36,
      },
},
btn:{
    width:'70%',
    padding:theme.spacing(2),
    backgroundColor:'#FFFFFF',
}
}));

const OtpVerification = () => {

    const handleLogin = ()=>{
        alert("login success")
    }

  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} className={classes.formPanel}>
    <Typography variant="h4" className={classes.title}>
      WELCOME TO CYBERVIE CSEP
    </Typography>
    <Typography variant="subtitle1" paragraph style={{marginBottom:'5rem',fontWeight:'550'}}>
      Certified Security Engineer Professional.
    </Typography>
    <Typography variant="subtitle1" paragraph style={{fontWeight:'550'}}>
      Login with Google to continue
    </Typography>
    <Button onClick={handleLogin}
     className={classes.btn} variant="contained" color="default" startIcon={<img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google Logo" width="20" />} >
      Continue with Google
    </Button>
</Grid>
    
  );
};

export default OtpVerification;
