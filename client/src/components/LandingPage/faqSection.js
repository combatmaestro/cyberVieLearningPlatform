import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Box,
  createMuiTheme,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
    backgroundColor: "#f3f4f6",
    marginBottom:theme.spacing(8)
  },
  registerBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(3),
    gap: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(3),
    },
  },
  registerPrompt: {
    marginBottom: theme.spacing(2),
    fontSize: "1.2rem",
    color: "#011327",
    width: "47%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom:0,
      fontSize: "1.1rem",
    },
  },
  registerButton: {
    backgroundColor: "#269397",
    color: "#fff",
    boxShadow: "none",
    fontFamily: "Inter",
    borderRadius:8,
    fontSize: "16px",
    fontWeight: "600",
    textTransform: "none",
    padding: "5px 40px",
    marginBottom: 25,
    "&:hover": {
      backgroundColor: "#1f7d7f",
    },
  },
  faqContainer: {
    minWidth: "100%",
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  accordion: {
    backgroundColor: "#011327",
    color: "#F5F5F5",
    padding: "10px 10px",
    marginBottom: theme.spacing(1),
    fontFamily: "Inter !important",
    borderRadius: theme.shape.borderRadius,
    "& .MuiAccordionDetails-root": {
      color: "#F5F5F5",
      transition: 'opacity 0.5s ease-in-out',
      boxShadow: theme.shadows[5],
    },
  },
  faqTitle: {
    marginTop: theme.spacing(4),
    fontSize: "34px",
    fontWeight: "bold",
    fontFamily: "Inter !important",

  },
  accordionDetails: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: "normal",
    textAlign: "left",
    width:"90%",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      width:"100%"
    }
  },
  accordionHeading: {
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
      textAlign:"left"
    }
  },
}));

const FaqSection = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRegister = () => {
    setTimeout(() => {
      history.push('/register');
      window.location.reload();
    }); 
  };

  return (
    <div className={classes.container}>
      <Box className={classes.registerBox} id="faq">
        <Typography className={classes.registerPrompt}>
          What else are you waiting for? Register today and be part of the most
          in-demand profession of the decade
        </Typography>
        <Button className={classes.registerButton} variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </Box>
      <Typography className={classes.faqTitle}>FAQ</Typography>
      <div className={classes.faqContainer}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            className={classes.accordionHeading}
          >
            Q1: What is the structure of the cybersecurity learning program?
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.accordionDetails}>
              The program is divided into several modules that cover fundamental
              to advanced cybersecurity topics. Modules include areas like
              network security, ethical hacking, cryptography, incident
              response, cloud security, and more.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            className={classes.accordionHeading}
          >
            Q2: What certifications will I receive upon completing the course?
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.accordionDetails}>
              Upon successful completion of the course and passing any
              associated exams, you will receive a certification from our
              institute which is recognised across India. The certificate can be
              used for placements in Cybervie.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            className={classes.accordionHeading}
          >
            Q3: What are the in-demand cybersecurity skills for 2024?
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.accordionDetails}>
              The cybersecurity landscape is constantly evolving, so staying
              ahead of the curve is crucial. In 2024, skills like cloud
              security, incident response, and threat intelligence are
              particularly in demand.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            className={classes.accordionHeading}
          >
            Q4: What kind of job roles can I expect after the program?
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.accordionDetails}>
              Graduates of the program are prepared for various roles, including
              Security Analyst, Penetration Tester, Network Security Engineer,
              Incident Response Specialist, and more. We tailor career guidance
              based on your skills and interest areas
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
            className={classes.accordionHeading}
          >
            Q5: Is this course recognized by employers and the industry?
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.accordionDetails}>
              Yes, the curriculum is designed to align with industry standards
              and is recognized by top employers in the cybersecurity field. The
              course prepares you for globally recognized certifications that
              are highly valued by employers.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSection;
