import React, { useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userGoogleLogin } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import { clearErrors } from "../../actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import laptop from "../../assets/images/LandingPage/laptop.png";
import Group from "../../assets/images/LandingPage/Group.png";
import GoogleSVG from "./google.svg";
import { useStyles } from "./Style";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function LandingPage() {
  document.title = "Cybervie";
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
      console.log(codeResponse);
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${codeResponse.access_token}` },
        })
        .then((res) => res.data);

      console.log(userInfo);
     
    },
  });
  const handleSignIn = (info) => {
    // googleLogin();
    dispatch(userGoogleLogin(info));
  };

  const handleFailure = () => {
    window.location = 'https://portal.cybervie.com/'
    return;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.root}>
            <div className="LandingPageInfoContainer">
              <div className="LPGreeting">Welcome to</div>
              <div className="LPHeader">Cybervie</div>
              <div className="LPDescription">
                Solving the Cybersecurity talent cleft by providing real-time
                training.
              </div>
              <div className={classes.buttonContainer}>
                <>
                  {/* <button
                    onClick={handleSignIn}
                    // disabled={renderProps.disabled}
                    className={classes.GoogleLogin}
                  >
                    <span style={{ marginRight: 13 }}>
                      <img style={{ height: 29 }} src={GoogleSVG} alt="" />
                    </span>
                    Sign In with Google
                  </button> */}
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      handleSignIn(credentialResponse)
                    }}
                    theme="filled_black"
                    text="signin_with"
                    shape="circle"
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </>
              </div>
            </div>
            <div className="rootGroupContainer">
              <img src={Group} alt="" />
              <div className="rootLaptopContainer">
                <img src={laptop} alt="" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LandingPage;
