import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core";
import googleIcon from "./images/google.svg";
// import laptop from "./images/laptop.png";
// import group from "./images/Group.png";
import logo from "./images/CSEP Horizontal Logo.svg"
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userGoogleLogin } from "../../actions/userActions";
import { clearErrors } from "../../actions/userActions";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#0b1e34",
    display: "flex",
    alignItems: "center",
    paddingInline: "102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
      minHeight: "80vh",
      backgroundColor: "#0b1e34",
    },
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  leftSection: {
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
      marginBottom: theme.spacing(4),
    },
  },
  heading: {
    fontSize: "52px",
    fontWeight: "550",
    fontFamily: "Inter",
    lineHeight: "70px",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      fontSize: "32px",
      lineHeight: "45px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "28px",
      lineHeight: "40px",
    },
  },
  subText: {
    fontSize: "24px",
    fontFamily: "Inter",
    fontWeight: "100",
    width: "65%",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
      width: "100%",
    },
  },
  subText2: {
    fontSize: "14px",
    fontFamily: "Inter",
    marginBottom: theme.spacing(2),
    fontWeight: "400",
  },
  rightSection: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  groupImage: {
    width: "100%",
    height: "auto",
  },
  laptopImage: {
  marginLeft: "40px",
    width: "450px",
    height: "220px",
    objectfit: "contain",
  },
}));

const Hero = () => {
  const classes = useStyles();
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
    <Box className={classes.root}>
      <Container style={{ padding: 0 }}>
        <Grid container className={classes.contentWrapper}>
          <Grid item xs={12} md={6} className={classes.leftSection}>
            <Typography variant="h1" className={classes.heading}>
              Step Into the Future of Cybersecurity
            </Typography>
            <Typography variant="body1" className={classes.subText}>
              Turn Your Passion Into a Rewarding Career with CyberVie.
            </Typography>
            <Typography variant="body1" className={classes.subText2}>
              Already registerd? Please login.
            </Typography>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleSignIn(credentialResponse);
              }}
              theme="filled_black"
              text="signin_with"
              shape="circle"
              onError={() => {}}
            />
          </Grid>

          <Grid item xs={12} md={6} className={classes.rightSection}>
            {/* <img src={group} alt="Group" className={classes.groupImage} /> */}
            {/* <img src={logo} alt="Laptop" className={classes.laptopImage} /> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
