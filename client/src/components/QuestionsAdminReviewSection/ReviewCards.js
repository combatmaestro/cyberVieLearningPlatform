import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllModules } from "../../actions/moduleAction";
import ModuleListLoader from "../ModulesList/ModuleListLoader";
import LockIcon from "@material-ui/icons/Lock";
import { useStyles } from "../ModulesList/style";
// import moduleImg from "./Cybersecurity_Training.png";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
function ReviewList(props) {
    console.log(props)
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const userData = useSelector((state) => state.user);
  const user = userData.data;
  const { loading, data = [], error } = modules;
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllModules(user));
    console.log(data);
  }, [dispatch, user]);

  const clickHandler = (id) => history.push(`/module/${id}`);

  if (loading && !error) return <ModuleListLoader />;

  // Extract number from module description
  const getNumberFromDescription = (description) => {
    const match = description.match(/\d+/);
    return match ? parseInt(match[0], 10) : Infinity;
  };

  // Sort modules based on the extracted number from description
  const moduleName = (moduleId) =>{
    const sortedModules = data?.find(module => moduleId === module._id)

    return sortedModules.title;
  }
  

  return (
    <div className={classes.root}>
      {props?.assessmentsData?.length > 0
        ? props?.assessmentsData?.map((ass,i) => {
            return (
              <React.Fragment key={i}>
                  <div
                    className={classes.module}
                    style={{
                      background:
                        "linear-gradient(133.06deg, rgba(37, 89, 131, 0.37) 9.35%, rgba(118, 194, 255, 0) 105.63%)", pointerEvents:""
                        }}
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={10}>
                        <div className={classes.titleBold}>{moduleName(ass.moduleId)}</div>
                      </Grid>
                      {/* {!(user.role === "user" &&
                      user.tier === "free" &&
                      module.type === "paid") && <Grid item xs={12} md={2}>
                        <img
                          src={moduleImg}
                          style={{ width: 50, height: 50, marginRight: 10 }}
                        />
                      </Grid>} */}
                    </Grid> 
                    {/* {user.role === "user" &&
                      user.tier === "free" &&
                      module.type === "paid" && (
                        <div className={classes.lockIcon}>
                          <LockIcon />
                        </div>
                      )} */}
                      
                    <div className={classes.description}>
                      Submitted By : {ass.submittedBy}
                    </div>
                    <div className={classes.button}>
                      {/* {user.role === "user" &&
                      user.tier === "free" &&
                      module.type === "paid" ? ( */}
                        <Button
                          variant="outlined"
                          style={{
                            background:
                              " linear-gradient(298.54deg, #0A767B -7.7%, #00A7D6 97.12%)",
                          }}
                        >
                          Review Assignment
                        </Button>
                      {/* ) : (
                        <Button
                          variant="outlined"
                          onClick={() => clickHandler(module._id)}
                          style={{
                            background:
                              " linear-gradient(298.54deg, #0A767B -7.7%, #00A7D6 97.12%)",
                          }}
                        >
                          View Course
                        </Button>
                      )} */}
                    </div>
                  </div>
                
              </React.Fragment>
            );
          })
        : ""}
    </div>
  );
}

export default ReviewList;
