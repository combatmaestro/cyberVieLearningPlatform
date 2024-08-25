import React, { useState } from 'react';
import { Grid, Typography, Button, Box } from '@material-ui/core';
import OtpInput from 'otp-input-react';
import Login from './Login'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  formPanel: {
    padding: '32px 140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    height:'100vh',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down(426)]: {
      padding: theme.spacing(4),
      height:'100vh',
      justifyContent: 'flex-start'
    },
  },
  title: {
    fontWeight: 'bold',
    textAlign:'center',
  },
  otpBox: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  otpButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5),
    backgroundColor: '#118AB2',
    color: '#FFFFFF',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#073B4C',
    },
  },
  otpText: {
    marginTop: theme.spacing(2),
    fontSize: '16px',
    textAlign: 'center',
    color: '#6c757d',
  },
}));

const OtpVerification = () => {
  const classes = useStyles();
  const [otp, setOtp] = useState('');
  const[optVerified,setOptVerified] = useState(false)
  
  const handleClick = () => {
      setOptVerified(true)
  }
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };
  
  return (
    !optVerified ? <Grid item xs={12} md={6} className={classes.formPanel}>
    <Typography variant="h6" className={classes.title} gutterBottom>
      ENTER OTP
    </Typography>
    <Typography className={classes.otpText}>
      Enter OTP sent to 94xxxx3405
    </Typography>
    <Grid container justify="center">
      <Box className={classes.otpBox}>
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          inputStyles={{
              width: '50px',
              height: '50px',
              margin: '0 4px',
              fontSize: '24px',
              borderRadius: '8px',
              border: '1px solid #D1D1D1',
              textAlign: 'center',
              backgroundColor: '#F2F2F2',
            }}
        />
      </Box>
    </Grid>
    <Button variant="contained" fullWidth className={classes.otpButton}
    onClick={handleClick}
    >
      Verify OTP
    </Button>
  </Grid> : <Login/>
    
  );
};

export default OtpVerification;
