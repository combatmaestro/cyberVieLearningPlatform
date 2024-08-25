// actions/formDataActions.js
import axios from 'axios';
import {
  SAVE_FORM_DATA_REQUEST,
  SAVE_FORM_DATA_SUCCESS,
  SAVE_FORM_DATA_FAILURE,
  GET_ALL_FORM_DATA_REQUEST,
  GET_ALL_FORM_DATA_SUCCESS,
  GET_ALL_FORM_DATA_FAILURE,
} from '../constants/leadManagementConstants';
const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app";
// Action to save form data
export const saveFormData = (formData) => async (dispatch) => {
  let data;
  try {
    dispatch({ type: SAVE_FORM_DATA_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    data = await axios.post(`${backendUrl}/leads/save-form-data`, formData, config);

    dispatch({
      type: SAVE_FORM_DATA_SUCCESS,
      payload: data,
    });
    return { status: 200, data: data.data };
  } catch (error) {
    dispatch({
      type: SAVE_FORM_DATA_FAILURE,
      payload: data?.message || error.message,
    });
    return { status: 400 , message: data?.message };
  }
};

// Action to get all form data
export const getAllFormData = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FORM_DATA_REQUEST });

    const { data } = await axios.get(`${backendUrl}/leads/get-all-form-data`);

    dispatch({
      type: GET_ALL_FORM_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_FORM_DATA_FAILURE,
      payload: error.response?.data.message || error.message,
    });
  }
};
