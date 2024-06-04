import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllModules } from "../../actions/moduleAction";
import ModuleListLoader from "./ModuleListLoader";
import LockIcon from "@material-ui/icons/Lock";
import { useStyles } from "./style";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { IconButton } from '@material-ui/core'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
function ModulesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const userData = useSelector((state) => state.user);
  const user = userData.data;
  const { loading, data = [], error } = modules;
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllModules());
    console.log(data);
  }, [dispatch]);

  const clickHandler = (id) => history.push(`/module/${id}`);

  if (loading && !error) return <ModuleListLoader />;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <AccessAlarmsIcon className={classes.blink} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/batch" className={classes.blink}>
              Click here and check out our Latest Live Courses!!
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {data.map((module) => {
        return (
          <>
            {module.hidden ? (
              ""
            ) : (
              <div
                key={module._id}
                className={classes.module}
                style={{
                  background:
                    user.role === "user" &&
                    user.tier === "free" &&
                    module.type === "paid"
                      ? "linear-gradient(133.06deg, rgba(37, 89, 131, 0.37) 9.35%, rgba(118, 194, 255, 0) 105.63%)"
                      : "#FFFFFF",
                  pointerEvents:
                    user.role === "user" &&
                    user.tier === "free" &&
                    module.type === "paid"
                      ? "none"
                      : "",
                }}
              >
                <div className={classes.titleBold}>{module.title}</div>
                {user.role === "user" &&
                user.tier === "free" &&
                module.type === "paid" ? (
                  <div className={classes.lockIcon}>
                    <LockIcon />
                  </div>
                ) : (
                  ""
                )}

                <div className={classes.description}>{module.description}</div>
                <div className={classes.button}>
                  {user.role === "user" &&
                  user.tier === "free" &&
                  module.type === "paid" ? (
                    <Button variant="outlined">Premium</Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => clickHandler(module._id)}
                    >
                      View Course
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default ModulesList;
