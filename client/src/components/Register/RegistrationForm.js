import React, { useState, useEffect } from "react";
import background from "./background.svg";
import leftImage from "./leftImage.png";
import variant3 from "./Variant3.png";
import logo from "./logo.svg";
import shadow from "./shadow.png";
import frame from "./Frame.svg";
import { toast } from "react-hot-toast";
import OtpInput from "otp-input-react";
import { ThemeProvider, useTheme } from "@material-ui/core";
import { auth } from "./firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  saveFormData,
  getAllFormData,
} from "../../actions/leadMangementActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Select,
  InputAdornment,
  MenuItem,
  Box,
  colors,
} from "@material-ui/core";
import LeadForm from "LeadForm"


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down(475)]: {
      backgroundSize: "contain",
      backgroundRepeat: "repeat",
      backgroundPosition: "none",
    },
  },
  container: {
    width: "100%",
    backgroundColor: "unset",
    borderRadius: 10,
    paddingInline: theme.spacing(10),
    overflow: "hidden",
    display: "flex",
    gap: "2%",
    [theme.breakpoints.down(475)]: {
      flexDirection: "column",
      gap: theme.spacing(2),
      paddingInline: 20,
    },
  },
  imageSection: {
    width: 500,
    height: 647,
    background: "#ffffff",
    borderRadius: 16,
    flexBasis: "40%",
    marginTop: 10,
    boxShadow: "0 0 15px 0 rgba(255, 255, 255, 0.5)",
    [theme.breakpoints.down(475)]: {
      display: "none",
    },
  },
  imageSection2:{
    width: 500,
    height: 647,
    background: "#ffffff",
    borderRadius: 16,
    flexBasis: "40%",
    marginTop: 40,
    boxShadow: "0 0 15px 0 rgba(255, 255, 255, 0.5)",
    [theme.breakpoints.down(475)]: {
      display: "none",
    },
  },
  variant3: {
    position: "absolute",
    top: "20%",
    left: 100,
    zIndex: 10,
  },
  heroImage: {
    position: "relative",
    top: 0,
    width: "100%",
    height: 647,
    borderRadius: 16,
  },
  shadow: {
    position: "absolute",
    left: 80,
    bottom: -40,
    borderRadius: 16,
  },
  textSection: {
    width: "35%",
    textAlign: "center",
    color: "#FFFFFF",
    position: "absolute",
    bottom: -50,
    fontSize: "1.45rem",
    fontFamily: "math sans-serif",
  },
  formSection: {
    flex: 1,
    width: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // padding: theme.spacing(4),
    marginTop: 90,
    marginLeft: 70,
    [theme.breakpoints.down(475)]: {
      width: "100%",
      marginLeft: 5,
      marginTop: 30,
    },
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0),
    color: "#ffffff",
    marginLeft: -24,
    [theme.breakpoints.down(475)]: {
      fontSize: "2.5rem",
      marginLeft: 0,
    },
  },
  subTitle: {
    marginBottom: theme.spacing(5),
    marginLeft: -24,
    width: 220,
    [theme.breakpoints.down(476)]: {
      marginLeft: -10,
      marginBottom: theme.spacing(2),
    },
  },
  inputField: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#2e2e2e",
    width: "90%",
    borderRadius: 50,
    border:"1px solid #2e2e2e",
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px !important",
      color: "white !important",
    },
    "& .MuiInputBase-root": {
      color: "#ffffff",
    },
    "& input::placeholder": {
      color: "#afadad !important",
      opacity: 1,
    },
    "& .Mui-focused input::placeholder": {
      color: "transparent !important",
    },
    [theme.breakpoints.down(475)]: {
      width: "100%",
    },
  },
  button: {
    backgroundColor: "#493E71",
    padding: theme.spacing(1.5),
    borderRadius: 50,
    width: "90%",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#52428b",
    },
    [theme.breakpoints.down(475)]: {
      width: "100%",
    },
  },


  otpText: {
    color: "#ffffff",
    fontWeight: 100,
  },


  logo: {
    width: 180,
    height: 85,
    marginLeft: -46,
    [theme.breakpoints.down(475)]: {
      marginLeft: -30,
    },
  },
  subTitle2: {
    color: "#ffffff",
    fontWeight: 400,
    fontSize: 20,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down(475)]: {
      fontSize: 16,
      textAlign: "center",
    },
  },
  customOtpInput: {
    width: "70px !important ",
    height: "40px !important",
    margin: "0 5px",
    fontSize: "24px !important",
    borderRadius: 50,
    color: "#FFFFFF",
    border: "1px solid #D1D1D1",
    textAlign: "center",
    background:
      "linear-gradient(to right, rgba(27, 27, 29, 0.15) 0%, rgba(122, 122, 122, 0.55) 100%)",
    [theme.breakpoints.down(475)]: {
      width: "60px !important",
      height: "35px !important",
      fontSize: "20px !important",
      margin: "0 2.5px !important",
    },
    [theme.breakpoints.down(380)]: {
      width: "53px !important",
      height: "35px !important",
      fontSize: "18px !important",
      margin: "0 2.5px !important",
    },
    [theme.breakpoints.down(325)]: {
      width: "46px !important",
      height: "28px !important",
      fontSize: "16px !important",
      margin: "0 2px !important",
    },
  },
}));


const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+91", name: "India" },
  { code: "+44", name: "United Kingdom" },
];


const RegistrationForm = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [otp, setOtp] = useState("");
  const [captchaVisible, setCaptchaVisible] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const allFormDatas = useSelector((state) => state.formDataState);
  const { allFormData = [] } = allFormDatas;


  useEffect(() => {
    dispatch(getAllFormData());
  }, []);


  const numbers = allFormData.map((item) => item.phoneNumber);


  const checkPhoneNumberVerificationStatus = async (phoneNumber) => {
    const verifiedNumbers = numbers;
    return verifiedNumbers.includes(phoneNumber);
  };


  useEffect(() => {
    if (phoneNumber) {
      checkPhoneNumberVerificationStatus(phoneNumber).then((status) => {
        // setIsPhoneVerified(status);
        if (status) {
          toast.success("Phone number already verified");
          setOtpSent(true);
          setOtpVerified(true);
        }
      });
    }
  }, [phoneNumber]);


  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };


  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };


  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };


  const fullNumber = `${countryCode}${phoneNumber}`;
  const handleRegister = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        fullNumber,
        recaptchaVerifier
      );
      setVerificationResult(confirmationResult);
      toast.success("OTP sent successfully");
      setOtpSent(true);
      setCaptchaVisible(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP");
    }
  };


  const handleVerifyOtp = async () => {
    try {
      await verificationResult.confirm(otp);
      toast.success("Otp verified successfully");
      setOtpVerified(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP");
    }
  };


  return (
    <div className={classes.root}>
      <Card className={classes.container}>
        <Grid item xs={12} sm={6} className={`${otpVerified ? classes.imageSection2 : classes.imageSection}`}>
          <div>
            <img
              src={variant3}
              height={40}
              width={40}
              className={classes.variant3}
              alt="Left Image"
             
            />
            <img
              src={leftImage}
              xs={12}
              sm={6}
              alt="Left Image"
              bmfz
              className={classes.heroImage}
            />
            <img
              src={shadow}
              width={545}
              height={200}
              className={classes.shadow}
            />
            <CardContent className={classes.textSection}>
              <Typography variant="h5">
                "The Cybervie live case study is truly remarkable. It
                effortlessly facilitates learning a wide range of
                methodologies."
              </Typography>
            </CardContent>
          </div>
        </Grid>
        {/* Right Section (Form) */}
        {!otpVerified ? (
          <Grid item xs={12} sm={6} className={classes.formSection}>
            <img src={logo} alt="Logo" className={classes.logo} />
            {!otpSent ? (
              <Typography variant="h2" className={classes.title}>
                Holla !!!
              </Typography>
            ) : (
              <Typography variant="h3" className={classes.title}>
                Enter the code
              </Typography>
            )}
            <img src={frame} className={classes.subTitle} />
            {!otpSent ? (
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.subTitle2}
                >
                  Enter Your Phone Number for Login or SignUp
                </Typography>
                <TextField
                  variant="outlined"
                  autoComplete="off"
                  required
                  fullWidth
                  name="phoneNumber"
                  placeholder="Enter your number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={classes.inputField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Select
                          value={countryCode}
                          onChange={handleCountryCodeChange}
                          style={{ marginRight: "8px", color: "white" }}
                          variant="standard"
                        >
                          {countryCodes.map((country) => (
                            <MenuItem key={country.code} value={country.code}>
                              {country.code}
                            </MenuItem>
                          ))}
                        </Select>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  className={classes.button}
                  onClick={handleRegister}
                >
                  Register
                </Button>
                <div id="recaptcha" style={{ marginBlock: 10 }}></div>
              </div>
            ) : (
              <>
                <Typography className={classes.otpText}>
                  Enter the OTP sent to your registerd number {fullNumber}
                  {/* {console.log(fullNumber)} */}
                </Typography>
                <Grid container justify="center">
                  <Box className={classes.otpBox}>
                    <OtpInput
                      value={otp}
                      onChange={handleOtpChange}
                      autoFocus
                      OTPLength={6}
                      otpType="number"
                      style={{ marginBlock: 25 }}
                      disabled={false}
                      inputClassName={classes.customOtpInput}
                    />
                  </Box>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  className={classes.button}
                  onClick={handleVerifyOtp}
                  // style={{ width: "75%" }}
                >
                  Verify
                </Button>
              </>
            )}
          </Grid>
        ) : (
          <LeadForm phoneNumber={`${phoneNumber}`} />
        )}
      </Card>
    </div>
  );
};


export default RegistrationForm;

