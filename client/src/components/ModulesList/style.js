import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridColumnGap: 33,
    gridRowGap: 42,

    [theme.breakpoints.down(1220)]: {
      gridTemplateColumns: 'auto auto',
    },

    [theme.breakpoints.down(731)]: {
      gridTemplateColumns: 'auto',
      justifyContent: 'center',
    },

    [theme.breakpoints.down(361)]: {
      gridRowGap: 24,
    },
  },

  module: {
    width: 359,
    height: 225,
    boxSizing: 'border-box',
    padding: '36px 26px',
    boxShadow: '0px 8.84527px 17.6905px rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
    position: 'relative',

    [theme.breakpoints.down(830)]: {
      width: 325,
      height: 204,
    },
  },

  titleBold: {
    fontSize: 20.3,
    color: '#000000',
    fontWeight: 'bold',
    maxWidth: 250,
    lineHeight: '28px',
    fontFamily: 'Noto Sans JP',

    [theme.breakpoints.down(830)]: {
      fontSize: 18,
      lineHeight: '25px',
    },
  },

  lockIcon: {
    position: 'absolute',
    height: 45,
    width: 45,
    borderRadius: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 39,
    right: 26,
  },

  description: {
    marginTop: 7,
    lineHeight: '20px',
    fontSize: 15.03,
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 250,
    fontFamily: 'Noto Sans JP',

    [theme.breakpoints.down(830)]: {
      fontSize: 13,
      lineHeight: '18px',
    },
  },

  button: {
    position: 'absolute',
    bottom: 36,
    left: 26,
    right: 26,

    [theme.breakpoints.down(830)]: {
      bottom: 32,
    },

    '& .MuiButton-root': {
      height: 44,
      background: '#255983',
      width: '100%',
      color: 'white',
      textTransform: 'capitalize',
      fontSize: 15,
      fontWeight: 400,
    },
  },
}))
