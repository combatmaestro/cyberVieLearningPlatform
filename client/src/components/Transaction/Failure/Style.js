import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    textAlign: 'center',
    [theme.breakpoints.down(468)]: {
      padding: '60px 5px',
    },

    '& .statusmessage': {
      fontFamily: 'Montserrat',
      fontSize: 30,
      fontWeight: 700,
      lineHeight: '37px',
    },

    '& .paymentFailed': {
      marginTop: 34,
      color: '#EA3535',
      fontFamily: 'Montserrat',
      fontSize: 20,
      fontWeight: 700,
      lineHeight: '24px',
    },

    '& .MuiButton-root': {
      marginTop: 37,
      background: '#EA3535',
      borderRadius: 30,
      color: 'white',
      textTransform: 'capitalize',
    },
  },
}))
