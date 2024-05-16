import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { getContentTopic, updateContent } from '../../actions/topicAction'
import { useSelector, useDispatch } from 'react-redux'
import SunEditor, { buttonList } from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css' // Import Sun Editor's CSS File
import Loader from '../../components/Loader/Loader'
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import UploadDialogue from './UploadDialogue'
import SimpleBackdrop from '../../components/BackDrop/LoaderBackdrop'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .se-btn-tray': {
      display: 'flex',
      '& .se-btn-module-enter': {
        display: 'none',
      },
    },
  },
  create: {
    height: 32,
    marginRight: 10,
  },
  heading: {
    margin: 10,
  },
}))

function AdminContent({ history }) {
  document.title = 'Content Editor'
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    loading,
    error,
    contentData = {},
  } = useSelector((state) => state.content)
  const [open, setOpen] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [append, setAppend] = useState('')
  const editorRef = useRef('')
  useEffect(() => {
    dispatch(getContentTopic(id))
  }, [])

  const handleChange = (content) => {
    editorRef.current = content
  }

  // for snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccess(false)
    setOpenFailure(false)
  }

  //for upload dialogue

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleCloseDialogue = () => {
    setOpen(false)
  }

  const submitImageHandler = async (e, image) => {
    e.preventDefault()
    try {
      setOpenBackdrop(true)
      setOpen(false)
      const formData = {
        image,
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post('/topic/admin/upload', formData, config)

      console.log(data)
      const appendString = `<div class="se-component se-image-container __se__float-none" contenteditable="false">
                            <figure style="margin: 0px;">
                            <img src="${data.url}" alt="" data-rotate="" data-proportion="true" data-rotatex="" data-rotatey="" data-size="," data-align="none" data-percentage="auto,auto" data-index="0" data-file-name="image_j357z1.jpg" data-file-size="0" data-origin="," style="">
                            </figure>
                           </div>`
      setAppend(appendString)

      setOpenBackdrop(false)
    } catch (err) {
      console.log('error', err.response.data.message)
      setOpenBackdrop(false)
    }
  }

  // for content submit

  const submitHandler = async () => {
    //make appendcontent empty otherwise it will be shown again
    setAppend('')
    const body = {
      content: editorRef.current,
    }

    const { success } = await dispatch(updateContent(id, body))
    if (success) {
      setOpenSuccess(true)
    } else {
      setOpenFailure(true)
    }
  }
  if (loading) {
    return <Loader />
  }

  return (
    <>
      {console.log('hello')}
      <SuccessBar
        handleClose={handleClose}
        openSuccess={openSuccess}
        message='Content Saved Successfully'
      />
      <ErrorBar
        openFailure={openFailure}
        message='Error in saving'
        handleClose={handleClose}
      />
      <div className={classes.root}>
        <Box
          className={classes.heading}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <h3>{contentData.topicName}</h3>
          <div>
            <Button
              className={classes.create}
              size='small'
              color='primary'
              onClick={() => history.goBack()}
            >
              Back
            </Button>
            <Button
              className={classes.create}
              size='small'
              variant='contained'
              color='primary'
              onClick={submitHandler}
            >
              Save
            </Button>
            <Button
              className={classes.create}
              size='small'
              variant='contained'
              color='secondary'
              onClick={handleClickOpen}
            >
              Upload
            </Button>
          </div>
        </Box>
        <SunEditor
          onChange={handleChange}
          setOptions={{
            height: 200,
            buttonList: buttonList.complex, // Or Array of button list, eg. [['font', 'align'], ['image']]
            // Other option
          }}
          setContents={contentData.content}
          appendContents={append}
        />
      </div>
      <UploadDialogue
        open={open}
        handleClose={handleCloseDialogue}
        submitImageHandler={submitImageHandler}
      />
      <SimpleBackdrop open={openBackdrop} />
    </>
  )
}

export default AdminContent
