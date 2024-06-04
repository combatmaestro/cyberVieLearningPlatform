import React from 'react'
import ModulesList from '../ModulesList/ModulesList'
import Container from '@material-ui/core/Container'

import { makeStyles } from '@material-ui/core/styles'

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
     
      <ModulesList />
    </div>
  )
}

export default Home
