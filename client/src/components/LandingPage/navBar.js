import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "./images/BuildMyCareerLogo.png";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#EDEDED",
    boxShadow: "none",
    minHeight: "70px",
    paddingInline: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  logo: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  navLinks: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "right",
    alignItems: "center",
    marginTop: "10px",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    fontSize: "16px",
    color: "#0d1b2a",
    fontWeight: 550,
    fontFamily: "Inter",
    cursor: "pointer",
  },
  registerButton: {
    backgroundColor: "#269397",
    color: "#fff",
    boxShadow: "none",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "none",
    padding: "5px 40px",
    "&:hover": {
      backgroundColor: "#1f7d7f",
    },
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      zIndex: "10",
      color: "black",
      position: "absolute",
      right: 0,
      top: 0,
      margin: theme.spacing(1),
    },
  },
  drawerList: {
    width: 220,
  },
  logo: {
    width: "190px",
    height: "85px",
    cursor: "pointer",
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width:"150px",
      height:"70px",
      marginLeft:"-7px"
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleRegister = () => {
    setTimeout(() => {
      history.push("/register");
      window.location.reload();
    });
  };

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -70;
      const yPosition =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  const drawerList = (
    <Box
      className={classes.drawerList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {[
          "Modules",
          "Features",
          "Schedule",
          "Testimonials",
          "Payment",
          "FAQ",
        ].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() => handleScroll(text.toLowerCase())}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem>
          <Button
            variant="contained"
            className={classes.registerButton}
            onClick={handleRegister}
          >
            Register
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar style={{ padding: "0" }}>
          <Box className={classes.logo}>
            <img
              src={logo}
              alt="CSEP Logo"
              className={classes.logo}
            />
          </Box>
          <Box className={classes.navLinks}>
            {[
              "Modules",
              "Features",
              "Schedule",
              "Testimonials",
              "Payment",
              "FAQ",
            ].map((text) => (
              <Typography
                key={text}
                className={classes.link}
                onClick={() => handleScroll(text.toLowerCase())}
              >
                {text}
              </Typography>
            ))}
            <Button
              variant="contained"
              className={classes.registerButton}
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            {drawerList}
          </Drawer>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
