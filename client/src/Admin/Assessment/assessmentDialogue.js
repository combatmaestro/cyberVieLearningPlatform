import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import { addAssessment } from '../../actions/assessmentAction'
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      minWidth: '600px',
    },
  },
  tierLabel: {
    marginTop: 20,
  },
  questionContainer: {
    marginTop: 20,
    padding: theme.spacing(2),
  },
  questionBox: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#e4e6df"
  },
}))

function AssessmentDialogue(props) {
  const classes = useStyles()
  const { open, handleClose, module, submitHandler, moduleList } = props
  const [selectedModule, setSelectedModule] = useState('')
  const [questions, setQuestions] = useState([])
  const dispatch = useDispatch()
  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value)
  }

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions]
    newQuestions[index][field] = value
    setQuestions(newQuestions)
  }

  const addQuestion = () => {
    setQuestions([...questions, { title: '', marks: '' }])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(selectedModule)
    console.log(questions)
    const validQuestions = questions.filter(question => question.title && question.marks)
    const assessmentData={
      selectedModule: selectedModule,
      questions: validQuestions
    }
    dispatch(addAssessment(assessmentData))
    // submitHandler(selectedModule, questions)
  }

  useEffect(() => {
    if (module) {
      // setRadioValue(module.type)
      // setChecked(module.hidden)
      // setTitle(module.title)
      // setDescription(module.description)
    } else {
      // setRadioValue('paid')
      // setChecked(false)
      // setTitle('')
      // setDescription('')
    }
    if (questions.length === 0) {
      setQuestions([{ title: '', marks: '' }])
    }
  }, [open, module, questions.length])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <DialogTitle id='form-dialog-title'>
          {module ? 'Edit Assessment' : 'Create Assessment'}
        </DialogTitle>
        <DialogContent>
          <form
            id='module-form'
            onSubmit={handleSubmit}
          >
            <FormLabel className={classes.tierLabel} component='legend'>
              <strong>Select Module</strong>
            </FormLabel>
            <Select
              fullWidth
              value={selectedModule}
              onChange={handleModuleChange}
            >
              {moduleList.map((mod) => (
                <MenuItem key={mod._id} value={mod._id}>
                  {mod.title}
                </MenuItem>
              ))}
            </Select>

            <FormLabel className={classes.tierLabel} component='legend'>
              <strong>Add Assessment Questions Below</strong>
            </FormLabel>
            {questions.map((question, index) => (
              <Paper key={index} className={classes.questionBox}>
                <TextField
                  label={`Question ${index + 1}`}
                  value={question.title}
                  onChange={(e) =>
                    handleQuestionChange(index, 'title', e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label={`Marks for Question ${index + 1}`}
                  value={question.marks}
                  onChange={(e) =>
                    handleQuestionChange(index, 'marks', e.target.value)
                  }
                  type='number'
                  fullWidth
                />
              </Paper>
            ))}

            <br/>
            <Button onClick={addQuestion} color='primary'>
              Add Question
            </Button>
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

export default AssessmentDialogue
