import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import SideDrawer from "../Drawer/SideDrawer";
import Loader from '../../components/Loader/Loader'
import { getAllFormData } from '../../actions/leadMangementActions';

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
  card: {
    minWidth: 150,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardStat: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}));

const LeadManagement = () => {
  document.title = "Leads";
  const classes = useStyles();
  const dispatch = useDispatch();
  
  // Fetching all form data
  const allFormDatas = useSelector((state) => state.formDataState);
  const { allFormData = [], loading } = allFormDatas;

  useEffect(() => {
    dispatch(getAllFormData());
  }, [dispatch]);
 
  // Function to calculate Converted and Total Leads
  const totalLeads = allFormData.length;
  const convertedLeads = allFormData.filter((lead) => lead.tier === "paid");

  // Formatting date
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    };
  
  if (loading) return <Loader />;

    const mdbLeads = () => {
        const data = {
          columns: [
        { label: 'Created At', field: 'createdAt', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Tier', field: 'tier', sort: 'asc' },
        { label: 'Phone Number', field: 'phoneNumber', sort: 'asc' },
        { label: 'Location', field: 'location', sort: 'asc' },
        { label: 'Experience', field: 'experience', sort: 'asc' },
          ],
          rows: [],
        };
    
        allFormData.forEach((module) => {
          data.rows.push({
            createdAt:formatDateTime(module.createdAt),
            email: module.email,
            name: module.name,
        tier: (
          <span style={{ color: module.tier === 'free' ? 'red' : 'green', fontWeight: "bold" }}>
            {module.tier}
          </span>
        ),
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
          <Grid container spacing={2} justify="center">
            {/* Cards for Converted and Total Leads */}
           
            <Grid item xs={12} md={4}>
              <Card className={classes.card} style={{backgroundColor:"#ffc14e"}}>
                <CardContent>
                  <Typography style={{fontWeight:"bold"}} className={classes.cardTitle} color="textSecondary" gutterBottom>
                    Total Leads
                  </Typography>
                  <Typography className={classes.cardStat} color="textPrimary">
                    {totalLeads}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.card} style={{backgroundColor:"#72f772"}}>
                <CardContent>
                  <Typography style={{fontWeight:"bold"}} className={classes.cardTitle} color="textSecondary" gutterBottom>
                    Converted Leads
                  </Typography>
                  <Typography className={classes.cardStat} color="textPrimary">
                    {convertedLeads.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className={classes.card} style={{backgroundColor:"#8282ff"}}>
                <CardContent>
                  <Typography style={{fontWeight:"bold"}} className={classes.cardTitle} color="textSecondary" gutterBottom>
                    Conversion Rate
                  </Typography>
                  <Typography className={classes.cardStat} color="textPrimary">
                    {(convertedLeads.length / totalLeads) * 100 } %
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Data Table */}
          <Grid container justify="center">
            <Grid item xs={12} md={10}>
              {/* <Box display="flex" alignItems="center" justifyContent="space-between">
                <h1>Leads</h1>
              </Box> */}
              <MDBDataTable data={mdbLeads()} bordered striped hover />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadManagement;
