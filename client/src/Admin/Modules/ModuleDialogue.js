import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

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

function ModuleDialogue(props) {
  const classes = useStyles()
  const { open, handleClose, module, submitHandler } = props
  // console.log("mod", module);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('paid')

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value)
  }

  useEffect(() => {
    if (module) {
      setRadioValue(module.type)
      setChecked(module.hidden)
      setTitle(module.title)
      setDescription(module.description)
    } else {
      setRadioValue('paid')
      setChecked(false)
      setTitle('')
      setDescription('')
    }
  }, [open])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <DialogTitle id='form-dialog-title'>
          {module ? 'Edit Module' : 'Create Module'}
        </DialogTitle>
        <DialogContent>
          <form
            id='module-form'
            onSubmit={(e) =>
              submitHandler(e, title, description, radioValue, checked)
            }
          >
            <TextField
              autoFocus
              margin='dense'
              name='title'
              label='Title'
              type='text'
              fullWidth
              value={title}
              required='true'
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              name='description'
              label='Description'
              multiline
              rows={2}
              fullWidth
              value={description}
              required='true'
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormLabel className={classes.tierLabel} component='legend'>
              Tier
            </FormLabel>
            <RadioGroup
              row
              aria-label='tier'
              name='tier1'
              value={radioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value='paid' control={<Radio />} label='Paid' />
              <FormControlLabel value='free' control={<Radio />} label='Free' />
            </RadioGroup>
            <FormLabel className={classes.tierLabel} component='legend'>
              Archive Status
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name='checkedB'
                  color='primary'
                />
              }
              label='Archive'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button type='submit' color='primary' form='module-form'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ModuleDialogue
