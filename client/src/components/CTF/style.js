import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .ctfHeader': {
      marginTop: 24,
      color: '#9E0E16',
      fontWeight: 'bold',
      fontFamily: 'Montserrat',
      fontSize: 15,
      lineHeight: '18px',
      letterSpacing: '0.04em',
    },
  },
}))
