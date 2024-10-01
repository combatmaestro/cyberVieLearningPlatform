import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: 72,
    padding: "1.5rem 5%",
    boxSizing: "border-box",
    justifyContent:"center",
  },
  iconHolder: {
    "& .MuiSvgIcon-root": {
      height: 65,
      width: 65,
      color: "#255983",
    },
  },

  heading: {
    fontSize: 40,
    color: "#255983",
    fontWeight: 400,
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
    margin: "30px auto",
    boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.38)",
    borderRadius: 38,
    backgroundColor: "#EBF3FF",
    padding: 25,
    [theme.breakpoints.down(1100)]: {
      width: "75%",
    },
    [theme.breakpoints.down(780)]: {
      width: "85%",
    },
    [theme.breakpoints.down(420)]: {
      marginTop: 40,
      minHeight: 500,
      padding: 10,
      textAlign: "center",
    },
  },
  
  avatarHolder: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down(420)]: {
      marginTop: 20,
    },
  },

  customInput: {
    width: "90%",
    margin: 8,
    height: 38,
    padding: 10,
    background: "#FFFFFF",
    border: "1px solid #9B9B9B",
    boxShadow: "0px 10px 20px rgba(37, 89, 131, 0.1)",
    borderRadius: 10,
    "&:focus": {
      outline: "none",
      border: "1px solid #60B8FF",
    },
  },

  customLabel: {
    margin: "8px 8px 0 8px",
    textAlign: "left",
    fontWeight: "bold",
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
  tickIcon: {
    color: 'green',
    fontSize: '4rem',
    position: 'relative',
    textAlign: 'center',
    left: '145px',
  },
  wowIcon:{
    color: 'white',
    fontSize: '4rem',
    position: 'relative',
    textAlign: 'center',
    left: '145px',
  },
  saveButton: {
    background: "#255983",
    borderRadius: 12,
    width: 120,
    height: 40,
    margin: 10,
  },

  ctfHolder: {
    background: "rgba(216, 216, 216, 0.27)",
    border: "1px solid #CFCFCF",
    borderRadius: 16,
    textAlign: "center",
    width: 150,
    height: 67,
    marginTop: 16,
  },
}));
