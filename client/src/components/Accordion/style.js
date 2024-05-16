import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    '& .MuiPaper-elevation1': {
      boxShadow: 'unset',
    },

    '& .MuiPaper-root': {
      backgroundColor: '#EBF3FF',

      '& .Mui-expanded': {
        backgroundColor: 'rgba(10, 25, 49, 0.9)',
        filter: 'drop-shadow(12px 12px 24px rgba(0, 0, 0, 0.25))',
      },

      '& .MuiCollapse-container': {
        boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
      },

      '& .MuiAccordionDetails-root': {
        padding: 35,
      },
    },

    '& .MuiAccordionSummary-root ': {
      backgroundColor: '#005387',
      borderRadius: 10,
      height: 46,
      boxSizing: 'border-box',
      paddingLeft: 34,

      '& > .MuiAccordionSummary-content': {
        alignItems: 'center',

        '& .CircularProgressbar .CircularProgressbar-path': {
          stroke: '#66C95D',
        },

        '& .CircularProgressbar-text': {
          fontSize: 25,
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          letterSpacing: '0.04em',
        },
      },

      '& .MuiIconButton-label': {
        color: 'white',
      },
    },

    '& .MuiAccordion-rounded': {
      borderRadius: 10,
    },

    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  },

  heading: {
    fontSize: 18,
    marginRight: 25,
    lineHeight: '22px',
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },

  secondaryHeading: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    lineHeight: '18px',

    [theme.breakpoints.down(469)]: {
      fontSize: 13,
      lineHeight: '15px',
    },
  },

  content: {
    '& iframe': {
      minHeight: 400,
    },

    '& figure': {
      padding: '10px !important',
      width: 200,
    },

    [theme.breakpoints.down(1101)]: {
      '& figure': {
        height: '100% !important',
        width: '100% !important',
      },

      '& iframe': {
        height: '100% !important',
        width: '100% !important',
        minHeight: 400,
      },
    },

    [theme.breakpoints.down(769)]: {
      '& figure': {
        width: '100% !important',
        height: '100% !important',
      },

      '& img': {
        width: '100% !important',
        height: '100% !important',
      },

      '& a': {
        wordBreak: 'break-word',
      },
    },
  },

  circularProgress: {
    height: 32,
    minHeight: 29,
    width: 32,
    minWidth: 29,
    marginLeft: 'auto',
  },
}))
