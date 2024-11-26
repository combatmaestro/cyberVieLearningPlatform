import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withStyles } from "@material-ui/core/styles";
import { Fade, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'
import { userRefresh } from "../../actions/userActions";
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
));

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

export default function CustomMenu(props) {
  const dispatch = useDispatch()
  const { anchorEl, handleClose, data, signOutHandler } = props;
  const user = useSelector((state) => state.user);
  const classes = useStyles();


  useEffect(() => {
    //to refresh user
    dispatch(userRefresh())
  }, [dispatch])


  return (
    <div>
      <StyledMenu
        className={classes.root}
        id="menu-appbar"
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
        <MenuItem className={classes.info} onClick={handleClose}>
          <Box className="userAvatar">
            <img src={data.avatar.url} alt="" />
          </Box>
          <Box display="flex" flexDirection="column">
            <Box className="userName">{data.name}</Box>
            <Box className="userEmail">{data.email}</Box>
            <Box>
              <Button style={{ color: "blue" }} onClick={signOutHandler}>
                Logout <ExitToAppIcon color="secondary" />
              </Button>
            </Box>
          </Box>
        </MenuItem>
        {(data.role === "admin" || data.role === "teacher") && (
          <Link to="/admin/modules">
            <MenuItem onClick={handleClose}>DashBoard</MenuItem>
          </Link>
        )}
        <Link to="/profile">
          <MenuItem onClick={handleClose}>My Profile</MenuItem>
        </Link>
        {/* <Link to="/transaction">
          <MenuItem onClick={handleClose}>My Transactions</MenuItem>
        </Link> */}
        <Link to="/leaderboard">
          <MenuItem onClick={handleClose}>LeaderBoard</MenuItem>
        </Link>
       {data.certificateGenerated && ( <Link to="/Certificate">
          <MenuItem onClick={handleClose}>Certificate</MenuItem>
        </Link> )}
        <Link to="/progress">
          <MenuItem onClick={handleClose}>My Progress</MenuItem>
        </Link>
        <Link
          to={{ pathname: "https://pages.razorpay.com/pl_HedvukJSVRTta4/view" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MenuItem onClick={handleClose}>Fee Link</MenuItem>
        </Link>

      </StyledMenu>
    </div>
  );
}
