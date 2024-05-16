import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import GroupIcon from "@material-ui/icons/Group";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";

import "./SideDrawer.css";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    color: "white",

    "& .MuiButtonBase-root": {
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white",
        minWidth: 35,
      },
    },
    "& .MuiBox-root": {
      "&:hover": {
        backgroundColor: "#57586a",
      },
    },
    "& .MuiListItem-gutters": {
      paddingLeft: 20,
    },
  },
  heading: {
    color: "white",
    padding: "15px 0px",
    fontSize: "x-large",
  },
  divider: {
    backgroundColor: "white",
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { data, loading } = useSelector((state) => state.user);

  if (loading) return;

  return (
    <>
      <div className="sidebar-wrapper">
        <Box
          className={classes.heading}
          display="flex"
          justifyContent="center"
          flexDirection="row"
        >
          Dashboard
        </Box>
        <Divider className={classes.divider} />
        <List className={classes.list}>
          <Link to="/admin/modules">
            <Box>
              <ListItem button>
                <ListItemIcon>
                  <ViewModuleIcon />
                </ListItemIcon>
                <ListItemText>Modules</ListItemText>
              </ListItem>
            </Box>
          </Link>
        </List>
        {data.role === "admin" && (
          <>
            <List className={classes.list}>
              <Link to="/admin/users">
                <Box>
                  <ListItem button>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>
                  </ListItem>
                </Box>
              </Link>
            </List>
            <List className={classes.list}>
              <Link to="/admin/transactions">
                <Box>
                  <ListItem button>
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText>Transactions</ListItemText>
                  </ListItem>
                </Box>
              </Link>
            </List>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
