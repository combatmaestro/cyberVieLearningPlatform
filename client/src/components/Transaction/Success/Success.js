import { Button, Dialog } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DetailsBox from '../Detailsbox/DetailsBox'
import { useStyles } from './Style'
import successImg from '../../../assets/images/Success/success.png'

function Success(props) {
  const classes = useStyles()
  const history = useHistory()

  // useEffect(() => {
  //   dispatch(userRefresh());
  // }, []);

  // useEffect(() => {
  //   if (!props.location.state.order_id) {
  //     history.push("/home");
  //   }
  // }, [props]);

  return (
    <div>
      <Dialog open={true} fullScreen>
        <div className={classes.root}>
          <div className='succesPageHeader'>
            <div className='successpaygreet'>THANK YOU !</div>
            <div className='successImage'>
              <img src={successImg} alt='' />
            </div>
          </div>

          <div className='greenText'>Your Payment is Successful</div>

          <DetailsBox {...props.location.state} />

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

export default Success
