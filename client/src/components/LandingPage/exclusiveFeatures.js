import React, { useState } from "react";
import { Box, Button, Typography, makeStyles, createMuiTheme } from "@material-ui/core";
import image1 from './images/exclusive1.png'
import image2 from './images/exclusive2.png'
import image3 from './images/exclusive3.png'
import image4 from './images/exclusive4.png'
import image5 from './images/exclusive5.png'


const theme = createMuiTheme({
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
    },
  });

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
      display:"none"
    },
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(5),
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    alignItems: "flex-end",
  },
  sidebarButton: {
    width: "250px",
    padding: theme.spacing(2),
    borderRadius: "8px",
    backgroundColor: "#011327",
    color: "#fff",
    fontFamily: "Inter",
    fontSize: "16px",
    textTransform: "none",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#269397",
      cursor: "pointer",
    },
  },
  contentArea: {
    backgroundColor: "#011327",
    color: "#fff",
    padding: theme.spacing(4),
    height:"460px",
    fontFamily: "Inter",
    width:"860px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  featureImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: theme.spacing(2),
  },
  heading:{
    textAlign: "center",
    marginBlock: "40px",
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "36px",
  },
  heading2:{
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: "24px",
  },
  description: {
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: "16px",
    width:"85%"
  },
}));

const features = {
  "Live Training": {
    title: "Live Training",
    description:
      "Each class is taught by world-class instructors with decades of experience in real-world cybersecurity.",
    image: image1,
  },
  "Flexible Classes": {
    title: "Flexible Classes",
    description:
      "Each class is taught by world-class instructors with decades of experience in real-world cybersecurity.",
    image:
      image2
  },
  "Instructor Access": {
    title: "Instructor Access",
    description:
      "Directly connect with industry experts to clarify doubts and deepen your understanding. Benefit from real-time mentorship throughout the course.",
    image:
      image3
  },
  "Unbeatable Support": {
    title: "Unbeatable Support",
    description:
      "We provide round-the-clock support to ensure you're never stuck or left behind. Our team is dedicated to your learning journey and success.",
    image:
      image4
  },
  "Industry Recognised": {
    title: "Industry Recognised",
    description:
      "Gain certifications that are respected by leading companies across India. Stand out with credentials that prove your expertise to employers.",
    image:
      image5
  },
};

const ExclusiveFeatures = () => {
  const classes = useStyles();
  const [activeFeature, setActiveFeature] = useState(features["Live Training"]);
  const handleHover = (featureKey) => {
    setActiveFeature(features[featureKey]);
  };

  return (
    <Box className={classes.container} id="features">
        <Typography variant="h4" gutterBottom className={classes.heading}>
          Exclusive Features
        </Typography>
        <Box className={classes.content}>
      <Box className={classes.sidebar}>
        {Object.keys(features).map((featureKey) => (
          <Button
            key={featureKey}
            className={classes.sidebarButton}
            onMouseEnter={() => handleHover(featureKey)}
          >
            {featureKey}
          </Button>
        ))}
      </Box>
      <Box className={classes.contentArea}>
        <img
          src={activeFeature.image}
          alt={activeFeature.title}
          className={classes.featureImage}
        />
        <Typography variant="h5" gutterBottom className={classes.heading2}>
          {activeFeature.title}
        </Typography>
        <Typography variant="body1" className={classes.description}>{activeFeature.description}</Typography>
      </Box>
      </Box>
    </Box>
  );
};

export default ExclusiveFeatures;
