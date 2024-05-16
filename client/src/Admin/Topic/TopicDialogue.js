import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
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

function TopicDialogue(props) {
  const classes = useStyles()
  const { open, handleClose, topic, submitHandler } = props
  // console.log("mod", topic);
  const [title, setTitle] = useState('')
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (topic) {
      setChecked(topic.hidden)
      setTitle(topic.topicName)
    } else {
      setChecked(false)
      setTitle('')
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
          {topic ? 'Edit topic' : 'Create topic'}
        </DialogTitle>
        <DialogContent>
          <form
            id='topic-form'
            onSubmit={(e) => submitHandler(e, title, checked)}
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
          <Button type='submit' color='primary' form='topic-form'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TopicDialogue
