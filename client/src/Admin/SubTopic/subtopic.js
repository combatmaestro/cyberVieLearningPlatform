import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getAllModules, addNewModule, editCurrentModule } from '../../actions/moduleAction'
import { getAllSubtopics } from '../../actions/topicAction'
import { Link } from 'react-router-dom'
import SubtopicDialogue from './subtopicDialogue'
import Loader from '../../components/Loader/Loader'
import SideDrawer from '../Drawer/SideDrawer'
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'

// material ui components
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Tooltip from '@material-ui/core/Tooltip'
import {addSubtopics } from '../../actions/topicAction'
import {put} from "@vercel/blob";

const useStyles = makeStyles((theme) => ({
  root: {},
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    '& .MuiSvgIcon-root': {
      width: 15,
      height: 15,
      color: '#4285f4',
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
}))

export default function Subtopics() {
  document.title = 'Subtopics'
  const classes = useStyles()
  const dispatch = useDispatch()
  const modules = useSelector((state) => state.modules)
  const { loading, data: moduleData = [], error } = modules

  // for dialogue
  const [open, setOpen] = useState(false)
  const [editModule, setEditModule] = useState(null)
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)
  const subtopicList = useSelector((state) => state.subtopics)
  const { subtopics } = subtopicList

  useEffect(() => {
    dispatch(getAllSubtopics())
  }, [dispatch])

  const handleClickOpen = () => {
    setEditModule(null)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccess(false)
    setOpenFailure(false)
  }

  const editModuleHandler = (module) => {
    setEditModule(module)
    setOpen(true)
  }

  useEffect(() => {
    dispatch(getAllModules())
  }, [dispatch])



  const post = async(fileData) =>{
    const file = fileData;
    const blob = await put(file.name,file,{
      access: 'public',
      token:process.env.REACT_APP_BLOB_READ_WRITE_TOKEN
    }) 
    return blob
  }
  // submitting response
  const submitHandler = async (subTopicData) => {
    console.log(subTopicData)
    const modifiedSubtopicsData = []
    for (const subtopic of subTopicData.subtopics) {
      const data = await post(subtopic.file);
      const subTopicObj = {
        fileName: subtopic.fileName,
        title: subtopic.title,
        file: data.url
      };
      modifiedSubtopicsData.push(subTopicObj);
    }
    const newObj = {
      topicId:subTopicData.topicId,
      subtopics:modifiedSubtopicsData
    }
    await dispatch(addSubtopics(newObj))
    window.location.reload()
  }

  if (loading) return <Loader />

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: 'Subtopic Name',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Topic Name',
          field: 'topicName',
          sort: 'asc',
        },
        {
          label: 'Type',
          field: 'type',
          sort: 'asc',
        },
      ],
      rows: [],
    }

    subtopics.forEach((subtopic) => {
      data.rows.push({
        title: subtopic.title,
        topicName: subtopic.topicName,
        type: 'PDF', // Assuming type should be 'PDF' for all entries
      })
    })

    return data
  }

  return (
    <>
      <SuccessBar
        handleClose={handleCloseBar}
        openSuccess={openSuccess}
        message={message}
      />
      <ErrorBar
        openFailure={openFailure}
        message={message}
        handleClose={handleCloseBar}
      />
      <Grid container className={classes.root}>
        <Grid item xs={12} md={2}>
          <SideDrawer />
        </Grid>
        <Grid className={classes.tableContainer} item xs={12} md={10}>
          <Grid container justify='center'>
            <Grid item xs={12} md={10}>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <h1>All SubTopics</h1>
                <Button
                  className={classes.create}
                  size='small'
                  variant='contained'
                  color='primary'
                  onClick={handleClickOpen}
                >
                  Create
                </Button>
              </Box>

              <MDBDataTable data={mdbJobs()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <SubtopicDialogue
        open={open}
        handleClose={handleClose}
        module={editModule}
        submitHandler={submitHandler}
        moduleList={moduleData}
      />
    </>
  )
}
