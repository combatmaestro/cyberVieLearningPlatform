import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "../Drawer/SideDrawer";
import BatchDialogue from "./BatchDialogue";
import SuccessBar from '../SnackBar/SuccessBar'
import ErrorBar from '../SnackBar/ErrorBar'
import Loader from '../../components/Loader/Loader'
import { addNewBatch,getAllBatches } from '../../actions/moduleAction';
const useStyles = makeStyles((theme) => ({
  root: {},
  create: {
    height: 32,
  },
  icon: {
    marginLeft: 5,
    "& .MuiSvgIcon-root": {
      widthL: 15,
      height: 15,
      color: "#4285f4",
    },
  },
  tableContainer: {
    paddingTop: 25,
  },
}));

const Batch = () => {
  document.title = "Modules";
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const [editBatch, setEditBatch] = useState(null)
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailure, setOpenFailure] = useState(false)
  const modules = useSelector((state) => state.batches)
  const { loading, data: moduleData = [], error } = modules
  useEffect(() => {
    dispatch(getAllBatches())
    console.log(moduleData)
  }, [])
 
  const editModuleHandler = (module) => {
    // setEditModule(module)
    // setOpen(true)
  }
  const handleCloseBar = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return
    // }
    setOpenSuccess(false)
    setOpenFailure(false)
  }
  const handleClickOpen = () => {
    setEditBatch(null)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const submitHandler = async (e, title, description, startDate, endDate, courseFee) => {
    e.preventDefault()
    setOpen(false) //closing modal
    // console.log(title, description, radioValue, checked)
    // if (editModule) {
    //   const formData = new FormData()
    //   formData.set('title', title)
    //   formData.set('description', description)
    //   formData.set('type', radioValue)
    //   formData.set('hidden', checked)

    //   const { success } = await dispatch(
    //     editCurrentModule(editModule._id, formData)
    //   )
    //   if (success) {
    //     setMessage('Changes Saved Successfully')
    //     setOpenSuccess(true)
    //   } else {
    //     setMessage('Error in saving changes')
    //     setOpenFailure(true)
    //   }
    // } else {
      const formData = new FormData()
     
    formData.set('title', title);
    formData.set('description', description);
    formData.set('startDate', startDate);
    formData.set('endDate', endDate);
    formData.set('fee', courseFee);
      const { success } = await dispatch(addNewBatch(formData))
      if (success) {
        setMessage('Batch created Successfully')
        setOpenSuccess(true)
      } else {
        setMessage('Error in Batch creation')
        setOpenFailure(true)
      }
    }
  
    if (loading) return <Loader />
    const mdbBatches = () => {
        const data = {
          columns: [
            {
              label: 'Title',
              field: 'title',
              sort: 'asc',
            },
            {
              label: 'Description',
              field: 'description',
              sort: 'asc',
            },
            {
              label: 'Start Date',
              field: 'startDate',
              sort: 'asc',
            },
            {
              label: 'End Date',
              field: 'endDate',
              sort: 'asc',
            },
            {
              label: 'Fee',
              field: 'fee',
              sort: 'asc',
            },
            {
              label: 'Actions',
              field: 'actions',
            },
          ],
          rows: [],
        };
    
        moduleData.forEach((module) => {
          data.rows.push({
            title: module.title,
            description: module.description,
            startDate: new Date(module.startDate).toLocaleDateString(),
            endDate: new Date(module.endDate).toLocaleDateString(),
            fee: module.fee,
            actions: (
              <>
                <Tooltip title='Edit' placement='top' arrow>
                  <button
                    className='btn btn-primary py-1 px-2 ml-2'
                    onClick={() => setEditBatch(module)}
                  >
                    <i className='far fa-edit'></i>
                  </button>
                </Tooltip>
              </>
            ),
          });
        });
    
        return data;
      };

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
          <Grid container justify="center">
            <Grid item xs={12} md={10}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <h1>All Batches</h1>
                <Button
                  className={classes.create}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Create
                </Button>
              </Box>

              <MDBDataTable data={mdbBatches()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <BatchDialogue
        open={open}
        handleClose={handleClose}
        module={editBatch}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default Batch;
