import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: 72,
    padding: "1.5rem",
    boxSizing: "border-box",
    // backgroundColor: "#CAF3FF",
    paddingLeft: "5%",
  },
  iconHolder: {
    "& .MuiSvgIcon-root": {
      height: 65,
      width: 65,
      color: "#255983",
    },
  },

  heading: {
    fontSize: "40px",
    color: "#255983",
    fontWeight: 400,
    fontStyle: "normal",
    lineHeight: "44px",
  },

  subHeading: {
    fontSize: "1rem",
    color: "#255983",
    marginLeft: 9,
    lineHeight: "24px",
  },

  paper: {
    width: "65%",
    minHeight: 400,
    marginTop: 30,
    margin: "auto",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.38)",
    borderRadius: "38px",
    backgroundColor: "#EBF3FF",
    [theme.breakpoints.down(1100)]: {
      width: "75%",
    },
    [theme.breakpoints.down(780)]: {
      padding: 25,
      width: "85%",
    },
    [theme.breakpoints.down(420)]: {
      width: "85%",
      marginTop: "40px",
      minHeight: 500,
      padding: 10,
      textAlign: "center",
    },
  },
  container: {
    minHeight: 400,
    "& .MuiGrid-item": {},
  },
  avatarHolder: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down(420)]: {
      marginTop: "20px",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  marginY: {
    margin: "5px 0px",
  },

  customInput: {
    width: "90%",
    margin: 8,
    height: 38,
    padding: 10,
    background: "#FFFFFF",
    border: "1px solid #9B9B9B",
    boxSizing: "border-box",
    boxShadow: "0px 10px 20px rgba(37, 89, 131, 0.1)",
    borderRadius: "10px",

    "&:focus": {
      outline: "none",
      border: "1px solid #60B8FF",
    },
  },
  customLabel: {
    margin: 8,
    marginBottom: 0,
    textAlign: "left",
    fontWeight: "bold",
  },

  saveButton: {
    background: "#255983",
    borderRadius: "12px",
    width: "120px",
    height: "40px",
    margin: 10,
  },
  ctfHolder: {
    background: " rgba(216, 216, 216, 0.27)",
    border: "1px solid #CFCFCF",
    boxSizing: "border-box",
    borderRadius: "16px",
    textAlign: "center",
    width: 150,
    height: 67,
    marginTop: 16,
  },
}));
