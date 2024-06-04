import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { getModule } from '../../actions/moduleAction';
import { Button } from '@material-ui/core';
import Loader from '../Loader/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: "lightslategray",
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: "rgb(40, 167, 69)",
    borderRadius: "10px",
    height: "23px",
    marginLeft: theme.spacing(1),
  },
  inProgress: {
    backgroundColor: "orange",
    borderRadius: "10px",
    height: "23px",
    marginLeft: theme.spacing(1),
  },
  checkIcon: {
    height: "23px",
    color: "white",
    marginLeft: "-10px",
  },
  summaryContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

export default function ModuleAccordin({ module }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const dispatch = useDispatch();
  const modules = useSelector((state) => state.modules);
  const { loading, moduleDetails = [], error } = modules;
  const userData = useSelector((state) => state.user);
  const user = userData.data;

  console.log(user)

useEffect(() => {
    calculateOverallProgress()

},[])

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const calculateOverallProgress = () => {
 
        if(module.totalQuestions > 0 && module.totalResponses > 0){
          setCompletionPercentage(Math.ceil((module.totalResponses / module.totalQuestions) * 100));
    } else {
      setCompletionPercentage(0);
    }
  };
  
  return (
    <>
    <div className={classes.root} style={{ marginBottom: "15px" }}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          classes={{ content: classes.summaryContent }}
        >
          <Typography className={classes.heading}>{module.moduleTitle}</Typography>
          <div className={classes.secondaryHeading}>
            <Button className={completionPercentage > 80 ? classes.completedButton : classes.inProgress}>
              <CheckCircleIcon className={classes.checkIcon} />{completionPercentage > 80 ? "Completed" : "In Progress"}
            </Button>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <span>Total Questions : {module.totalQuestions}</span>
            <br />
            <span>Total Answered : {module.totalResponses > 0 ? module.totalResponses : "0"}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>

    
    </>
   
  );
}
