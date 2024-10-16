import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EBF3FF',
    paddingTop: '21px',
    marginTop: 8,
    minHeight: 'calc(100vh - 90px)',

    '& .moduleHeader': {
      fontSize: 27,
      lineHeight: '32px',
      letterSpacing: '0.04em',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft:"6%",
      [theme.breakpoints.down(469)]: {
        fontSize: 19,
        lineHeight: '24px',
        marginBottom:"20px"
      },
    },
  },
  backArrow:{
    cursor: "pointer",
    position: "absolute",
    left: 48,
    fontSize:"24px",
    top:"112px",
    [theme.breakpoints.down(769)]: {
      visibility: "hidden",
      // backgroundColor: "red",
    }
  },
  accordionContainer: {
    width: '100%',
    padding: '21px 45px',
    boxSizing: 'border-box',

    [theme.breakpoints.down(469)]: {
      padding: '20px 15px',
    },

    '& .accordionStyles': {
      marginBottom: 12,
    },
  },
  playgroundButton: {
    background: "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
    marginRight: "4%",
    color: "white",
  },
  assessmentButton: {
    background: "linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)",
    marginRight: "3%",
    color: "white",
    [theme.breakpoints.down(469)]: {
      marginRight:0,
      minWidth:"92%"
    },
  },
  moduleHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down(469)]: {
      flexDirection: 'column',
    },
  },
  
}))
