import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withStyles } from "@material-ui/core/styles";
import { Fade, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";


const StyledMenu = withStyles({
  paper: {
    width: 320,
    transition: "all 225ms ease-in !important",
    border: "1px solid #d3d4d5",
    top: "64px !important",
    left: "unset !important",
    right: 20,
    borderRadius: "0px 0px 4px 4px",

    "& > ul": {
      padding: 0,

      "& li": {
        padding: "19px 20px",
      },
    },
  },
})((props) => (
  <Menu
    disableScrollLock
    elevation={10}
    TransitionComponent={Fade}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))

const useStyles = makeStyles((theme) => ({
  root: {
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
  },

  info: {
    display: "flex",
    flexDirection: "row",
    gridColumnGap: 24,
    borderBottom: "1px solid rgba(0,0,0,0.12)",

    "& .userAvatar": {
      width: "66px",
    },

    "& img": {
      height: "100%",
      width: "100%",
      borderRadius: "100%",
    },

    "& .userEmail": {
      fontSize: "small",
    },

    "& .MuiButtonBase-root": {
      padding: 0,
      justifyContent: "start",
      marginTop: 6,

      "& .MuiSvgIcon-root": {
        height: 13.5,
        width: 13.5,
        marginLeft: 4,
        color: "blue",
      },
    },
  },
}));

export default function NotifyMenu(props) {
  const { anchorEl, handleClose, data, signOutHandler } = props;
  const classes = useStyles();

  return (
    <div>
      <StyledMenu
        className={classes.root}
        id="notification-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {data.map((notification, index) => (
          <MenuItem key={index}>
            <Box>{notification.message}</Box>
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
