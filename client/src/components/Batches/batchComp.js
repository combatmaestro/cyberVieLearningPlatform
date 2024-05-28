import React from 'react'
import BatchList from './batchCard'
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

function BatchComp() {
  document.title = 'Batch'
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h2 style={{ fontSize: 41 }}>Batches</h2>
      <BatchList />
    </div>
  )
}

export default BatchComp
