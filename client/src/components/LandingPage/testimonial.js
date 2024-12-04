import React from 'react';
import { Box, Grid, Typography, Avatar, makeStyles, createMuiTheme } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import image1 from './images/profile1.png';
import image2 from './images/profile2.png';
import image3 from './images/profile3.png';
import image4 from './images/profile4.png';


const theme = createMuiTheme({
    typography: {
      fontFamily: "Inter, Arial, sans-serif",
    },
  });


const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: "#F8FBFF",
    padding: "30px 102px",
    [theme.breakpoints.down("sm")]: {
      paddingInline: theme.spacing(3),
    },
  },
  heading: {
    fontSize: "34px",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Inter",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px",
    },
  },
  card: {
    backgroundColor: "#0B1A35",
    color: "#fff",
    padding: "28px",
    borderRadius: "12px",
    // position: "relative",
    height: "100%",
  },
  stars: {
    display: "flex",
    marginBottom: theme.spacing(2),
    "& svg": {
      color: "#FFC107",
    },
  },
  testimonialText: {
    fontSize: "18px",
    lineHeight: "1.8",
    fontFamily: "Inter",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
  authorBox: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    position: "relative",
    top: "0px",
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: "40px",
    height: "40px",
  },
  authorName: {
    fontWeight: "bold",
    fontSize: "16px",
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));

const TestimonialCard = ({ text, author, image }) => {
  const classes = useStyles();
  return (
    <Box className={classes.card} id='testimonials'>
      <Box className={classes.stars}>
        {[...Array(5)].map((_, index) => (
          <StarIcon key={index} />
        ))}
      </Box>
      <Typography className={classes.testimonialText}>
        {text}
      </Typography>
      <Box className={classes.authorBox}>
        <Avatar src={image} alt={author} className={classes.avatar} />
        <Typography className={classes.authorName}>{author}</Typography>
      </Box>
    </Box>
  );
};

const Testimonials = () => {
  const classes = useStyles();

  const testimonials = [
    {
      text: "Cybervie is the best place for anyone looking to change their domain to cybersecurity. Venkat sir takes personal care of each student and makes sure they are getting the best.",
      author: "Varsha Sevakula",
      image: image1,
    },
    {
      text: "I highly recommend Cybervie for anyone looking to gain hands-on experience in cybersecurity. The genuine willingness to help from the team made my time here incredibly productive and enjoyable.",
      author: "Jeevan Reddy",
      image: image2,
    },
    {
      text: "I suggest this is one of the best places where you can learn and enhance your skills. I got a job before completion of my program. Thank you Cybervie. 👍",
      author: "Uttej",
      image: image3,
    },
    {
      text: "If you want to start your career in cybersecurity, this is the place to learn.You’ll be ready to take on roles in top cybersecurity firms and startups alike. Venkatesh sir and his team are very professional.",
      author: "Rama Mohan Reddy Nallamilli",
      image: image4,
    },
  ];

  return (
    <Box className={classes.section}>
      <Typography className={classes.heading}>Testimonials</Typography>
      <Grid container spacing={4}>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <TestimonialCard {...testimonial} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;
