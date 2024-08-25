import React, { useState } from 'react';
import { Grid, Typography, Button, Box, CircularProgress } from '@material-ui/core';
import OtpInput from 'otp-input-react';
import Login from './Login';
import { makeStyles } from '@material-ui/styles';
import { auth } from './firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast } from 'react-hot-toast'; // Import toast


const useStyles = makeStyles((theme) => ({
  formPanel: {
    padding: '32px 140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down(426)]: {
      padding: theme.spacing(4),
      height: '100vh',
      justifyContent: 'flex-start',
    },
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginBottom: theme.spacing(3),
    backgroundColor: '#118AB2',
    color: '#FFFFFF',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#118AB2',
    },
  },
  otpText: {
    marginTop: theme.spacing(2),
    fontSize: '16px',
    textAlign: 'center',
    color: '#6c757d',
  },
  loader: {
    marginRight: theme.spacing(2),
    backgroundColor: '#118AB2',
    color: '#FFFFFF',
  },
}));


const OtpVerification = ({ fullNumber }) => {
  const classes = useStyles();
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false); // State for loader


  const sendOtp = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationResult = await signInWithPhoneNumber(auth, fullNumber, recaptchaVerifier);
      setVerificationResult(confirmationResult);
      toast.success('OTP sent successfully');
      setOtpSent(true); // Show OTP input after OTP is sent // Show success toast
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error('Error sending OTP'); // Show error toast
    }
  };


  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };


  const handleVerifyOtp = async () => {
    setLoading(true); // Show loader
    try {
      await verificationResult.confirm(otp);
      setOtpVerified(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error('Error verifying OTP'); // Show error toast
    } finally {
      setLoading(false); // Hide loader
    }
  };


  return (
    !otpVerified ? (
      <Grid item xs={12} md={6} className={classes.formPanel}>
        <Typography variant="h6" className={classes.title} gutterBottom>
          {otpSent ? "ENTER OTP" : "OTP VERIFICATION"}
        </Typography>
        {!otpSent ? (
          <>
            <Typography className={classes.otpText}>
               OTP verification needed for {fullNumber}
            </Typography>
            <Button variant="contained" onClick={sendOtp} fullWidth className={classes.otpButton}>
              Send OTP
            </Button>
            <div id="recaptcha"></div>
          </>
        ) : (
          <>
            <Typography className={classes.otpText}>
              Enter OTP sent to {fullNumber}
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
            <Button
              variant="contained"
              onClick={handleVerifyOtp}
              fullWidth
              className={classes.otpButton}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} className={classes.loader} />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </>
        )}
      </Grid>
    ) : (
      <Login />
    )
  );
};


export default OtpVerification;



