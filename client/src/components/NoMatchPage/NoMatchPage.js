import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import NoMatchImg from '../../assets/images/Misdirect/misdirect.png'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',

    '& .nomatchpageImg': {
      width: 200,
      height: 200,

      '& > img': {
        width: '100%',
      },
    },

    '& .feedbackText': {
      maxWidth: 556,
      fontFamily: 'Montserrat',
      fontSize: 30,
      fontWeight: 700,
      lineHeight: '39px',
      letterSpacing: '0em',
      textAlign: 'center',

      [theme.breakpoints.down(469)]: {
        fontSize: 20,
      },
    },

    '& .takeHomeButton': {
      marginTop: 57,

      '& .MuiButton-root': {
        width: 282,
        background: '#005387',
        textTransform: 'capitalize',
        color: 'white',
        fontFamily: 'Montserrat',
      },
    },
  },
}))

function NoMatchPage() {
  const classes = useStyles()
  const history = useHistory()

  return (
    <div className={classes.root}>
      <div className='nomatchpageImg'>
        <img src={NoMatchImg} alt='' />
      </div>

      <div className='feedbackText'>
        Sorry, the page you’re trying to access is not available.
      </div>

      <div className='takeHomeButton' onClick={() => history.push('/home')}>
        <Button variant='outlined'>Back to Home</Button>
      </div>
    </div>
  )
}

export default NoMatchPage
