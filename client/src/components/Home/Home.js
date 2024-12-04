import React, { useEffect, useState } from "react";
import ModulesList from "../ModulesList/ModulesList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton, Box, Grid } from "@material-ui/core";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import { getAllStats } from "../../actions/moduleAction";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllAssessmentsToReview } from "../../actions/assessmentAction";
import ReviewList from "../QuestionsAdminReviewSection/ReviewCards";
import ModuleOverview from "../Module/ModuleOverview";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    minHeight: "90vh",
    padding: "40px 4%",
    backgroundColor: "#f7f7f7",
  },
  headerTitle:{
    fontSize: 41,
    [theme.breakpoints.down(469)]: {
      fontSize:"35px",
      marginLeft: "8%"
    },
    [theme.breakpoints.down(376)]: {
      fontSize:"32px",
      marginLeft: "3%"
    },
  },
  appBar: {
    width: "100%",
  },
  homeCompMenuButton: {
    marginRight: theme.spacing(2),
  },
  homeTitle: {
    flexGrow: 1,
    color: "#e0e6ec",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  homeBlink: {
    animation: `$homeBlink 1s linear infinite`,
    color: "white",
    // fontFamily: "cursive",
    textAlign: "center",
  },
  homeblinkSmall: {
    animation: `$homeBlink 1s linear infinite`,
    color: "white",
    fontFamily: "cursive",
    textAlign: "center",
    "@media (max-width: 600px)": {
      fontSize: "small", // Responsive font size for h6 on small screens
    },
  },
  "@keyframes homeBlink": {
    "0%": { opacity: 0 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down(469)]: {
      justifyContent:"center",
      gap:"34px",
      
    },
  },
  header:{
    fontSize:"41px",
    [theme.breakpoints.down(426)]: {
      marginLeft:"30px",
      fontSize:"32px",
      padding:10
    },
  },

  playgroundButton: {
    background:
      "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
    marginRight: "6%",
    color: "white",
    [theme.breakpoints.down(469)]: {
      fontSize:"0.7rem !important",
    },
    [theme.breakpoints.down(376)]: {
      fontSize:"0.6rem !important"
    },
  },
}));


function Home() {
  document.title = "Home";
  const classes = useStyles();
  const userData = useSelector((state) => state.user);
  const user = userData.data;
  const dispatch = useDispatch();
  const history = useHistory();
  const [appBarWidth, setAppBarWidth] = useState("100%");
  const [teacher, setTeacher] = useState(false);
  const [assessmentData, setAssessmentData] = useState([]);
  const [statisticsData,setstatisticsData] = useState({})
  const { loading, assessments, error } = useSelector(state => state.assessmentReview);
  const {stats} = useSelector((state) => state.allStats)
  
 
  useEffect(()=>{
    dispatch(getAllStats())
  },[])




  useEffect(()=>{
    setstatisticsData(stats?.data)
  },[stats])


  useEffect(() => {
    if (userData?.data.role.includes("teacher")) {
      setTeacher(true);
      dispatch(getAllAssessmentsToReview(userData?.data?._id));
    }
  }, [dispatch, userData?.data?._id, userData?.data?.role]);


  useEffect(() => {
    if (assessments && assessments.length > 0) {
      setAssessmentData(assessments);
    }
  }, [assessments]);


  const openPlayground = () => {
    history.push("/playground");
  };


  const redirect = (assessmentId) => {
    // Define the redirect logic here
    history.push(`/review/${assessmentId}`);
  };


  return (
    <div className={classes.root}>
      <ModuleOverview stats = {statisticsData} />
      
        <>
          <Box className={classes.headerContainer}>
            <h2 className={classes.header}>Modules</h2>
            <Button
              type="submit"
              variant="contained"
              className={classes.playgroundButton}
              onClick={openPlayground}
            >
              Open Playground <TrendingUpIcon />
            </Button>
          </Box>
          {user?.mobile === "" &&
            user?.education === "" &&
            user?.currentSalary === "" && (
              <AppBar
                position="static"
                className={classes.appBar}
                style={{ width: appBarWidth }}
              >
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                    <AccessAlarmsIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Link
                      to="/profile"
                      style={{ color: "#e8eef4" }}
                      className={classes.homeBlink}
                    >
                      Welcome {user?.name}, proceed to complete your profile ➡️!!
                    </Link>
                  </Typography>
                </Toolbar>
              </AppBar>
            )}
          <ModulesList />
        </>
     
    </div>
  );
}


export default Home;






