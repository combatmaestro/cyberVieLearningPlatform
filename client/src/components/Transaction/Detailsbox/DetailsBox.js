import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  rootBox: {
    margin: 'auto',
    marginTop: 37,
    width: '100%',
    maxWidth: 464,
    height: 292,
    padding: 32,
    boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    display: 'grid',
    gridRowGap: 12,
  },

  heading: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: '18px',
    color: '#444444',
  },
}))

const getDate = () => {
  return moment().format('MMMM DD, YYYY H.MM A')
}

function DetailsBox({ transaction_id, order_id, user_id }) {
  const classes = useStyles()

  return (
    <div className={classes.rootBox}>
      {transaction_id ? (
        <>
          <div className={classes.heading}>Transaction ID: </div>
          <div>{transaction_id}</div>
        </>
      ) : (
        ''
      )}

      <div className={classes.heading}> Razorpay Order ID:</div>
      <div>{order_id}</div>

      <div className={classes.heading}>User ID: </div>
      <div>{user_id}</div>

      <div className={classes.heading}> Date: </div>
      <div>{getDate()}</div>
    </div>
  )
}

export default DetailsBox
