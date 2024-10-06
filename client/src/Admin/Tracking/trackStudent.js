import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
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
import { Card, CardContent } from "@material-ui/core";
import ModulesDataRender from "../../components/Progress/ModulesDataRender";
import { getModuleDetailsComplete } from "../../actions/moduleAction";
import { adminGetAllUsers } from "../../actions/userActions";
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
  const [selectedUser, setSelectedUser] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const allUsers = useSelector((state) => state.allUsers);
  const { loading, allUsersData = [] } = allUsers;
  const userData = useSelector((state) => state.user);
  const user = userData.data;
  // const { moduleDetails = [], error } = modules;

  const [selectedTier, setSelectedTier] = useState("paid");

  const filteredUsers = Array.isArray(allUsersData)
  ? allUsersData.filter((user) =>
    selectedTier === "all" ? true : user.tier === selectedTier
    )
  : [];

  // useEffect(() => {
  //   const users =  Array.isArray(allUsersData)
  //   ? allUsersData.filter((user) =>
  //       selectedTier === "all" ? true : user.tier === selectedTier
  //     )
  //   : []
  //   setFilteredUsers(users);
  // },[allUsersData])

  useEffect(() => {
    dispatch(adminGetAllUsers());
  }, []);
  const handleTierChange = (event) => {
    setSelectedTier(event.target.value);
    setCurrentUser(""); // Reset the selected user when tier changes
    setSelectedUser(null); // Reset the selected user when tier changes
  };
  const handleChange = (event) => {
    setCurrentUser(event.target.value);

    const user = allUsersData.filter((user) => user._id === event.target.value);
    setSelectedUser(user[0]);
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
                <Box display="flex" alignItems="center" style={{ gap: "10px" }}>
                  <span>Filter by Tier:</span>
                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      value={selectedTier}
                      onChange={handleTierChange}
                      displayEmpty
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="paid">Premium</MenuItem>
                      <MenuItem value="free">Free</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
                      value={currentUser}
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
                      {filteredUsers.map((user) => (
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
              {selectedUser && (
                <Card>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Name
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.name}
                            label="Name"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Email
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.email}
                            label="Email"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Mobile
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.mobile}
                            label="Mobile"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Education
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.education}
                            label="Education"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Working Domain
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.workingDomain}
                            label="Working Domain"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Current Salary
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.currentSalary}
                            label="Current Salary"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Expected Salary
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.expectedSalary}
                            label="Expected Salary"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel htmlFor="component-outlined">
                            Preferred Location
                          </InputLabel>
                          <OutlinedInput
                            id="component-outlined"
                            value={selectedUser.preferredLocation}
                            label="Preferred Location"
                            readOnly
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}
              <br />
              <Card style={{ height: "71vh", marginBottom: "4%" }}>
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
