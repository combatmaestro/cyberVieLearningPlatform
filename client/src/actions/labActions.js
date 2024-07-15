// src/actions/labActions.js

import axios from "axios";
import {
  GET_LAB_REQUEST,
  GET_LAB_SUCCESS,
  GET_LAB_FAILURE,
  ADD_LAB_REQUEST,
  ADD_LAB_SUCCESS,
  ADD_LAB_FAILURE,
  CREATE_LAB_REQUEST,
  CREATE_LAB_SUCCESS,
  CREATE_LAB_FAILURE,
  START_LAB_REQUEST,
  START_LAB_SUCCESS,
  START_LAB_FAILURE,
  STOP_LAB_FAILURE,
  STOP_LAB_SUCCESS
} from "../constants/labConstants";

// Get Lab actions
export const getLabRequest = () => ({
  type: GET_LAB_REQUEST,
});

export const getLabSuccess = (labs) => ({
  type: GET_LAB_SUCCESS,
  payload: labs,
});

export const getLabFailure = (error) => ({
  type: GET_LAB_FAILURE,
  payload: error,
});

// Add Lab actions
export const addLabRequest = () => ({
  type: ADD_LAB_REQUEST,
});

export const addLabSuccess = (lab) => ({
  type: ADD_LAB_SUCCESS,
  payload: lab,
});

export const addLabFailure = (error) => ({
  type: ADD_LAB_FAILURE,
  payload: error,
});

// Create Lab actions
export const createLabRequest = () => ({
  type: CREATE_LAB_REQUEST,
});

export const createLabSuccess = (labData) => ({
  type: CREATE_LAB_SUCCESS,
  payload: labData,
});

export const createLabFailure = (error) => ({
  type: CREATE_LAB_FAILURE,
  payload: error,
});

// Start Lab actions
export const startLabRequest = () => ({
  type: START_LAB_REQUEST,
});

export const startLabSuccess = (labUrl) => ({
  type: START_LAB_SUCCESS,
  payload: labUrl,
});

export const startLabFailure = (error) => ({
  type: START_LAB_FAILURE,
  payload: error,
});
export const fetchLabs = () => async (dispatch) => {
  dispatch(getLabRequest());

  try {
    const { data } = await axios({
      method: "GET",
      url: `/lab/adminRequest`,
    });
    dispatch(getLabSuccess(data.data));
  } catch (error) {
    dispatch(getLabFailure(error.response.data.message));
  }
};
export const stopLab = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/lab/stopLab?email=${email}`);
    dispatch(stopLabSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(stopLabFailure(error.response.data.message));
  }
};

// Define success and failure actions
const stopLabSuccess = (data) => ({
  type: STOP_LAB_SUCCESS,
  payload: data,
});

const stopLabFailure = (error) => ({
  type: STOP_LAB_FAILURE,
  payload: error,
});

// Async action to create a lab
export const createLab = (email) => async (dispatch) => {
  dispatch(createLabRequest());
  try {
    const { data } = await axios.get(`/lab/createLab?email=${email}`);
    dispatch(createLabSuccess(data.data));
  } catch (error) {
    dispatch(createLabFailure(error.response.data.message));
  }
};

// Async action to start a lab
export const startLab = (email) => async (dispatch) => {
  dispatch(startLabRequest());
  try {
    const { data } = await axios.get(`/lab/startLab?email=${email}`);
    dispatch(startLabSuccess(data.labData));
  } catch (error) {
    dispatch(startLabFailure(error.response.data.message));
  }
};
