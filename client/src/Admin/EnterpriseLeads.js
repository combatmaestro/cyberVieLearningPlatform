import React, { useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnterpriseLeads } from "../actions/enterpriseLeadAction";
import Loader from "../components/Loader/Loader";
import SideDrawer from "./Drawer/SideDrawer";
import { Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  tableContainer: {
    paddingTop: 25,
  },
}));

function EnterpriseLeads() {
  document.title = "Enterprise Leads";
  const classes = useStyles();
  const dispatch = useDispatch();

  const { leads, loading, error } = useSelector((state) => state.enterpriseLeads);

  useEffect(() => {
    dispatch(getAllEnterpriseLeads());
  }, [dispatch]);

  if (loading) return <Loader />;

  const mdbLeads = () => {
    const data = {
      columns: [
        { label: "Email", field: "email", sort: "asc" },
        { label: "Phone", field: "phone", sort: "asc" },
        { label: "Message", field: "message", sort: "asc" },
        { label: "Created At", field: "createdAt", sort: "asc" },
      ],
      rows: [],
    };

    leads?.forEach((lead) => {
      data.rows.push({
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        createdAt: new Date(lead.createdAt).toLocaleString(),
      });
    });

    return data;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={2}>
        <SideDrawer />
      </Grid>
      <Grid className={classes.tableContainer} item xs={12} md={10}>
        <Grid container justify="center">
          <Grid item xs={12} md={10}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <h1>Enterprise Leads</h1>
              <Button variant="contained" color="primary" size="small" disabled>
                Total Leads: {leads?.length || 0}
              </Button>
            </Box>
            <MDBDataTable data={mdbLeads()} bordered striped hover />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default EnterpriseLeads;
