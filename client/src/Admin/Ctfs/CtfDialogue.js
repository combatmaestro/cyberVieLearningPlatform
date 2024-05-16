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

function CtfDialog(props) {
  const classes = useStyles()
  const { open, handleClose, ctf, submitHandler } = props
  const [sno, setSno] = useState(1)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [placeholder, setPlaceholder] = useState('')

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (ctf) {
      setChecked(ctf.hidden)
      setQuestion(ctf.question)
      setAnswer(ctf.answer)
      setPlaceholder(ctf.hint)
      setSno(ctf.sno)
    } else {
      setChecked(false)
      setQuestion('')
      setAnswer('')
      setPlaceholder('')
      setSno(1)
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
          {' '}
          {ctf ? 'Edit CTF' : 'Create CTF'}{' '}
        </DialogTitle>
        <DialogContent>
          <form
            id='ctf-form'
            onSubmit={(e) =>
              submitHandler(e, {
                question: question,
                answer: answer,
                checked: checked,
                hint: placeholder,
                sno: sno,
              })
            }
          >
            <TextField
              margin='dense'
              label='Ques No.'
              type='Number'
              value={sno}
              inputProps={{ min: 1 }}
              required='true'
              style={{ width: 80 }}
              onChange={(e) => setSno(e.target.value)}
            />
            <TextField
              autoFocus
              margin='dense'
              name='question'
              label='Question'
              type='text'
              fullWidth
              value={question}
              required='true'
              onChange={(e) => setQuestion(e.target.value)}
            />
            <TextField
              margin='dense'
              name='answer'
              label='Answer'
              type='text'
              fullWidth
              value={answer}
              required='true'
              onChange={(e) => setAnswer(e.target.value)}
            />

            <TextField
              margin='dense'
              name='placeholder'
              label='Hint'
              type='text'
              fullWidth
              value={placeholder}
              required='true'
              onChange={(e) => setPlaceholder(e.target.value)}
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
          <Button type='submit' color='primary' form='ctf-form'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CtfDialog
