import axios from 'axios'
import {
  USER_REFRESH_FAILURE,
  USER_REFRESH_REQUEST,
  USER_REFRESH_SUCCESS,
  USER_SIGNIN_FAILURE,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
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
  ALL_TEACHERS_REQUEST,
  ALL_TEACHERS_SUCCESS,
  ALL_TEACHERS_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from '../constants/userConstants'


axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app"
const userGoogleLoginRequest = () => {
  return {
    type: USER_SIGNIN_REQUEST,
  }
}

const userGoogleLoginSuccess = (data) => {
  return {
    type: USER_SIGNIN_SUCCESS,
    payload: data.data,
  }
}

const userGoogleLoginFailure = (error) => {
  return {
    type: USER_SIGNIN_FAILURE,
    payload: error,
  }
}

export const userGoogleLogin = (info) => async (dispatch) => {
  dispatch(userGoogleLoginRequest())

  try {
    const { data } = await axios({
      method: 'POST',
      url: `${backendUrl}/user/authenticate`,
      data: {
        token: info.credential,
      },
    })
    console.log(data.token)
    localStorage.setItem("token",data.token);
    dispatch(userGoogleLoginSuccess(data))
  } catch (error) {
    dispatch(
      userGoogleLoginFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

const userRefreshRequest = () => {
  return {
    type: USER_REFRESH_REQUEST,
  }
}

const userRefreshSuccess = (data) => {
  return {
    type: USER_REFRESH_SUCCESS,
    payload: data.data,
  }
}

const userRefreshFailure = (error) => {
  return {
    type: USER_REFRESH_FAILURE,
    payload: error,
  }
}

export const userRefresh = () => async (dispatch) => {
  dispatch(userRefreshRequest())

  try {
    const { data } = await axios({
      method: 'GET',
      url: `${backendUrl}/user/getDetails`,
    })

    dispatch(userRefreshSuccess(data))
  } catch (error) {
    dispatch(
      userRefreshFailure(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const userSignout = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${backendUrl}/user/signout`,
    })
    localStorage.removeItem("token");
    dispatch({
      type: USER_SIGNOUT_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: USER_SIGNOUT_FAILURE,
      payload: error.response.data.message,
    })
  }
}

export const updateUser = (info) => async (dispatch) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  })


  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(`${backendUrl}/user/update`, info, config)
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload: error.response.data.message,
    })
  }
}

export const getLeaderBoard = (page,search) => async (dispatch) => {
  dispatch({
    type: LEADERBOARD_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`${backendUrl}/user/leaderboard`, { page,search }, config)
    // console.log(data)
    dispatch({
      type: LEADERBOARD_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: LEADERBOARD_FAILURE,
      payload: error.response.data.message,
    })
  }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}

export const adminGetAllUsers = () => async (dispatch) => {
  dispatch({
    type: ALL_USERS_REQUEST,
  })

  try {
    const res = await axios({
      method: 'get',
      url: `${backendUrl}/user/admin/allUsers`,
    })
    // console.log('get all users', res)
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ALL_USERS_FAILURE,
      payload: error,
    })
  }
}

export const adminGetAllTeachers = () => async (dispatch) => {
  dispatch({
    type: ALL_TEACHERS_REQUEST,
  })

  try {
    const res = await axios({
      method: 'get',
      url: `/user/admin/getTeachers`,
    })
    // console.log('get all users', res)
    dispatch({
      type: ALL_TEACHERS_SUCCESS,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ALL_TEACHERS_FAILURE,
      payload: error,
    })
  }
}

export const editCertainUser = (id, data) => async (dispatch) => {
  dispatch({
    type: EDIT_USER_REQUEST,
  })

  try {
    const res = await axios({
      method: 'post',
      url: `${backendUrl}/user/admin/editUser?id=${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    dispatch({
      type: EDIT_USER_SUCCESS,
      payload: res.data.data,
    })

    return {
      success: true,
    }
  } catch (error) {
    console.log(error)
    dispatch({
      type: EDIT_USER_FAILURE,
      payload: error,
    })

    return {
      success: false,
    }
  }
}
