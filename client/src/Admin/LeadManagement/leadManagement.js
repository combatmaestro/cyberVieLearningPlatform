import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "../Drawer/SideDrawer";
import Loader from '../../components/Loader/Loader'
import {getAllFormData} from '../../actions/leadMangementActions';

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

const LeadManagement = () => {
  document.title = "Leads";
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.batches)
  const { loading, data: moduleData = [], error } = modules
  const allFormDatas = useSelector((state) => state.formDataState);
  const {allFormData = [] } = allFormDatas;
  useEffect(() => {
    dispatch(getAllFormData())
  }, [])
 


    
    const getUserNames = (batchId) => {
      const users = allFormData.filter(user => user.batch === batchId);

      return users.map(user => user.name).join(', ');
    };
  
    if (loading) return <Loader />
    const mdbLeads = () => {
        const data = {
          columns: [
            {
              label: 'Created At',
              field: 'createdAt',
              sort: 'asc',
            },
            {
              label: 'Email',
              field: 'email',
              sort: 'asc',
            },
            {
              label: 'Name',
              field: 'name',
              sort: 'asc',
            },
            {
              label: 'Phone Number',
              field: 'phoneNumber',
              sort: 'asc',
            },
            {
              label: 'Location',
              field: 'location',
              sort: 'asc',
            },
            {
              label: 'experience',
              field: 'experience',
              sort: 'asc',
            },
            
          ],
          rows: [],
        };
    
        allFormData.forEach((module) => {
          data.rows.push({
            createdAt:module.createdAt,
            email: module.email,
            name: module.name,
            phoneNumber: module.phoneNumber,
            location: module.location,
            experience: module.experience,
          });
        });
    
        return data;
      };

  return (
    <>
    
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
                <h1>Leads</h1>
                {/* <Button
                  className={classes.create}
                  size="small"
                  variant="contained"
                  color="primary"
                  // onClick={handleClickOpen}
                >
                  Create
                </Button> */}
              </Box>

              <MDBDataTable data={mdbLeads()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadManagement;
