import axios from 'axios';
import {
  SCHEDULE_CLASS_REQUEST,
  SCHEDULE_CLASS_SUCCESS,
  SCHEDULE_CLASS_FAILURE,
  GET_CLASSES_REQUEST,
  GET_CLASSES_SUCCESS,
  GET_CLASSES_FAILURE
} from '../constants/classess';
const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app"
export const scheduleClass = (batchId, teacherId,teacherName, time) => async (dispatch) => {
  try {
    dispatch({ type: SCHEDULE_CLASS_REQUEST });

    const { data } = await axios.post(`${backendUrl}/class/admin/scheduleclass`, {
      batchId,
      teacherName,
      teacherId,
      time
    });

    dispatch({
      type: SCHEDULE_CLASS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_CLASS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
export const getClassesRequest = () => ({
  type: GET_CLASSES_REQUEST,
});

export const getClassesSuccess = (data) => ({
  type: GET_CLASSES_SUCCESS,
  payload: data,
});

export const getClassesFailure = (error) => ({
  type: GET_CLASSES_FAILURE,
  payload: error,
});

export const fetchClasses = () => {
  return async (dispatch) => {
    dispatch(getClassesRequest());
    try {
      const {data} = await axios.get(`${backendUrl}/class/admin/getAll`); // Replace with your API endpoint
      console.log(data.data);
      dispatch(getClassesSuccess(data.data));
    } catch (error) {
      dispatch(getClassesFailure(error.message));
    }
  };
};