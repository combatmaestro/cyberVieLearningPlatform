const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundColor: "#EBF3FF",
    marginTop: "8px",
    paddingTop: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .spanMobile": {
      minWidth: 46,
      [theme.breakpoints.down(420)]: {
        minWidth: 34,
      },
    },

    "& .green-text": {
      color: "green",
    },

    "& .orange-text": {
      color: "orange",
    },

    "& .red-text": {
      color: "red",
    },

    "& h2": {
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "30px",
      lineHeight: "37px",
      letterSpacing: "0.04em",
      color: "#005387",
    },

    "& h4": {
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "14px",
      letterSpacing: "0.04em",
      color: "#005387",
    },

    "& button": {
      margin: "0px",
    },
  },
  paymentHolder: {
    minHeight: 200,
    width: "60%",
    background: "#EBF3FF",
    boxShadow:
      " -7.46255px -7.46255px 14.9251px #FFFFFF, 7.46255px 7.46255px 14.9251px #B4C1D5",
    borderRadius: "28.3577px",
    marginTop: 60,
    padding: "27px 49px",

    [theme.breakpoints.down(800)]: {
      width: "70%",
    },

    [theme.breakpoints.down(420)]: {
      width: "90%",
      padding: "27px 15px",
      marginTop: 30,
    },

    "& .form-inline": {
      display: "flex",
      alignItems: "flex-start",
      width: "100%",
      margin: "20px 0px",

      [theme.breakpoints.down(1100)]: {
        justifyContent: "center",
      },
    },

    "& .form-control": {
      "&:focus": {
        outline: "none",
        boxShadow: "none !important",
      },
    },

    "& input": {
      "&::-webkit-input-placeholder": {
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: " 10px",
        letterSpacing: "0.04em",
        color: "#444444",
      },
    },

    "& .input-group": {
      width: "100%",
      maxWidth: "500px",
      boxShadow: "4px 2px 4px -1px #b4c1d5",
      marginRight: 20,
    },

    "& .input-group-text": {
      backgroundColor: "#73CAE9 !important",
      borderRadius: "7.46255px 0px 0px 7.46255px !important",
    },

    "& button": {
      fontFamily: "Montserrat",
      fontStyle: "normal",
      fontWeight: "bold",
      color: "#FFFFFF",
      fontSize: 12,
      width: " 82.43px",
      height: "37.84px",
      background: "#66C95D",
      boxShadow: "1.49251px 1.49251px 2.98502px rgba(0, 0, 0, 0.1)",
      borderRadius: "7.46255px",
      border: "none",
    },
  },
  historyContainer: {
    width: "100%",
    background: "#FFFFFF",
    boxShadow: " 1.49251px 1.49251px 2.98502px rgba(0, 0, 0, 0.1)",
    borderRadius: "7.46255px",
    padding: "19px 31px",
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down(420)]: {
      padding: "19px 12px",
    },
  },
  historyDetails: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0px",
  },
  spanLabel: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "12px",
    lineHeight: "11px",
    letterSpacing: "0.04em",
    color: "#444444",
    [theme.breakpoints.down(420)]: {
      fontSize: "8px",
    },
  },
  spanData: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "10px",
    lineHeight: "11px",
    letterSpacing: "0.04em",
    [theme.breakpoints.down(420)]: {
      fontSize: "8px",
    },
  },

  textCenter: {
    textAlign: "center",
  },
}));
