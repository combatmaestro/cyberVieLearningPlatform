import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { data, isAuthenticated } = user;


  return (
    <div className={classes.root} style={{padding:"10px"}}>
      <AppBar position="static" style={{borderRadius: "10px" , backgroundColor:"white" , color:"lightslategray"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Hi , {data.name}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}