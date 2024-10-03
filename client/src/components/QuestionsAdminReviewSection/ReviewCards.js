import { Button } from "@material-ui/core";
import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllModules } from "../../actions/moduleAction";
import ModuleListLoader from "../ModulesList/ModuleListLoader";
import LockIcon from "@material-ui/icons/Lock";
import { useStyles } from "../ModulesList/style";
// import moduleImg from "./Cybersecurity_Training.png";

import { getAllAssessmentsToReview } from "../../actions/assessmentAction";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
function ReviewList(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const userData = useSelector((state) => state.user);
  const [assessmentData, setAssessmentData] = useState([]);
  const user = userData.data;
  const { loading, data = [], error } = modules;
  
  const {assessments} = useSelector(state => state.assessmentReview);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllModules(user));
  }, [dispatch, user]);

  useEffect(() => {
    if (userData.data.role.includes("teacher")) {
      dispatch(getAllAssessmentsToReview(userData.data._id));
    }
  }, [dispatch, userData.data._id, userData.data.role]);

  useEffect(() => {
    if (assessments && assessments.length > 0) {
      setAssessmentData(assessments);
    }
  }, [assessments]);

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

  const handleClick = (assg) =>{
    history.push({
      pathname: `/review/${assg._id}`, 
      state: { assignment: assg },
    });
  }
  

  return (
    <>
    <h3 className={classes.headerContainer}>Assessment Review</h3>
    <div className={classes.root}>
     
      {assessments?.length > 0
        ? assessments?.map((ass,i) => {
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
                          onClick={()=>{handleClick(ass)}}
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
    </>
  );
}

export default ReviewList;
