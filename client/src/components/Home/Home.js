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
