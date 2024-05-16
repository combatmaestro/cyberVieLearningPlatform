import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getAllModules } from '../../actions/moduleAction'
import { addNewModule, editCurrentModule } from '../../actions/moduleAction'
import { Link } from 'react-router-dom'
import ModuleDialogue from './ModuleDialogue'
import Loader from '../../components/Loader/Loader'
import SideDrawer from '../Drawer/SideDrawer'
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'

//material ui components
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
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

function AdminModules() {
  document.title = 'Modules'
  const classes = useStyles()
  const dispatch = useDispatch()
  const modules = useSelector((state) => state.modules)
  const { loading, data: moduleData = [], error } = modules

  //for dialogue
  const [open, setOpen] = useState(false)
  const [editModule, setEditModule] = useState(null)
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)
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
  }, [])

  //submitting response
  const submitHandler = async (e, title, description, radioValue, checked) => {
    e.preventDefault()
    setOpen(false) //closing modal
    console.log(title, description, radioValue, checked)
    if (editModule) {
      const formData = new FormData()
      formData.set('title', title)
      formData.set('description', description)
      formData.set('type', radioValue)
      formData.set('hidden', checked)

      const { success } = await dispatch(
        editCurrentModule(editModule._id, formData)
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
      formData.set('title', title)
      formData.set('description', description)
      formData.set('type', radioValue)
      formData.set('hidden', checked)
      const { success } = await dispatch(addNewModule(formData))
      if (success) {
        setMessage('Module created Successfully')
        setOpenSuccess(true)
      } else {
        setMessage('Error in created module')
        setOpenFailure(true)
      }
    }
  }

  if (loading) return <Loader />

  const mdbJobs = () => {
    const data = {
      columns: [
        {
          label: 'Module ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
        },
        {
          label: 'Type',
          field: 'type',
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

    moduleData.forEach((module) => {
      data.rows.push({
        id: module._id,
        title: (
          <Link to={`/admin/topics/${module._id}`}>
            <span>{module.title}</span>
            <span className={classes.icon}>
              <ExitToAppIcon />
            </span>
          </Link>
        ),
        type:
          module.type === 'paid' ? (
            <p style={{ color: 'red' }}>Paid</p>
          ) : (
            <p style={{ color: 'green' }}>Free</p>
          ),
        archive: `${module.hidden}`,
        actions: (
          <>
            <Tooltip title='Edit' placement='top' arrow>
              <button
                className='btn btn-primary py-1 px-2  ml-2'
                onClick={() => editModuleHandler(module)}
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
                <h1>All Modules</h1>
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

      <ModuleDialogue
        open={open}
        handleClose={handleClose}
        module={editModule}
        submitHandler={submitHandler}
      />
    </>
  )
}

export default AdminModules
