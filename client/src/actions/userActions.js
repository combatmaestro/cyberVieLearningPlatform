import axios from 'axios';
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
} from '../constants/userConstants';

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.authorization; // avoid 'Bearer null'
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// keep your backend URL as-is
const backendUrl = 'https://cyber-vie-learning-platform-client-ten.vercel.app';

// ---- Sign in (Google) ----
const userGoogleLoginRequest = () => ({ type: USER_SIGNIN_REQUEST });
const userGoogleLoginSuccess = (data) => ({ type: USER_SIGNIN_SUCCESS, payload: data.data });
const userGoogleLoginFailure = (error) => ({ type: USER_SIGNIN_FAILURE, payload: error });

export const userGoogleLogin = (info) => async (dispatch) => {
  dispatch(userGoogleLoginRequest());
  try {
    const { data } = await axios({
      method: 'POST',
      url: `${backendUrl}/user/authenticate`,
      data: { token: info.credential },
      timeout: 15000,
      //withCredentials: true,
    });
    localStorage.setItem('token', data.token);
    dispatch(userGoogleLoginSuccess(data));
  } catch (error) {
    dispatch(userGoogleLoginFailure(
      (error.response && error.response.data.message) ? error.response.data.message : error.message
    ));
  }
};

// ---- Refresh ----
const userRefreshRequest = () => ({ type: USER_REFRESH_REQUEST });
const userRefreshSuccess = (data) => ({ type: USER_REFRESH_SUCCESS, payload: data.data });
const userRefreshFailure = (error) => ({ type: USER_REFRESH_FAILURE, payload: error });

export const userRefresh = () => async (dispatch) => {
  dispatch(userRefreshRequest());
  try {
    const { data } = await axios.get(`${backendUrl}/user/getDetails`, {
      timeout: 15000,          // prevents infinite pending
      //withCredentials: true,   // if your API sets cookies
    });
    dispatch(userRefreshSuccess(data));
  } catch (error) {
    const msg = (error.response && error.response.data?.message) ? error.response.data.message : error.message;
    dispatch(userRefreshFailure(msg));
  }
};

// ---- Sign out ----
export const userSignout = () => async (dispatch) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${backendUrl}/user/signout`,
      timeout: 15000,
      //withCredentials: true,
    });
    localStorage.removeItem('token');
    dispatch({ type: USER_SIGNOUT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_SIGNOUT_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ---- Update user ----
export const updateUser = (info) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    const { data } = await axios.put(`${backendUrl}/user/update`, info, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000,
      //withCredentials: true,
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

// ---- Leaderboard ----
export const getLeaderBoard = (page, search) => async (dispatch) => {
  dispatch({ type: LEADERBOARD_REQUEST });
  try {
    const { data } = await axios.post(`${backendUrl}/user/leaderboard`, { page, search }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000,
      //withCredentials: true,
    });
    dispatch({ type: LEADERBOARD_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LEADERBOARD_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// ---- Admin users ----
export const adminGetAllUsers = () => async (dispatch) => {
  dispatch({ type: ALL_USERS_REQUEST });
  try {
    const res = await axios.get(`${backendUrl}/user/admin/allUsers`, {
      timeout: 20000,
      //withCredentials: true,
    });
    dispatch({ type: ALL_USERS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const adminGetAllTeachers = () => async (dispatch) => {
  dispatch({ type: ALL_TEACHERS_REQUEST });
  try {
    const res = await axios.get(`${backendUrl}/user/admin/getTeachers`, {
      timeout: 20000,
      //withCredentials: true,
    });
    dispatch({ type: ALL_TEACHERS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: ALL_TEACHERS_FAILURE, payload: error.response?.data?.message || error.message });
  }
};

export const editCertainUser = (id, data) => async (dispatch) => {
  dispatch({ type: EDIT_USER_REQUEST });
  try {
    const res = await axios.post(`${backendUrl}/user/admin/editUser?id=${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000,
      //withCredentials: true,
    });
    dispatch({ type: EDIT_USER_SUCCESS, payload: res.data.data });
    return { success: true };
  } catch (error) {
    dispatch({ type: EDIT_USER_FAILURE, payload: error.response?.data?.message || error.message });
    return { success: false };
  }
};
