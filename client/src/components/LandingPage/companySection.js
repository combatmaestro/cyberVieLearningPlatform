import React from 'react';
import { makeStyles, createMuiTheme, } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Google from './images/Google.png';
import Amazon from './images/Amazon.png';
import Intel from './images/Intel.png';
import Tcs from './images/Tcs.png';
import Wipro from './images/Wipro.png';
import PayPal from './images/Paypal.png';
import Adobe from './images/Adobe.png';
import Microsoft from './images/Microsoft.png';

const theme = createMuiTheme({
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f5f5f5',
    padding: '30px 0',
    overflow: 'hidden',
    position: 'relative',
    textAlign: 'center',
  },
  heading: {
    fontSize: '35px',
    marginBottom: '3px',  
    fontWeight: 'bold',
    color: '#0A2734',
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize: '25px',
    }
  },
  description: {
    fontSize: '18px',
    marginBottom: '20px',
    marginTop: '0',
    color: '#0A2734',
    fontFamily: "Inter",
    [theme.breakpoints.down("sm")]: {
      fontSize: '15px',
      marginTop: '10px',

    }
  },
  logos: {
    display: 'flex',
    marginBlock: '40px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    [theme.breakpoints.down("sm")]: {
      flexWrap:"wrap"
    },
    
  },
  logoItems: {
    display: 'inline-flex',
    animation: `$scroll 20s linear infinite`,
    animationDirection: 'normal',
    '&:hover': {
    animationPlayState: 'paused',
}
  },
  logo: {
    width:160,
    height: 90,
    margin: '0 15px',
    objectFit: 'contain',
    [theme.breakpoints.down("sm")]: {
      width:100,
      height: 55,
      margin: '0 10px',
    }
  },
  '@keyframes scroll': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
  
  
}));

const CompanySection = () => {
  const classes = useStyles();
  const logos = [
    Google, Amazon, Intel, Tcs, Wipro, PayPal,Adobe, Microsoft,
    Google, Amazon, Intel, Tcs, Wipro, PayPal,Adobe, Microsoft,
  ];

  return (
    <Box className={classes.container}>
      <h2 className={classes.heading}>Your Dream Job is Closer Than You Think</h2>
      <p className={classes.description}>
        Our graduates go on to join Industry Giants like
      </p>
      <div className={classes.logos}>
        <div className={classes.logoItems}>
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt={`Logo ${index}`} className={classes.logo} />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default CompanySection;
