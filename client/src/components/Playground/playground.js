import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Card, CardContent, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import StopIcon from "@material-ui/icons/Stop";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import gif from "./demo.gif";
import { createLab, startLab, stopLab } from "../../actions/labActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    minHeight: "90vh",
    padding: "40px 4%",
    backgroundColor: "#f7f7f7",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startButton: {
    color: "black",
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
    color: "transparent",
    background: "linear-gradient(90deg, blue, orange)",
    backgroundClip: "text",
    textAlign: "center",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "30px",
    fontWeight:"bold"
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
  blink: {
    animation: "blink-animation 1s steps(5, start) infinite",
    WebkitAnimation: "blink-animation 1s steps(5, start) infinite",
    color: "transparent",
    background: "linear-gradient(90deg, blue, orange)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "30px",
    fontWeight:"bold"
  },
  "@keyframes blink-animation": {
    "0%, 100%": {
      visibility: "visible",
    },
    "50%": {
      visibility: "hidden",
    },
  },
}));

function Playground() {
  document.title = "Playground";
  const classes = useStyles();
  const userData = useSelector((state) => state.user);
  const labData = useSelector((state) => state.lab);
  const user = userData.data;
  const dispatch = useDispatch();
  const [iframeSrc, setIframeSrc] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [labStarted, setLabStarted] = useState(false);
  const [creatingLab, setCreatingLab] = useState(false)
  const iframeRef = useRef(null);

  const onStart = () => {
    setLabStarted(true);
    dispatch(startLab(user.email));
  };

  const onCreate = () => {
    setCreatingLab(true);
    dispatch(createLab(user.email));
  };

  const onStop = () => {
    dispatch(stopLab(user.email));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (labData?.labData?.url) {
      setIframeSrc(labData.labData.url);
      setLabStarted(false);
      const totalDuration = labData.labData.stats.monthlyTotalDuration;
      const activeDuration = labData.labData.stats.activeDuration;
      const initialTimeLeft = (totalDuration - activeDuration) * 60;
      setTimeLeft(initialTimeLeft);
    }
  }, [labData]);

  useEffect(() => {
    if (labData?.labData?.MessageCode === "12000") {
      setLabStarted(false);
    }


    if(labData?.labCreated){
      console.log("Lab created",labData?.labCreated)
    }
  }, [labData]);




  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [labStarted]);

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (!document.fullscreenElement) {
        iframeRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.headerContainer}>
        <h2 style={{ fontSize: 35 }}>Practice Ground</h2>
        {!user.labCreated && user.tier === "paid" && (
          <a
            variant="contained"
            className={classes.startButton}
            onClick={onCreate}
            style={{ color: "orange" }}
          >
            <AddCircleIcon /> Create Lab
          </a>
        )}
        {user.tier === "paid" && (
          <>
            <a
              style={{ color: "green" }}
              variant="contained"
              className={classes.startButton}
              onClick={onStart}
            >
              <QueuePlayNextIcon /> Start Lab
            </a>
            <a
              style={{ color: "red" }}
              variant="contained"
              className={classes.startButton}
              onClick={onStop}
            >
              <StopIcon /> Stop
            </a>
            <a
              variant="contained"
              className={classes.startButton}
              onClick={onStop}
            >
              <AccessTimeIcon />
              {"Remaining: "}
              {labStarted ? ` ${formatTime(timeLeft)}` : "N.A"}
            </a>

            <IconButton
              onClick={toggleFullscreen}
              className={classes.startButton}
            >
              {document.fullscreenElement ? (
                <FullscreenExitIcon />
              ) : (
                <FullscreenIcon />
              )}
            </IconButton>
          </>
        )}
      </Box>
      <Card style={{ border: "1px solid" }}>
        <CardContent
          style={{ position: "relative", height: "600px", width: "100%" }}
        >
          {user.tier === "paid" && labStarted && user.labCreated && (
            <div
              className={classes.homeBlink}
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              Starting Lab ...
            </div>
          ) }
          
          {user.tier === "free" && (
            <div
              className={classes.homeBlink}
              style={{
                position: "absolute",
                top: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              CloudLabs is Accessible to Enrolled Students ...
            </div>
          )}
          {labStarted ? (
            <iframe
              ref={iframeRef}
              height="100%"
              width="100%"
              src={iframeSrc}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            ></iframe>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                height: "100px",
                width: "100px",
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={gif}
                alt="Lab Loading"
                style={{
                  height: "250px",
                  width: "220px",
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Playground;
