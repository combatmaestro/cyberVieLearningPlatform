import {
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_REFRESH_FAILURE,
  USER_REFRESH_REQUEST,
  USER_REFRESH_SUCCESS,
  USER_SIGNOUT_SUCCESS,
  USER_SIGNOUT_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  LEADERBOARD_REQUEST,
  LEADERBOARD_SUCCESS,
  LEADERBOARD_FAILURE,
  CLEAR_ERRORS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from '../constants/userConstants'

const initialState = {
  loading: true,
  data: '',
  error: '',
  isAuthenticated: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
    case USER_REFRESH_REQUEST: {
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      }
    }

    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case USER_UPDATE_SUCCESS:
    case USER_SIGNIN_SUCCESS:
    case USER_REFRESH_SUCCESS: {
      return {
        loading: false,
        data: action.payload,
        isAuthenticated: true,
        error: '',
      }
    }

    case USER_SIGNIN_FAILURE:
    case USER_REFRESH_FAILURE: {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      }
    }

    case USER_UPDATE_FAILURE: {
      return {
        ...state,
        error: action.payload,
      }
    }

    case USER_SIGNOUT_SUCCESS:
      return {
        data: null,
        loading: false,
        isAuthenticated: false,
        error: null,
      }

    case USER_SIGNOUT_FAILURE:
      return {
        data: null,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      }
    }

    default:
      return state
  }
}

export const leaderBoardReducer = (
  state = {
    loading: true,
    topperData: [],
    leaderData: [],
    total: '',
    error: '',
  },
  action
) => {
  switch (action.type) {
    case LEADERBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case LEADERBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        topperData: action.payload.topperList,
        countData: action.payload.total,
        leaderData: action.payload.userList,
      }

    case LEADERBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const getAllUsersReducer = (
  state = {
    loading: true,
    allUsersData: '',
    error: '',
  },
  action
) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
    case EDIT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case ALL_USERS_SUCCESS:
      return {
        loading: false,
        allUsersData: action.payload,
        error: '',
      }

    case EDIT_USER_SUCCESS:
      return {
        loading: false,
        allUsersData: state.allUsersData.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        error: '',
      }

    case ALL_USERS_FAILURE:
    case EDIT_USER_FAILURE:
      return {
        loading: false,
        allUsersData: '',
        error: action.payload,
      }

    default:
      return state
  }
}
