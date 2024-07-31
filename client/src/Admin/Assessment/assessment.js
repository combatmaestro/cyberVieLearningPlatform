import React, { useEffect, useState } from 'react'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'
import { getAllModules } from '../../actions/moduleAction'
import { addNewModule, editCurrentModule } from '../../actions/moduleAction'
import { Link } from 'react-router-dom'
import AssessmentDialogue from './assessmentDialogue'
import Loader from '../../components/Loader/Loader'
import SideDrawer from '../Drawer/SideDrawer'
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'
import { getAllAssessments } from '../../actions/assessmentAction'
// material ui components
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

function Assessment() {
  document.title = 'Assessment'
  const classes = useStyles()
  const dispatch = useDispatch()
  const modules = useSelector((state) => state.modules)
  const { data: moduleData = [] } = modules

  //for dialogue
  const [open, setOpen] = useState(false)
  const [editModule, setEditModule] = useState(null)
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)
  const { assessment, loading, error } = useSelector((state) => state.assessment);

  useEffect(() => {
    dispatch(getAllAssessments());
  }, [dispatch]);

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

  // helper function to get module name by ID
  const getModuleNameById = (id) => {
    const module = moduleData.find(module => module._id === id)
    return module ? module.title : 'Unknown Module'
  }

  // submitting response
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
      formData.set('batch_id','6659efd036b23d000948aa5c')
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
          label: 'Module Name',
          field: 'moduleName',
          sort: 'asc',
        },
        {
          label: 'Total Questions',
          field: 'totalQuestions',
          sort: 'asc',
        },
        {
          label: 'Type',
          field: 'type',
          sort: 'asc',
        },
        // {
        //   label: 'Actions',
        //   field: 'actions',
        // },
      ],
      rows: [],
    }

    assessment?.forEach((assessment) => {
      data.rows.push({
        moduleName: getModuleNameById(assessment.moduleId),
        totalQuestions: assessment.Questions.length,
        type: 'Assessment',
        // actions: (
        //   <>
        //     <Tooltip title='Edit' placement='top' arrow>
        //       <button
        //         className='btn btn-primary py-1 px-2 ml-2'
        //         onClick={() => editModuleHandler(assessment)}
        //       >
        //         <i className='far fa-edit'></i>
        //       </button>
        //     </Tooltip>
        //   </>
        // ),
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
                <h1>All Assessments</h1>
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

      <AssessmentDialogue
        open={open}
        handleClose={handleClose}
        module={editModule}
        submitHandler={submitHandler}
        moduleList={moduleData}
      />
    </>
  )
}

export default Assessment