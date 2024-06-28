import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Loader from '../Loader/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { getLeaderBoard } from '../../actions/userActions'
import Pagination from 'react-js-pagination'
import clsx from 'clsx'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Cup from './Cup.svg'
import CupFilled from './CupFilled.svg'


const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    backgroundColor: 'white',
    minHeight: '100vh',
    marginTop: 6,

    [theme.breakpoints.down(330)]: {
      padding: 0,
    },

    '& .pagination': {
      marginTop: 30,
    },

    '& .page-item.active .page-link': {
      backgroundColor: '#00B2FF',
      borderRadius: '50%',
    },

    '& .prevNext': {
      backgroundColor: '#00B2FF',
      margin: '0px 6px',
      borderRadius: '8px',
      width: 80,
      textAlign: 'center',
    },

    '& .colorWhite': {
      color: 'white !important',
    },

    '& .disable': {
      backgroundColor: '#cccccc',
    },
  },

  heading: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 45,

    [theme.breakpoints.down(420)]: {
      fontSize: 35,
    },
  },
  topperContainer: {
    width: '90%',
    marginTop: 120,
    marginBottom: 32,
    [theme.breakpoints.down(420)]: {
      display: 'none',
    },
  },

  tableContainer: {
    width: '70%',
    marginTop: 42,

    [theme.breakpoints.down(420)]: {
      width: '80%',
      marginTop: 12,
    },

    '& .rank1': {
      border: '1px solid #A981FF',
      borderLeft: '8px solid #A981FF',
      borderRadius: '11px',
    },

    '& .rank2': {
      border: '1px solid #1CB703',
      borderLeft: '8px solid #1CB703',
      borderRadius: '11px',
    },

    '& .rank3': {
      border: '1px solid #FF8181',
      borderLeft: '8px solid #FF8181',
      borderRadius: '11px',
    },
  },

  topperBlock: {
    textAlign: 'center',
    margin: '0px 40px',
    alignItems: 'center',
    '& p': {
      margin: '3px 0px',
    },
  },
  variation: {
    marginTop: -74,
  },

  details: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: '27px',
  },

  subDetails: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: '18px',
  },
  topperImage: {
    boxShadow: '0px 0px 56px 2px rgb(0 0 0 / 25%)',
    height: 130,
    width: 130,
    borderRadius: '50%',
  },
  commonWidth: {
    minWidth: 50,
    textAlign: 'center',
  },
  commonPadding: {
    padding: '15px 80px',
    margin: '10px 0px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '17px',
    textTransform: 'capitalize',

    [theme.breakpoints.down(420)]: {
      padding: '15px 18px',
    },
  },
}))

function Leaderboard() {
  document.title = 'Leaderboard'
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { topperData, leaderData, loading, countData, error } = useSelector(
    (state) => state.leaderBoard
  )
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('');
  const { data } = user

  useEffect(() => {
    dispatch(getLeaderBoard(page, search));
  }, [page, search.length>5]);

  const colorClassFinder = (index) => {
    if (page === 1) {
      switch (index) {
        case 1:
          return 'rank1'
          break

        case 2:
          return 'rank2'
          break

        case 3:
          return 'rank3'
          break

        default:
          return ''
      }
    }
  }

  const setCurrentPageNo = (pageNo) => {
    setPage(pageNo)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (loading) {
    return <Loader />
  }

  return (
    <>
     
      <Grid container direction="column" alignItems="center" className={classes.root}>
        <h1 className={classes.heading}>Leaderboard</h1>
        <TextField
        value={search}
        onChange={handleSearchChange}
        label="Search User"
        margin="normal"
        variant="outlined"
        type="search"
      />
        <Box display="flex" flexDirection="row" justifyContent="center" className={classes.topperContainer}>
          {topperData.map((topper, index) => (
            <Box display="flex" flexDirection="column" className={classes.topperBlock} key={index}>
              <div className={classes.topperImage}>
                <img
                  src={topper.avatar.url}
                  alt="profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <p className={classes.details}>{topper.name}</p>
              <p className={classes.subDetails}>{topper.marks}</p>
            </Box>
          ))}
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" className={classes.tableContainer}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" className={classes.commonPadding}>
            <span className={classes.commonWidth}>Rank</span>
            <span className={classes.commonWidth}>Name</span>
            <span className={classes.commonWidth}>Marks</span>
          </Box>
          {leaderData.map((data, index) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              key={data._id}
              className={`${classes.commonPadding} ${colorClassFinder(index + 1)}`}
            >
              <div className={classes.commonWidth}>
                <span>
                  {page === 1 && (index === 0 || index === 1 || index === 2) ? (
                    <img src={CupFilled} style={{ marginRight: 5 }} />
                  ) : (
                    <img src={Cup} style={{ marginRight: 5 }} />
                  )}
                </span>
                <span>{index + 1 + (page - 1) * 10}</span>
              </div>
              <span className={classes.commonWidth}>{data.name}</span>
              <span className={classes.commonWidth}>{data.marks}</span>
            </Box>
          ))}
        </Box>
        <Pagination
          activePage={page}
          pageRangeDisplayed={5}
          itemsCountPerPage={10}
          totalItemsCount={countData}
          onChange={setCurrentPageNo}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          itemClass="page-item"
          linkClass="page-link"
          hideFirstLastPages={true}
          itemClassPrev="prevNext"
          itemClassNext="prevNext"
          linkClassPrev="colorWhite"
          linkClassNext="colorWhite"
          disabledClass="disable"
        />
      </Grid>
    </>
  );
}

export default Leaderboard
