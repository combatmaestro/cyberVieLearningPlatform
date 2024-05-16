import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, Radio, RadioGroup } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      minWidth: '600px',
    },
  },
  tierLabel: {
    marginTop: 20,
  },
}))

function UserDialog(props) {
  const classes = useStyles()
  const { open, handleClose, user, submitHandler } = props
  const [tier, setTier] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    setTier(user.tier)
    setRole(user.role)
  }, [open])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <DialogTitle id='form-dialog-title'>Edit User</DialogTitle>
        <DialogContent>
          <form
            id='user-form'
            onSubmit={(e) => submitHandler(e, tier, role, user._id)}
          >
            <TextField
              label='Name'
              type='text'
              fullWidth
              value={user.name}
              disabled
            />
            <br />
            <br />

            <TextField
              label='Email'
              type='email'
              fullWidth
              value={user.email}
              disabled
            />

            {user.mobile ? (
              <>
                <br />
                <br />
                <TextField
                  label='Mobile'
                  type='text'
                  fullWidth
                  value={user.mobile}
                  disabled
                />
              </>
            ) : (
              ''
            )}

            <br />
            <br />
            <FormControl component='fieldset'>
              <FormLabel className={classes.tierLabel} component='legend'>
                Tier
              </FormLabel>
              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue={user.tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <FormControlLabel
                  value='free'
                  control={<Radio color='primary' />}
                  label='Free'
                />

                <FormControlLabel
                  value='paid'
                  control={<Radio color='primary' />}
                  label='Paid'
                />
              </RadioGroup>
            </FormControl>

            <br />
            <br />
            <FormControl component='fieldset'>
              <FormLabel className={classes.tierLabel} component='legend'>
                Role
              </FormLabel>

              <RadioGroup
                row
                aria-label='position'
                name='position'
                defaultValue={user.role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value='admin'
                  control={<Radio color='primary' />}
                  label='Admin'
                />
                <FormControlLabel
                  value='teacher'
                  control={<Radio color='primary' />}
                  label='Teacher'
                />
                <FormControlLabel
                  value='user'
                  control={<Radio color='primary' />}
                  label='Student'
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary' form='user-form'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserDialog
