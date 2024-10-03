import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModules } from '../../actions/moduleAction';
import { getAllSubtopics, addSubtopics,deleteSubtopic } from '../../actions/topicAction';
import SubtopicDialogue from './subtopicDialogue';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Loader from '../../components/Loader/Loader';
import SideDrawer from '../Drawer/SideDrawer';
import SuccessBar from '../SnackBar/SuccessBar';
import ErrorBar from '../SnackBar/ErrorBar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';
import { put } from '@vercel/blob';

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
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 250,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
  tickIcon: {
    color: 'green',
    fontSize: '4rem',
    position: 'relative',
    textAlign: 'center',
    left: '145px',
  },
}));

export default function Subtopics() {
  document.title = 'Subtopics';
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const { loading, data: moduleData = [], error } = modules;

  // for dialogue
  const [open, setOpen] = useState(false);
  const [editModule, setEditModule] = useState(null);
  const [message, setMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const subtopicList = useSelector((state) => state.subtopics);
  const { subtopics } = subtopicList;

  useEffect(() => {
    dispatch(getAllSubtopics());
  }, [dispatch]);

  const handleClickOpen = () => {
    setEditModule(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenFailure(false);
  };

  const editModuleHandler = (module) => {
    setEditModule(module);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getAllModules());
  }, [dispatch]);

  const post = async (fileData) => {
    const file = fileData;
    const blob = await put(file.name, file, {
      access: 'public',
      // token: process.env.REACT_APP_BLOB_READ_WRITE_TOKEN,
      token:"vercel_blob_rw_usArl96pMAefO5SE_I4cOHFP1oA5eRLvdsw9TGpTs7j9Hlw"
    });
    return blob;
  };

  // submitting response
  // const submitHandler = async (subTopicData) => {
  //   console.log(subTopicData);
  //   const modifiedSubtopicsData = [];
  //   for (const subtopic of subTopicData.subtopics) {
  //     const data = await post(subtopic.file);
  //     const subTopicObj = {
  //       fileName: subtopic.fileName,
  //       title: subtopic.title,
  //       file: data.url,
  //     };
  //     modifiedSubtopicsData.push(subTopicObj);
  //   }
  //   const newObj = {
  //     topicId: subTopicData.topicId,
  //     subtopics: modifiedSubtopicsData,
  //   };
  //   const response = await dispatch(addSubtopics(newObj));
  //   console.log(response);
  //   if (response && response.status === 200) {
  //     setOpen(false);
  //     setSuccessModalOpen(true);
  //   } else {
  //     setMessage(response?.error || 'An error occurred');
  //     setOpenFailure(true);
  //   }
  // };
  const submitHandler = async (subTopicData) => {
    const modifiedSubtopicsData = [];
    for (const subtopic of subTopicData.subtopics) {
      const data = await post(subtopic.file);
      const subTopicObj = {
        fileName: subtopic.fileName,
        title: subtopic.title,
        file: data.url,
      };
      modifiedSubtopicsData.push(subTopicObj);
    }
    const newObj = {
      topicId: subTopicData.topicId,
      subtopics: modifiedSubtopicsData,
    };
    const response = await dispatch(addSubtopics(newObj));
    if (response && response.status === 200) {
      dispatch(getAllSubtopics());
      setOpen(false);
      setSuccessModalOpen(true);
    } else {
      setMessage(response?.error || 'An error occurred');
      setOpenFailure(true);
    }
  };

  const deleteSubtopics = async(id) => {
    const res = await dispatch(deleteSubtopic(id));
    if(res.status === 200){
      alert('subtopic deleted successfully');
    }
  }
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  if (loading) return <Loader />;

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
        {
          label: "Delete",
          field: "actions",
        },
      ],
      rows: [],
    };

    subtopics.forEach((subtopic) => {
      data.rows.push({
        title: subtopic.title,
        topicName: subtopic.topicName,
        type: 'PDF', // Assuming type should be 'PDF' for all entries
        actions: (
          <>
            <Tooltip title="Delete" placement="top" arrow>
              <button
                className="btn btn-danger py-1 px-2  ml-2"
                onClick={() => deleteSubtopics(subtopic._id)}
              >
                <i className="fa fa-trash" style={{color:"white"}}></i>
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
      <Modal
        open={successModalOpen}
        onClose={handleSuccessModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContent}>
          <CheckCircle className={classes.tickIcon} />
          <Typography
            style={{ textAlign: 'center' }}
            variant='h6'
            id='simple-modal-title'
            gutterBottom
          >
            Success!
          </Typography>
          <Typography
            style={{ textAlign: 'center' }}
            variant='body2'
            id='simple-modal-description'
          >
            Your subtopic has been created successfully.
          </Typography>
          <Button
            style={{
              position: 'relative',
              left: '120px',
              top: '20px',
              paddingInline: '50px',
              backgroundColor: 'green',
              background:
                'linear-gradient(298.54deg, rgb(10, 118, 123) -7.7%, rgb(0, 167, 214) 97.12%)',
            }}
            variant='contained'
            color='primary'
            onClick={handleSuccessModalClose}
          >
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
}
