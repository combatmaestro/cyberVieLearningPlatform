import React from 'react'
import ModulesList from '../ModulesList/ModulesList'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    minHeight: '90vh',
    padding: '40px 4%',
    backgroundColor: '#f7f7f7',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#e0e6ec",
    textDecoration: 'none',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  blink: {
    animation: `$blink 1s linear infinite`,
    color: 'white',
    fontSize: 25,
    fontFamily: 'cursive',
    // textAlign: 'center',
  },
  '@keyframes blink': {
    '0%': { opacity: 0 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 },
  },

}))

function Home() {
  document.title = 'Home'
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h2 style={{ fontSize: 41 }}>Modules</h2>
      <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <AccessAlarmsIcon className={classes.blink}/>
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      <Link to="/batch" className={classes.blink}>
      Click here and check out our Latest Live Courses!!
      </Link>
    </Typography>
  </Toolbar>
</AppBar>
      <ModulesList />
    </div>
  )
}

export default Home
