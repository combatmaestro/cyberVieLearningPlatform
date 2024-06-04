import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import SideDrawer from "../Drawer/SideDrawer";
// import InputLabel from "@material-ui/core";
import SuccessBar from "../SnackBar/SuccessBar";
import ErrorBar from "../SnackBar/ErrorBar";
import Loader from "../../components/Loader/Loader";
import { addNewBatch, getAllBatches } from "../../actions/moduleAction";
import { Card, CardContent, FormControl } from "@material-ui/core";
import ModulesDataRender from "../../components/Progress/ModulesDataRender";
import { getModuleDetailsComplete } from "../../actions/moduleAction";
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
  overflowScroll: {
    height: "100%",
    overflowY: "auto",
  },
  menuItemContent: {
    display: "flex",
    alignItems: "center",
  },
}));

const TrackStudent = () => {
  document.title = "Modules";
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const [message, setMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const allUsers = useSelector((state) => state.allUsers);
  const { loading, allUsersData = [] } = allUsers;

  const handleChange = (event) => {
    setSelectedOption(event.target.value);

    const user = allUsersData.filter((user) => user._id === event.target.value);
    dispatch(getModuleDetailsComplete(user[0]));
  };
  const editModuleHandler = (module) => {
    // setEditModule(module)
    // setOpen(true)
  };
  const handleCloseBar = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return
    // }
    setOpenSuccess(false);
    setOpenFailure(false);
  };
  const handleClickOpen = () => {
    setEditBatch(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitHandler = async (
    e,
    title,
    description,
    startDate,
    endDate,
    courseFee,
    discountFee
  ) => {
    e.preventDefault();
    setOpen(false); //closing modal
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
    const formData = new FormData();

    formData.set("title", title);
    formData.set("description", description);
    formData.set("startDate", startDate);
    formData.set("endDate", endDate);
    formData.set("fee", courseFee);
    formData.set("discountedFee", discountFee);
    const { success } = await dispatch(addNewBatch(formData));
    if (success) {
      setMessage("Batch created Successfully");
      setOpenSuccess(true);
    } else {
      setMessage("Error in Batch creation");
      setOpenFailure(true);
    }
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
                <h1>Track Progress</h1>
                <Card
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    backgroundColor: "#7e81ef",
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    {/* <InputLabel id="demo-simple-select-autowidth-label">Select Student To Track</InputLabel> */}
                    <Select
                      //   className={classes.create}
                      value={selectedOption}
                      onChange={handleChange}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        <div className={classes.menuItemContent}>
                          <Avatar
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&s"
                            className={classes.avatar}
                          />{" "}
                          &nbsp; &nbsp; Select Student To Track
                        </div>
                      </MenuItem>
                      {allUsersData.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
                             <div className={classes.menuItemContent}>
                          <Avatar
                            style={{ height: "25px", width: "25px" }}
                            className={classes.avatar}
                            src={user.avatar.url}
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          {user.name}
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Box>
              <br />
              <Card style={{ height: "71vh" }}>
                <CardContent className={classes.overflowScroll}>
                  <ModulesDataRender />
                </CardContent>
              </Card>
              {/* <MDBDataTable data={mdbBatches()} bordered striped hover /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TrackStudent;
