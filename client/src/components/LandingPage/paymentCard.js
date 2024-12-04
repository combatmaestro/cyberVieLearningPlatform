import React from 'react';
import { Grid, Typography, Box, Button, makeStyles, createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import visa from './images/visa.png';
import upi from './images/upi.png';
import liquiloans from './images/liquid.png';
import propelld from './images/propelled.png';
import tick from './images/roundedTick.png';
import { useHistory } from "react-router-dom";


const theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
});

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    padding: '30px 200px',
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(3),
    },
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0A2734',
    fontSize: '34px',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: '26px',
    },
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '18px',
    marginBottom: theme.spacing(4),
    color: '#0A2734',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      marginBottom: theme.spacing(2),
    },
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: theme.spacing(8),
  },
  card: {
    backgroundColor: '#03344A',
    color: '#fff',
    padding: '24px',
    borderRadius: '8px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardVariantTwo: {
    backgroundColor: '#011327',
  },
  price: {
    fontSize: '36px',
    fontWeight: 'bold',
    fontFamily: 'Inter, Arial, sans-serif',
    marginTop: -5,
  },
  oldPrice: {
    color: '#F5F5F5',
    fontFamily: 'Inter, Arial, sans-serif',
    fontSize: '25px',
    opacity: 0.55,
  },
  oldPriceStrike: {
    textDecoration: 'line-through',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    marginTop: theme.spacing(2),
    '& li': {
      marginBottom: theme.spacing(1),
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      gap: theme.spacing(1.5),
      [theme.breakpoints.down('xs')]: {
        fontSize: '11px',
        textAlign: 'left',
      },
      '&::before': {
        content: '""',
        display: 'inline-block',
        width: '22px',
        height: '22px',
        backgroundImage: `url(${tick})`,
        backgroundSize: 'cover',
      },
    },
  },
  registerButtonContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  registerButton: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    borderRadius: '8px',
    padding: theme.spacing(1, 4),
    cursor: 'pointer',
    border: '1px solid #F5F5F5',
    backgroundColor: 'transparent',
    '&:hover': {
      border: '1px solid #269397',
    },
  },
  cardTitle: {
    fontWeight: 'normal',
    fontSize: '22px',
    fontFamily: 'Inter, Arial, sans-serif',
    marginBlock: theme.spacing(1),
  },
  cardSubtitle: {
    fontSize: '14px',
    opacity: 0.7,
    fontFamily: 'Inter, Arial, sans-serif',
    marginBottom: theme.spacing(1),
  },
  paymentMethod: {
    fontSize: '13px',
    opacity: 0.8,
    fontFamily: 'Inter, Arial, sans-serif',
    marginBottom: theme.spacing(1),
  },
  secondButton:{
    border: '2px solid #269397',
    '&:hover': {
      border: '2px solid #074244',
    },
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    marginTop: -20,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(1), 
    },
  },
  logoImage: {
    objectFit: 'contain',
    [theme.breakpoints.down('xs')]: {
      width: '55px',
      height: '55px',
    },
  },
}));

const PaymentCard = ({ title, subtitle, price, oldPrice, features, variant, isSecondButton, paymentMethod }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleRegister = () => {
    setTimeout(() => {
      history.push('/register');
      window.location.reload();
    }); 
  };

  return (
    <Box className={`${classes.card} ${variant === 'two' ? classes.cardVariantTwo : ''}`} id='payment'>
      <Typography variant="h6" className={classes.cardTitle}>{title}</Typography>
      <Typography variant="body2" className={classes.cardSubtitle}>{subtitle}</Typography>
      <Typography variant='caption' className={classes.paymentMethod}>{paymentMethod}</Typography>
      {oldPrice && (
        <Typography className={`${classes.oldPrice} ${variant === 'two' ? classes.oldPriceStrike : ''}`}>
          {oldPrice}
        </Typography>
      )}
      <Typography className={classes.price}>{price}</Typography>
      <div className={classes.registerButtonContainer}>
        {isSecondButton ? (<Button
          className={`${classes.registerButton} ${isSecondButton ? classes.secondButton : ''}`}
          variant="outlined"
          onClick={handleRegister}
        >
          Get 30% off
        </Button>) : (<Button
          className={`${classes.registerButton} ${isSecondButton ? classes.secondButton : ''}`}
          variant="outlined"
          onClick={handleRegister}
        >
          Register
        </Button>)}
        
      </div>
      <ul className={classes.featureList}>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </Box>
  );
};

const PaymentOptions = () => {
  const classes = useStyles();

  const features = [
    'Access to live classes with recordings',
    'Resume preparation',
    'Profile validation',
    '1:1 counseling sessions with a dedicated counselor',
    'Portal access for additional resources and tools',
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.section}>
        <Typography variant="h4" className={classes.title}>Payment Options</Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Choose a plan that’s right for you
        </Typography>

        <div className={classes.logoWrapper}>
      <img src={upi} alt="UPI" width={67} height={26} className={classes.logoImage} />
      <img src={visa} alt="Visa" width={47} height={30} className={classes.logoImage} />
      <img src={propelld} alt="Propelld" width={74} height={18} className={classes.logoImage} />
      <img src={liquiloans} alt="LiquiLoans" width={116} height={13} className={classes.logoImage} />
    </div>

        <Grid container spacing={4} className={classes.cardContainer}>
          <Grid item xs={12} md={4}>
            <PaymentCard
              title="Total Course Fee"
              subtitle="Overall Course fee of CSEP course for this current year."
              paymentMethod ="Monthly EMI (details to be customized based on tenure)"
              oldPrice="Full Price"
              price="$1,539"
              features={features}
              variant="one"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentCard
              title="Limited Time Offer"
              subtitle="Ideal for individuals who want to save $473. Popular among 90% of our students."
              paymentMethod = "One time payment"
              oldPrice="$1,539"
              price="$1,066"
              features={features}
              variant="two"
              isSecondButton
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentCard
              title="Flexible Payment"
              subtitle="Ideal for individuals who want to pay in 2 instalments with first payment up front."
              paymentMethod = "Two Installments"
              oldPrice="$769 + $769"
              price="$1,539"
              features={features}
              variant="one"
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentOptions;
