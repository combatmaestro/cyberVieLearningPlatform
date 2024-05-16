import { Button, Dialog } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useStyles } from './Style'
import CancelIcon from '@material-ui/icons/Cancel'
import DetailsBox from '../Detailsbox/DetailsBox'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Failure(props) {
  const classes = useStyles()
  const history = useHistory()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (!props.match.params.order_id) {
      history.push('/home')
    }
  }, [props])

  return (
    <div>
      <Dialog open={true} fullScreen>
        <div className={classes.root}>
          <div className='statusmessage'>
            Sorry, your booking could not be completed!
          </div>
          <div className='paymentFailed'>
            <span>
              <CancelIcon htmlColor='#EA3535' />
            </span>
            The payment for this transaction has failed
          </div>

          <DetailsBox
            user_id={user.data._id}
            order_id={props.match.params.order_id}
          />

          <div>
            <Button variant='contained' onClick={() => history.push('/home')}>
              Back to Home
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Failure
