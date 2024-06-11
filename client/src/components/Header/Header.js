import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useMediaQuery, useTheme } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import WorkIcon from "@material-ui/icons/Work";
import TableChartIcon from "@material-ui/icons/TableChart";

import { useDispatch } from "react-redux";
import { userSignout } from "../../actions/userActions";

import clsx from "clsx";

//component
import CustomMenu from "./customMenu";

//other stuff
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiToolbar-regular": {
      minHeight: 80,
    },

    "& .MuiAppBar-colorPrimary": {
      backgroundColor: "#EBF3FF",
    },

    "& button:focus": {
      outline: "0px auto -webkit-focus-ring-color",
    },
  },

  icon: {
    width: 67,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginTop: 2,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 17,
    color: "#005387",
    marginRight: 30,
    cursor: "pointer",
  },

  list: {
    width: 250,
    padding: 12,
    boxSizing: "border-box",
    fontWeight: 500,
    "& img": {
      height: "100%",
      width: "100%",
      borderRadius: "100%",
    },
    "& .userEmail": {
      fontSize: "small",
      fontWeight: 400,
    },
    "& .MuiListItem-gutters": {
      paddingLeft: 0,
    },

    "& .MuiListItemIcon-root": {
      minWidth: 40,
    },
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
  },

  sidebarInfo: {
    gridColumnGap: 12,
    marginBottom: 8,
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(450));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchor, setMobileAnchor] = useState(false);
  // const open = Boolean(anchorEl);

  const user = useSelector((state) => state.user);
  const { data, isAuthenticated } = user;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    dispatch(userSignout());
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setMobileAnchor(open);
  };

  const Content = (data) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box className={classes.sidebarInfo} display="flex">
        <Box style={{ width: 50 }}>
          <img src={data.avatar.url} alt="" />
        </Box>
        <Box display="flex" flexDirection="column">
          <Box>{data.name}</Box>
          <Box className="userEmail">{data.email}</Box>
        </Box>
      </Box>
      <Divider />
      <List>
        <Link to="/profile">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </ListItem>
        </Link>
        <a
          href="https://www.cybervie.com/cyber-security-training-program/"
          target="_blank"
        >
          <ListItem button>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText>My Courses</ListItemText>
          </ListItem>
        </a>
        <Link to="/transaction">
          <ListItem button>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText>My Transaction</ListItemText>
          </ListItem>
        </Link>
        <Link to="/LeaderBoard">
          <ListItem button>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText>LeaderBoard</ListItemText>
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <CardMembershipIcon />
          </ListItemIcon>
          <ListItemText>My Certificates</ListItemText>
        </ListItem>
        <Link to="/progress">
          <ListItem button>
            <ListItemIcon>
              <TableChartIcon />
            </ListItemIcon>
            <ListItemText>My Progress</ListItemText>
          </ListItem>
        </Link>
        <ListItem button>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText>Placement</ListItemText>
        </ListItem>
        <ListItem button onClick={signOutHandler}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div style={{ width: 130 }}>
              <Link to="/home">
                <img
                  style={{ width: "100%", height: "100%" }}
                  alt="logo"
                  src="/images/logoCybervie.png"
                />
              </Link>
            </div>
          </Typography>
          {isAuthenticated && (
            <>
              {!isMobile ? (
                <>
                  <Box display="flex" alignItems="center">
                  <Link to="/batch">
                      <Typography className={classes.headerTitle} variant="h6">
                        Upcoming Live Classes
                      </Typography>
                    </Link>
                    {/* <a
                      href="https://www.cybervie.com/cyber-security-training-program/"
                      target="_blank"
                    >
                      <Typography className={classes.headerTitle} variant="h6">
                        Courses
                      </Typography>
                    </a> */}
                    <Typography className={classes.headerTitle} variant="h6">
                      Certificates
                    </Typography>
                    <Link to="/placements">
                      <Typography className={classes.headerTitle} variant="h6">
                        Placement
                      </Typography>
                    </Link>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      className={classes.icon}
                    >
                      <img
                        src={data.avatar.url}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                        }}
                        alt=""
                      />
                    </IconButton>
                    <CustomMenu
                      handleClose={handleClose}
                      anchorEl={anchorEl}
                      data={data}
                      signOutHandler={signOutHandler}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Button onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </Button>
                  <SwipeableDrawer
                    anchor="right"
                    open={mobileAnchor}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                  >
                    {Content(data)}
                  </SwipeableDrawer>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
