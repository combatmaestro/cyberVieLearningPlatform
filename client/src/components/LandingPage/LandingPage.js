// import React, { useEffect } from "react";
// import { GoogleLogin } from '@react-oauth/google';
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { userGoogleLogin } from "../../actions/userActions";
// import Loader from "../Loader/Loader";
// import { clearErrors } from "../../actions/userActions";
// import { makeStyles } from "@material-ui/core/styles";
// import laptop from "../../assets/images/LandingPage/laptop.png";
// import Group from "../../assets/images/LandingPage/Group.png";
// import GoogleSVG from "./google.svg";
// import { useStyles } from "./Style";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// function LandingPage() {
//   document.title = "Cybervie";
//   const classes = useStyles();

//   let history = useHistory();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const { loading, isAuthenticated, error } = user;

//   useEffect(() => {
//     if (isAuthenticated) {
//       history.push("/home");
//     }
//   }, [dispatch, isAuthenticated, history]);

//   useEffect(() => {
//     if (error) {
//       //  alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [error, dispatch]);

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (codeResponse) => {
//       const userInfo = await axios
//         .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: { Authorization: `Bearer ${codeResponse.access_token}` },
//         })
//         .then((res) => res.data);
//     },
//   });
//   const handleSignIn = (info) => {
//     // googleLogin();
//     dispatch(userGoogleLogin(info));
//   };

//   const handleFailure = () => {
//     window.location = 'https://portal.cybervie.com/'
//     return;
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <div className={classes.root}>
//             <div className="LandingPageInfoContainer">
//               <div className="LPGreeting">Welcome to Cybervie</div>
//               <div className="LPHeader">CSEP</div>
//               <div className="LPDescription">
//               Certified Security Engineer Professional.
//               </div>
//               <div className={classes.buttonContainer}>
//                 <>
//                   {/* <button
//                     onClick={handleSignIn}
//                     // disabled={renderProps.disabled}
//                     className={classes.GoogleLogin}
//                   >
//                     <span style={{ marginRight: 13 }}>
//                       <img style={{ height: 29 }} src={GoogleSVG} alt="" />
//                     </span>
//                     Sign In with Google
//                   </button> */}
//                   <GoogleLogin
//                     onSuccess={(credentialResponse) => {
//                       handleSignIn(credentialResponse)
//                     }}
//                     theme="filled_black"
//                     text="signin_with"
//                     shape="circle"
//                     onError={() => {
//                     }}
//                   />
//                 </>
//               </div>
//             </div>
//             <div className="rootGroupContainer">
//               <img src={Group} alt="" />
//               <div className="rootLaptopContainer">
//                 <img src={laptop} alt="" />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default LandingPage;

import React from 'react'
import Navbar from './navBar'
import Hero from './hero'
import CompanySection from './companySection'
import SuccessStories from './successStories'
import TrainingModule from './trainingModule'
import ExclusiveFeatures from './exclusiveFeatures'
import FlexibleSchedules from './flexibleSchedule'
import CurrentLeaderBoard from './currentLeaderBoard'
import Success from './success'
import PlacementAssistance from './placement'
import Testimonials from './testimonial'
import RequirementsSection from './requirements'
import Certification from './certification'
import PaymentOptions from './paymentCard'
import InfoSection from './infoSection'
import FaqSection from './faqSection'
import SubFooter from './subFooter'
import Loader from "../Loader/Loader";
import { useSelector } from 'react-redux'
const LandingPage = () => {
  document.title = "Cybervie";

  
  const user = useSelector((state) => state.user);
  const { loading} = user;
  return (
    <>
    {loading ? (
        <Loader />
      ) : (
        <>
        <div>
      <Navbar />
      <Hero/>
      <CompanySection/>
      <SuccessStories/>
      <TrainingModule/>
      <ExclusiveFeatures/>
      <FlexibleSchedules/>
      <CurrentLeaderBoard/>
      <Success/>
      <PlacementAssistance/>
      <Testimonials/>
      <RequirementsSection/>
      <Certification/>
      <PaymentOptions/>
      <InfoSection/>
      <FaqSection/>
      <SubFooter/>
    </div>
        </>
      )}
    </>
  )
}

export default LandingPage

