import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  createMuiTheme,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import chart from "./images/Graph.png";
import image1 from "./images/cardImg1.png";
import image2 from "./images/cardImg2.png";
import image3 from "./images/cardImg3.png";
import image4 from "./images/cardImg4.png";
import image5 from "./images/cardImg5.png";
import image6 from "./images/cardImg6.png";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: "#011327",
    color: "#fff",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontFamily: "Inter",
    fontSize: "34px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
      marginBottom: theme.spacing(2),
    },
  },
  subtitle: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "normal",
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      fontSize: "14px",
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      fontSize: "13px",
    },
  },
  chart: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  paragraph: {
    fontFamily: "Inter",
    fontSize: "18px",
    width: "90%",
    textAlign: "start",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    },
  },
  card: {
    backgroundColor: "#269397",
    color: "#fff",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      gap: theme.spacing(1),
      padding: theme.spacing(1),
    },
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardMedia: {
    width: 153,
    height: 146,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.down("xs")]: {
      width: 120,
      height: 120,
    },
  },

  dotContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  dot: {
    color: "#fff",
    fontSize: "12px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px",
    },
  },
  activeDot: {
    color: "#269397",
  },
  cardTitle: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  cardDate: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  cardDescription: {
    textAlign: "start",
    fontFamily: "Inter",
    fontSize: "18px",
    fontWeight: "normal",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  slideIn: {
    animation: `$slideIn 0.75s ease-out  forwards`,
  },

  "@keyframes slideIn": {
    "0%": {
      opacity: 1,
      transform: "translateX(100%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateX(0%)",
    },
  },
  chartImage: {
    width: 500,
    height: 400,
    objectFit: "contain",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
    },
  },
  cardHeading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "start",
    },
  },
}));

export default function InfoSection() {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      title: "NASSCOM",
      date: "1 day ago",
      description:
        "Nasscom forecasts 1 million new jobs in Cyber security by 2027; 30% jobs unfilled due to lack of skilled talent",
      image: image1,
    },
    {
      title: "Forbes",
      date: "1 day ago",
      description:
        "Nearly 4 Million Cybersecurity Jobs Are Vacant: Here’s Why You Should Consider Breaking Into This Sector",
      image: image2,
    },
    {
      title: "BBC",
      date: "1 day ago",
      description:
        "Cyber-security: Employers look outside the industry for new staff",
      image: image3,
    },
    {
      title: "UKTN",
      date: "2 days ago",
      description: "Why job seekers are pivoting to cybersecurity roles?",
      image: image4,
    },
    {
      title: "BWPeople",
      date: "3 days ago",
      description: "14% Increase In Cybersecurity Jobs In 2024: Report",
      image: image5,
    },
    {
      title: "Business Standard",
      date: "3 days ago",
      description:
        "Cybersecurity Jobs In India Jump 14% Over Past Year, Bengaluru Tops List: Report",
      image: image6,
    },
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index * 2);
  };

  return (
    <div className={classes.section}>
      <Typography variant="h4" className={classes.title}>
        Still Wondering If This Is For You?
      </Typography>
      <Typography variant="subtitle1" className={classes.subtitle}>
        Ask yourself, what’s holding you back from a career in one of the most
        in-demand professions today?
      </Typography>

      <div className={classes.chart}>
        <Box>
          <img
            src={chart}
            alt="Chart"
            className={classes.chartImage}
            width={500}
            height={400}
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box>
          <p className={classes.paragraph}>
            Cyber Security Jobs growing at 32%, faster than any other industry!
          </p>
          <p className={classes.paragraph} style={{ width: "80%" }}>
            Source:U.S. Bureau of Labor Statistics, Employment Projections
            program.
          </p>
        </Box>
      </div>

      <Grid container spacing={2} justifyContent="center">
        {[activeIndex, activeIndex + 1].map(
          (cardIndex) =>
            cardIndex < cards.length && (
              <Grid item xs={12} md={6} key={cardIndex}>
                <Card className={`${classes.card} ${classes.slideIn}`}>
                  <Box className={classes.cardContent}>
                    <Box className={classes.cardHeading}>
                      <Typography variant="body2" className={classes.cardTitle}>
                        {cards[cardIndex].title}
                      </Typography>
                      <Typography variant="body2" className={classes.cardDate}>
                        {cards[cardIndex].date}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      className={classes.cardDescription}
                    >
                      {cards[cardIndex].description}
                    </Typography>
                  </Box>
                  <img
                    className={classes.cardMedia}
                    src={cards[cardIndex].image}
                    title="Cybersecurity Image"
                    alt="Cybersecurity"
                  />
                </Card>
              </Grid>
            )
        )}
      </Grid>

      <div className={classes.dotContainer}>
        {Array.from({ length: Math.ceil(cards.length / 2) }, (_, index) => (
          <IconButton
            key={index}
            onClick={() => handleDotClick(index)}
            className={`${classes.dot} ${
              activeIndex === index * 2 && classes.activeDot
            }`}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        ))}
      </div>
    </div>
  );
}
