import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookIcon from "@material-ui/icons/Book";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Avatar from "@material-ui/core/Avatar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TimerIcon from "@material-ui/icons/Timer";
import avtar from "./Logo.png";


const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(88.06deg, #E9F3FF 0%, #EBF8FF 40.15%, #DBFBFE 81.03%, #D4FFFE 106.75%)",
    borderRadius: "100px",
    height: "141px",
    width: "96%",
    marginBottom: "50px",
    // boxShadow: '0px 1.84527px 15.6905px rgba(0, 0, 0, 0.22)',
    boxShadow: "0px 4px 4px 0px #DEDEDE40",
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(426)]: {
      padding: theme.spacing(0),
      height: "120px",
      background: "#D4FFFE",
      width: "100%",
    },
  },
  avatar: {
    width: theme.spacing(11),
    height: theme.spacing(11),
    background: "#ffffff",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    position:"relative",
    top:"27px",
    left:"35px",
    zIndex: "999",
  },
  infoBox: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    padding: theme.spacing(9),
    position: "relative",
    left: "25px",
    [theme.breakpoints.down(426)]: {
      paddingInline: theme.spacing(3),
      left: 0,
    },
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatarBox: {
    background: "#ffffff",
    width: "162px",
    height: "146px",
    position: "relative",
    left: "-25px",
    borderRadius: "100%",
    [theme.breakpoints.down(426)]: {
      display: "none",
    },
  },
  icon: {
    fontSize: "3rem",
    marginRight: theme.spacing(1),
    [theme.breakpoints.down(426)]: {
      fontSize: "1.8rem",
      marginRight: 0,
    },
  },
  text: {
    fontWeight: "600",
    color: "#005387",
    fontSize: "19.23px",
    lineHeight: "22.41px",
    [theme.breakpoints.down(426)]: {
      fontSize: "10.23px",
    },
  },
  subText: {
    color: "#005387C9",
    [theme.breakpoints.down(426)]: {
      fontSize: "0.7rem",
    },
  },
  avtarText: {
    position: "relative",
    left: "-9px",
    color: "black",
    fontSize: "17px",
    fontWeight: "600",
    textAlign: "center",
    [theme.breakpoints.down(426)]: {
      display:"none"
    },
  },
  
}));


const ModuleOverview = ({stats}) => {
  const classes = useStyles();


  return (
    <Box className={classes.root}>
      <Box className={classes.avatarBox}>
        <Box>
          {/* <img alt="User Avatar" src={avtar} className={classes.avatar} /> */}
          {/* <Typography
            variant="subtitle"
            style={{
              position: "relative",
              left: "-9px",
              color: "black",
              fontSize: "17px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Welcome to CSEP
          </Typography> */}
        </Box>
      </Box>
      <Box className={classes.infoBox}>
        <Box className={classes.iconBox}>
          <BookIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Modules</Typography>
            <Typography className={classes.subText}>{stats?.completedModules}/{stats?.totalModules}</Typography>
          </Box>
        </Box>
        <Box className={classes.iconBox}>
          <AssignmentIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Topics</Typography>
            <Typography className={classes.subText}>{stats?.completedTopics}/{stats?.totalTopics}</Typography>
          </Box>
        </Box>
        <Box className={classes.iconBox}>
          <ListAltIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Sub-topics</Typography>
            <Typography className={classes.subText}>{stats?.completedSubTopics}/{stats?.totalSubTopics}</Typography>
          </Box>
        </Box>
        <Box className={classes.iconBox}>
          <TimerIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}> Status</Typography>
            <Typography className={classes.subText}>Pending</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


export default ModuleOverview;






