import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { listTopics , addSubtopics } from '../../actions/topicAction'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      minWidth: '600px',
    },
  },
  tierLabel: {
    marginTop: 20,
  },
  subtopicContainer: {
    marginTop: 20,
    padding: theme.spacing(2),
  },
  subtopicBox: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: "#e4e6df",
    display: 'flex',
    flexDirection: 'column',
  },
  fileInput: {
    display: 'none',
  },
  customFileUpload: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',  // Align to the left
    alignItems: 'center',
  },
  customFileUploadLabel: {
    fontSize: '1rem',
    fontWeight: 300,
    cursor: 'pointer',
    outline: 0,
    userSelect: 'none',
    borderColor: 'rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)',
    borderStyle: 'solid',
    borderRadius: '4px',
    borderWidth: '1px',
    backgroundColor: 'hsl(0, 0%, 100%)',
    color: 'hsl(0, 0%, 29%)',
    padding: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(2),  // Add some spacing to the right of the button
  },
  customFileUploadLabelHover: {
    borderColor: 'hsl(0, 0%, 21%)',
  },
  customFileUploadLabelActive: {
    backgroundColor: 'hsl(0, 0%, 96%)',
  },
  customFileUploadLabelUpload: {
    color: 'hsl(204, 86%, 53%)',
    borderColor: 'hsl(204, 86%, 53%)',
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
}))

function SubtopicDialogue(props) {
  const classes = useStyles()
  const { open, handleClose, module, submitHandler, moduleList } = props
  const [selectedModule, setSelectedModule] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [subtopics, setSubtopics] = useState([])
  const dispatch = useDispatch()

  const topicList = useSelector((state) => state.topicList)
  const { loading, error, topics } = topicList

  useEffect(() => {
    if (selectedModule) {
      dispatch(listTopics(selectedModule))
    }
  }, [dispatch, selectedModule])

 

  const handleTopicChange = (event) => {
    setSelectedTopic(event.target.value)
  }
  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value)
  }

  const handleSubtopicChange = (index, field, value) => {
    const newSubtopics = [...subtopics]
    newSubtopics[index][field] = value
    setSubtopics(newSubtopics)
  }

  const addSubtopic = () => {
    setSubtopics([...subtopics, { title: '', file: '', fileName: '' }])
  }

  const handleFileUpload = (index, file) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]
      handleSubtopicChange(index, 'file', file)
      handleSubtopicChange(index, 'fileName', file.name)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validSubtopics = subtopics.filter(subtopic => subtopic.title && subtopic.file)
    const subTopicData = {
      topicId: selectedTopic,
      subtopics: validSubtopics
    }
    // console.log(subTopicData)
    submitHandler(subTopicData)
   
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
    if (subtopics.length === 0) {
      setSubtopics([{ title: '', file: '', fileName: '' }])
    }
  }, [open, module, subtopics.length])

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        className={classes.root}
      >
        <DialogTitle id='form-dialog-title'>
          {module ? 'Edit Subtopic' : 'Create Subtopic'}
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
            <br />
            <FormLabel className={classes.tierLabel} component='legend'>
              <strong>Select Topic</strong>
            </FormLabel>
            {loading ? (
              <p>Loading topics...</p>
            ) : error ? (
              <p>Error loading topics: {error}</p>
            ) : (
              <Select
                fullWidth
                value={selectedTopic}
                onChange={handleTopicChange}
              >
                {topics.map((topic) => (
                  <MenuItem key={topic._id} value={topic._id}>
                    {topic.topicName}
                  </MenuItem>
                ))}
              </Select>
            )}

            <FormLabel className={classes.tierLabel} component='legend'>
              <strong>Add Assessment Subtopics Below</strong>
            </FormLabel>
            {subtopics.map((subtopic, index) => (
              <Paper key={index} className={classes.subtopicBox}>
                <TextField
                  label={`Add Subtopic ${index + 1} Name`}
                  value={subtopic.title}
                  onChange={(e) =>
                    handleSubtopicChange(index, 'title', e.target.value)
                  }
                  fullWidth
                />
                <br />
                <div className={classes.customFileUpload}>
                  {subtopic.fileName && (
                    <p>{subtopic.fileName}</p>
                  )}
                  <input
                    accept="application/pdf"
                    className={classes.fileInput}
                    id={`file-upload-${index}`}
                    type="file"
                    onChange={(e) => handleFileUpload(index, e.target.files[0])}
                  />
                  <label htmlFor={`file-upload-${index}`} className={`${classes.customFileUploadLabel} ${classes.customFileUploadLabelUpload}`}>
                    <i className="material-icons">cloud_upload</i>Upload Subtopic PDF
                  </label>
                </div>
              </Paper>
            ))}

            <Button onClick={addSubtopic} variant="contained" color="primary" component="span" className={classes.addButton}>
              Add Subtopic
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

export default SubtopicDialogue
