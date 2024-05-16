import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    maxWidth: 970,
    textAlign: 'center',

    [theme.breakpoints.down(468)]: {
      padding: '30px 5px',
    },

    '& .succesPageHeader': {
      '& .successpaygreet': {
        fontFamily: 'Montserrat',
        fontWeight: 900,
        fontSize: 133,
        lineHeight: '110px',
        color: 'rgba(196, 196, 196, 0.3)',

        [theme.breakpoints.down(1029)]: {
          fontSize: '13vw',
        },
      },

      '& .successImage': {
        marginTop: -300,

        [theme.breakpoints.down(1029)]: {
          marginTop: -50,

          '& img': {
            width: '70%',
          },
        },
      },
    },

    '& .greenText': {
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: 30,
      lineHeight: '37px',
      color: '#66C95D',
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
