import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BookIcon from "@material-ui/icons/Book";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Avatar from "@material-ui/core/Avatar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import TimerIcon from "@material-ui/icons/Timer";
import avtar from "./avtar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(88.06deg, #E9F3FF 0%, #EBF8FF 40.15%, #DBFBFE 81.03%, #D4FFFE 106.75%)",
    borderRadius: "100px",
    height: "161px",
    width: "96%",
    marginBottom: "50px",
    // boxShadow: '0px 1.84527px 15.6905px rgba(0, 0, 0, 0.22)',
    boxShadow: "0px 4px 4px 0px #DEDEDE40",

    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    background: "#ffffff",
    marginRight: theme.spacing(2),
    marginBottom:theme.spacing(1),
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
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatarBox: {
    background: "#ffffff",
    width: "172px",
    height: "161px",
    position: "relative",
    left: "-25px",
    borderRadius: "100px 100px 0px 100px",

  },
  icon: {
    fontSize: "3rem",
    marginRight: theme.spacing(1),
  },
  text: {
    fontWeight: "600",
    color: "#005387",
    fontSize: "19.23px",
    lineHeight: "22.41px",
  },
  subText: {
    color: '#005387C9',
  },
}));

const ModuleOverview = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.avatarBox}>
        <Box
          style={{
            position: "relative",
            left: "37px",
            top: "15px",
            alignItems: "center",
          }}
        >
          <Avatar alt="User Avatar" src={avtar} className={classes.avatar} />
          <Typography
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
          </Typography>
        </Box>
      </Box>
      <Box className={classes.infoBox}>
        <Box className={classes.iconBox}>
          <BookIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Modules</Typography>
            <Typography className={classes.subText}>1/11</Typography>
          </Box>
        </Box>
        <Box className={classes.iconBox}>
          <AssignmentIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Topics</Typography>
            <Typography className={classes.subText}>3/56</Typography>
          </Box>
        </Box>
        <Box className={classes.iconBox}>
          <ListAltIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Sub-topics</Typography>
            <Typography className={classes.subText}>10/232</Typography>
          </Box>
        </Box>
        <Box className={classes.iconBox}>
          <TimerIcon className={classes.icon} color="primary" />
          <Box>
            <Typography className={classes.text}>Assignment Status</Typography>
            <Typography className={classes.subText}>Pending</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModuleOverview;