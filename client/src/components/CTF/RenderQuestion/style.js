import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  ctf: {
    marginTop: 24,
    display: 'flex',
    flexDirection: 'column',

    '& .ctfQuestion': {
      marginBottom: 24,
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '17px',
      letterSpacing: '0.04em',

      [theme.breakpoints.down(469)]: {
        marginBottom: 16,
      },
    },

    '& .MuiTextField-root ': {
      width: '100%',
      maxWidth: 875,

      '& .MuiOutlinedInput-root': {
        height: 47,
        // width: '100%',
        // maxWidth: 645,
        boxShadow: '-10px -10px 20px #FFFFFF, 10px 10px 20px #B4C1D5',
        borderRadius: 10,
      },

      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline':
        {
          border: '2px solid #66C95D',
        },
    },

    '& .ctfSubmitButton': {
      height: 37,
      width: '100%',
      maxWidth: 180,
      color: 'white',
      textTransform: 'capitalize',
      borderRadius: 18.5,

      [theme.breakpoints.down(469)]: {
        width: 100,
      },
    },
  },
}))
