import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userGoogleLogin } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import { clearErrors } from "../../actions/userActions";
import laptop from "../../assets/images/LandingPage/laptop.png";
import Group from "../../assets/images/LandingPage/Group.png";
// import GoogleSVG from "./google.svg";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formPanel: {
    padding: "32px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down(426)]: {
      padding: theme.spacing(1),
      height: "100vh",
      justifyContent: "flex-start",
    },
  },
  title: {
    fontWeight: 600,
    textAlign: "center",
    paddingBottom: 20,
    fontSize: "42px",
    [theme.breakpoints.down(426)]: {
      fontSize: "24px",
      marginTop: 36,
    },
  },
  btn: {
    width: "70%",
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
  },
}));
const OtpVerification = () => {
  const handleLogin = () => {
   history.push("/")
  };

  const classes = useStyles();
  document.title = "Cybervie";

  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, isAuthenticated, error } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/home");
    }
  }, [dispatch, isAuthenticated, history]);

  useEffect(() => {
    if (error) {
      //  alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        })
        .then((res) => res.data);

    },
  });
  const handleSignIn = (info) => {
    // googleLogin();
    dispatch(userGoogleLogin(info));
  };

  const handleFailure = () => {
    window.location = "https://portal.cybervie.com/";
    return;
  };

  return (
    <Grid item xs={12} md={6} className={classes.formPanel}>
      <Typography variant="h4" className={classes.title}>
        WELCOME TO CYBERVIE CSEP
      </Typography>
      <Typography
        variant="subtitle1"
        paragraph
        style={{ marginBottom: "5rem", fontWeight: "550" }}
      >
        Become a Certified Security Engineer Professional.
      </Typography>
      {/* <Typography variant="subtitle1" paragraph style={{ fontWeight: "550" }}>
        Login with Google to continue
      </Typography> */}
      <Button
        onClick={handleLogin}
        className={classes.btn}
        variant="contained"
        color="default"
        // startIcon={
        //   <img
        //     src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
        //     alt="Google Logo"
        //     width="20"
        //   />
        // }
      >
        Explore CSEP Platform
      </Button>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
         
          handleSignIn(credentialResponse);
        }}
        theme="filled_black"
        text="signin_with"
        shape="circle"
      /> */}
    </Grid>
  );
};

export default OtpVerification;
