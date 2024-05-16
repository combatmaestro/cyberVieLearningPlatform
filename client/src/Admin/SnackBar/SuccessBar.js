import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },

    '& .MuiAlert-filledSuccess': {
      backgroundColor: '#4caf50 !important',
    },
  },
}))

export default function SuccessBar({ openSuccess, message, handleClose }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar
        open={openSuccess}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success'>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
