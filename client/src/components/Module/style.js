import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#EBF3FF',
    paddingTop: '21px',
    marginTop: 8,
    minHeight: 'calc(100vh - 90px)',

    '& .moduleHeader': {
      fontSize: 27,
      lineHeight: '32px',
      letterSpacing: '0.04em',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      textAlign: 'center',

      [theme.breakpoints.down(469)]: {
        fontSize: 20,
        lineHeight: '24px',
      },
    },
  },
  accordionContainer: {
    width: '100%',
    padding: '21px 45px',
    boxSizing: 'border-box',

    [theme.breakpoints.down(469)]: {
      padding: '21px 30px',
    },

    '& .accordionStyles': {
      marginBottom: 12,
    },
  },
}))
