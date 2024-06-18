import React, { useRef, useEffect, useState } from "react";
import ModulesList from "../ModulesList/ModulesList";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    minHeight: "90vh",
    padding: "40px 4%",
    backgroundColor: "#f7f7f7",
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
}));

function Home() {
  document.title = "Home";
  const classes = useStyles();
  const userData = useSelector((state) => state.user);
  const user = userData.data;
  const modulesListRef = useRef(null);
  const [appBarWidth, setAppBarWidth] = useState("100%");

  useEffect(() => {
    const updateAppBarWidth = () => {
      if (modulesListRef.current) {
        const width = modulesListRef.current.getBoundingClientRect().width;
        setAppBarWidth(`${width}px`);
      }
    };

    updateAppBarWidth(); // Initial calculation

    window.addEventListener("resize", updateAppBarWidth); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", updateAppBarWidth); // Cleanup
    };
  }, []);

  return (
    <div className={classes.root}>
      <h2 style={{ fontSize: 41 }}>Modules</h2>
      {
            !(user.mobile != "" && user.education !="" && user.currentSalary !="" ) && 
      <AppBar position="static" className={classes.appBar} style={{ width: appBarWidth }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <AccessAlarmsIcon />
          </IconButton>
         
         
            <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/profile" style={{ color: "#e8eef4" }} className={classes.homeBlink}>
              Welcome {user.name} , proceed to complete your profile ➡️!!
            </Link>
          </Typography>
         
         
        </Toolbar>
      </AppBar>
       }
      <ModulesList ref={modulesListRef} />
    </div>
  );
}

export default Home;
