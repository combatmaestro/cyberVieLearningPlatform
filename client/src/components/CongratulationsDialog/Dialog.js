import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles, Button } from '@material-ui/core'
import './style.css'
import HeaderImage from '../../assets/images/Dialog/greetDialog.jpeg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: 400,

    [theme.breakpoints.down(468)]: {
      width: 271,
      height: 271,
    },

    '& .greetingImage': {
      width: '100%',

      [theme.breakpoints.down(468)]: {
        marginTop: -30,
      },
    },

    '& .congratHeader': {
      marginTop: 20,
      fontSize: 18,
      lineHeight: '22px',
      letterSpacing: '0.04em',
      fontWeight: 700,
      fontFamily: 'Montserrat',
      color: 'rgba(0, 0, 0, 0.7)',
      textAlign: 'center',

      [theme.breakpoints.down(468)]: {
        fontSize: 14,
        marginTop: 4,
      },
    },

    '& .congratSubHeader': {
      marginTop: 4,
      fontSize: 12,
      lineHeight: '15px',
      fontWeight: 700,
      fontFamily: 'Montserrat',
      color: 'rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
    },

    '& .congratButton': {
      marginTop: 19,
      textTransform: 'capitalize',
      borderRadius: 15,
      width: 120,
      background: '#CFE1FC',
      color: '#005387',
    },
  },
}))

function CompletionDialog({ open, onClose }) {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={onClose} className='congratDialog'>
      <div className={classes.root}>
        {/* <h3>Congratulations and celebrations vro</h3> */}
        <div>
          <img src={HeaderImage} className='greetingImage' alt='' />
        </div>

        <div>
          <div className='congratHeader'>Congratulations!!!</div>
          <div className='congratSubHeader'>you have completed topic</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            className='congratButton'
            onClick={onClose}
          >
            Continue
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default CompletionDialog
