import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SideDrawer from '../Drawer/SideDrawer';
import { Card, CardContent, TextField, Typography, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { fetchLabs } from '../../actions/labActions';

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
  card: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveButton: {
    marginTop: theme.spacing(2),
  },
}));

const AdminLabs = () => {
  document.title = 'Labs';
  const classes = useStyles();
  const dispatch = useDispatch()

  const [labName, setLabName] = useState("Linux Playground");
  const [companyId, setCompanyId] = useState(3292);
  const [teamId, setTeamId] = useState(5943);
  const [planId, setPlanId] = useState(5942);

  const handleSave = async () => {
    const labData = {
      labName,
      companyId,
      teamId,
      planId,
    };
   
  };

  const handleLogin = () => {
    // dispatch(fetchLabs())
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={2}>
        <SideDrawer />
      </Grid>
      <Grid className={classes.tableContainer} item xs={12} md={10}>
        <Grid container justify='center'>
          <Grid item xs={12} md={10}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <h1>All Labs</h1>
              <Button
                className={classes.create}
                size='small'
                variant='contained'
                color='primary'
                  onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={10}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Lab Details
                </Typography>
                <TextField
                  label="Lab Name"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                />
                <TextField
                  label="Company ID"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                />
                <TextField
                  label="Team ID"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                />
                <TextField
                  label="Plan ID"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                />
                <Box className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveButton}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminLabs;
