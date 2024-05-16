import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: `calc(100vh - 67px)`,
    backgroundColor: '#161616',
    overflow: 'hidden',

    [theme.breakpoints.down(1201)]: {
      justifyContent: 'center',
      alignItems: 'unset',
      flexDirection: 'column',
      height: 'auto',
    },

    [theme.breakpoints.down(469)]: {
      height: '95vh',
      justifyContent: 'flex-start',
    },

    '& .LandingPageInfoContainer': {
      color: 'white',
      position: 'absolute',
      maxWidth: 514,
      left: 80,

      [theme.breakpoints.down(1201)]: {
        marginTop: 64,
        marginLeft: 34,
        position: 'unset',
        maxWidth: 'unset',
      },

      '& .LPGreeting': {
        fontFamily: 'Noto Sans JP',
        fontSize: 39,
        lineHeight: '57px',
        fontWeight: 500,

        [theme.breakpoints.down(469)]: {
          fontSize: 22,
          lineHeight: '32px',
        },
      },

      '& .LPHeader': {
        width: 499,
        fontSize: 74,
        lineHeight: '91px',
        fontWeight: 700,
        fontFamily: 'Montserrat',

        [theme.breakpoints.down(469)]: {
          fontSize: 42,
          lineHeight: '51px',
        },
      },

      '& .LPDescription': {
        marginTop: 13,
        maxWidth: 514,
        fontSize: 26,
        lineHeight: '32px',
        fontWeight: 500,
        fontFamily: 'Montserrat',

        [theme.breakpoints.down(361)]: {
          fontSize: 14,
          lineHeight: '17px',
        },
      },
    },

    '& .rootGroupContainer': {
      position: 'relative',

      [theme.breakpoints.down(1201)]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },

      [theme.breakpoints.down(769)]: {
        '& > img': {
          height: 560,
        },
      },

      [theme.breakpoints.down(469)]: {
        '& > img': {
          height: 380,
          transform: 'scale(1.3)',
        },
      },

      '& .rootLaptopContainer': {
        position: 'absolute',
        top: 205,
        right: 130,

        [theme.breakpoints.down(769)]: {
          top: 135,
          right: 90,
        },

        [theme.breakpoints.down(469)]: {
          top: 96,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
        },

        '& img': {
          width: 646,

          [theme.breakpoints.down(769)]: {
            width: 430,
          },

          [theme.breakpoints.down(469)]: {
            width: 292,
          },
        },
      },
    },
  },

  GoogleLogin: {
    width: 303,
    height: 62,
    border: '2px solid #00F1F2',
    boxSizing: 'border-box',
    borderRadius: '20px',
    background: 'transparent',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Noto Sans JP',
    fontSize: 21.19,
    lineHeight: '30px',

    [theme.breakpoints.down(361)]: {
      height: 35,
      width: 171,
      fontSize: 11,
      lineHeight: '17px',
      borderRadius: 11,

      '& img': {
        height: '16px !important',
      },
    },
  },
  buttonContainer: {
    marginTop: 16,
    position: 'relative',
    zIndex: 500,
  },
}))
