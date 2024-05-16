import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../actions/userActions'

//styles
import './styles/ProfilePage.css'
import { useStyles } from './styles/ProfileJsStyles'

function ProfilePage() {
  document.title = 'Profile'
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { data, loading } = user
  const [name, setName] = useState(data.name)
  const [email, setEmail] = useState(data.email)
  const [mobile, setMobile] = useState(data.mobile)

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('name', name)
    formData.set('mobile', mobile)
    dispatch(updateUser(formData))
  }

  const changeHandler = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    } else if (e.target.name === 'mobile') {
      setMobile(e.target.value)
    }
  }

  return (
    <>
      <div className='mainContainer'>
        <Box className={classes.root} display='flex' flexDirection='row'>
          <Box display='flex' flexDirection='row' alignItems='center'>
            <Box>
              <IconButton className={classes.iconHolder}>
                <AccountCircleIcon />
              </IconButton>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Box className={classes.heading}>Your Profile</Box>
              <Box className={classes.subHeading}>Manage your account</Box>
            </Box>
          </Box>
        </Box>

        <Paper elevation={5} className={classes.paper}>
          <Grid container justify='center' className={classes.container}>
            <Grid item xs={12} sm={4} md={3} className={classes.avatarHolder}>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <div
                  style={{
                    height: '130px',
                    width: '130px',
                  }}
                >
                  <img
                    src={data.avatar.url}
                    alt='profile'
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                </div>
                <div className={classes.ctfHolder}>
                  <p
                    style={{
                      fontStyle: 'normal',
                      fontSize: 18,
                      fontWeight: 400,
                    }}
                    className={classes.marginY}
                  >
                    CTF Score
                  </p>
                  <p
                    style={{
                      fontStyle: 'normal',
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                    className={classes.marginY}
                  >
                    {data.marks}.0
                  </p>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{ marginTop: 30 }}>
                <form onSubmit={submitHandler}>
                  <Box display='flex' flexDirection='column'>
                    <label htmlFor='name-input' className={classes.customLabel}>
                      Full Name
                    </label>
                    <input
                      className={classes.customInput}
                      type='text'
                      name='name'
                      id='name-input'
                      value={name}
                      onChange={changeHandler}
                      required='true'
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label
                      htmlFor='email-input'
                      className={classes.customLabel}
                    >
                      Email
                    </label>
                    <input
                      className={classes.customInput}
                      type='email'
                      name='email'
                      id='email-input'
                      value={email}
                      style={{ backgroundColor: '#EFEFEF' }}
                      disabled
                    />
                  </Box>

                  <Box display='flex' flexDirection='column'>
                    <label
                      htmlFor='mobile-input'
                      className={classes.customLabel}
                    >
                      Mobile No.
                    </label>
                    <input
                      className={classes.customInput}
                      type='number'
                      name='mobile'
                      id='mobile-input'
                      value={mobile}
                      onChange={changeHandler}
                      required='true'
                    />
                  </Box>

                  <Button
                    variant='contained'
                    size='medium'
                    color='primary'
                    className={(classes.margin, classes.saveButton)}
                    type='submit'
                  >
                    Save
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default ProfilePage
