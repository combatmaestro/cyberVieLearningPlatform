import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  getAdminTopic,
  addNewTopic,
  editCurrentTopic,
} from '../../actions/topicAction'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import TopicDialogue from './TopicDialogue'
import SideDrawer from '../Drawer/SideDrawer'
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'

//material ui components
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
  root: {},
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    '& .MuiSvgIcon-root': {
      widthL: 15,
      height: 15,
      color: '#4285f4',
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
}))

function AdminTopics({ history }) {
  document.title = 'Topics'
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)
  const classes = useStyles()
  const { id } = useParams()
  const dispatch = useDispatch()
  const topics = useSelector((state) => state.topics)
  const { loading, topicData = {} } = topics

  const [open, setOpen] = useState(false)
  const [editTopic, setEditTopic] = useState(null)

  const handleClickOpen = () => {
    setEditTopic(null)
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

  const editTopicHandler = (topic) => {
    setEditTopic(topic)
    setOpen(true)
  }

  useEffect(() => {
    dispatch(getAdminTopic(id))
  }, [])

  const submitHandler = async (e, title, checked) => {
    e.preventDefault()
    setOpen(false) //closing modal
    if (editTopic) {
      const formData = new FormData()
      formData.set('topicName', title)
      formData.set('hidden', checked)
      const { success } = await dispatch(
        editCurrentTopic(editTopic._id, formData)
      )
      if (success) {
        setMessage('Changes Saved Successfully')
        setOpenSuccess(true)
      } else {
        setMessage('Error in saving changes')
        setOpenFailure(true)
      }
    } else {
      const formData = new FormData()
      formData.set('topicName', title)
      formData.set('hidden', checked)
      const { success } = await dispatch(addNewTopic(id, formData))
      if (success) {
        setMessage('Topic created Successfully')
        setOpenSuccess(true)
      } else {
        setMessage('Error in created Topic')
        setOpenFailure(true)
      }
    }
  }

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: 'Topic ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Archive',
          field: 'archive',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    }

    topicData.forEach((topic) => {
      data.rows.push({
        id: topic._id,
        title: (
          <Link to={`/admin/ctfs/${topic._id}`}>
            <span>{topic.topicName}</span>
            <span className={classes.icon}>
              <ExitToAppIcon />
            </span>
          </Link>
        ),
        archive: `${topic.hidden}`,
        actions: (
          <>
            <Tooltip title='Edit' placement='top' arrow>
              <button
                className='btn btn-primary py-1 px-2  ml-2'
                onClick={() => editTopicHandler(topic)}
              >
                <i class='far fa-edit'></i>
              </button>
            </Tooltip>

            <Tooltip title='Add Content' placement='top' arrow>
              <button
                className='btn btn-success py-1 px-2  ml-2'
                onClick={() => history.push(`/admin/content/${topic._id}`)}
              >
                <i class='fas fa-folder-open'></i>
              </button>
            </Tooltip>
          </>
        ),
      })
    })

    return data
  }

  if (loading) return <Loader />

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
                <h1>All Topics</h1>
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
      <TopicDialogue
        open={open}
        handleClose={handleClose}
        topic={editTopic}
        submitHandler={submitHandler}
      />
    </>
  )
}

export default AdminTopics
