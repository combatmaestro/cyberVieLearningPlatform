import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { addNewTopic, editCurrentTopic } from '../../actions/topicAction'
import { MDBDataTable } from 'mdbreact'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Loader from '../../components/Loader/Loader'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import SideDrawer from '../Drawer/SideDrawer'
import { addNewCtf, editCurrentCtf, getAdminCtf } from '../../actions/CtfAction'
import CtfDialog from './CtfDialogue'
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'

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

function AdminCtfs() {
  document.title = 'CTF'
  const classes = useStyles()
  const { id } = useParams()
  const dispatch = useDispatch()
  const ctfs = useSelector((state) => state.ctfs)
  const { loading, ctfData = [] } = ctfs

  const [open, setOpen] = useState(false)
  const [editCtf, setEditCtf] = useState(null)
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)

  const handleClickOpen = () => {
    setEditCtf(null)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const editCtfHandler = (ctf) => {
    setEditCtf(ctf)
    setOpen(true)
  }

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccess(false)
    setOpenFailure(false)
  }

  useEffect(() => {
    dispatch(getAdminCtf(id))
  }, [])

  const submitHandler = async (e, ctf) => {
    e.preventDefault()
    setOpen(false) //closing modal
    if (editCtf) {
      const formData = new FormData()
      formData.set('question', ctf.question)
      formData.set('answer', ctf.answer)
      formData.set('hint', ctf.hint)
      formData.set('hidden', ctf.checked)
      formData.set('sno', ctf.sno)
      const { success } = await dispatch(editCurrentCtf(editCtf._id, formData))
      if (success) {
        setMessage('Changes Saved Successfully')
        setOpenSuccess(true)
      } else {
        setMessage('Error in saving changes')
        setOpenFailure(true)
      }
    } else {
      const formData = new FormData()
      formData.set('question', ctf.question)
      formData.set('answer', ctf.answer)
      formData.set('hint', ctf.hint)
      formData.set('hidden', ctf.checked)
      formData.set('sno', ctf.sno)
      const { success } = await dispatch(addNewCtf(id, formData))
      if (success) {
        setMessage('CTF created Successfully')
        setOpenSuccess(true)
      } else {
        setMessage('Error in creating CTF')
        setOpenFailure(true)
      }
    }
  }

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: 'S. No',
          field: 'sno',
          sort: 'asc',
        },
        {
          label: 'CTF ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Question',
          field: 'question',
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

    ctfData.forEach((ctf) => {
      data.rows.push({
        sno: ctf.sno,
        id: ctf._id,
        question: <span>{ctf.question}</span>,
        archive: `${ctf.hidden}`,
        actions: (
          <>
            <Tooltip title='Edit' placement='top' arrow>
              <button
                className='btn btn-primary py-1 px-2  ml-2'
                onClick={() => editCtfHandler(ctf)}
              >
                <i class='far fa-edit'></i>
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
                <h1>All Ctf</h1>
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

      <CtfDialog
        open={open}
        handleClose={handleClose}
        ctf={editCtf}
        submitHandler={submitHandler}
      />
    </>
  )
}

export default AdminCtfs
