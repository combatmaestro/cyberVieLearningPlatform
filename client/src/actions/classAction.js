import axios from 'axios';
import {
  SCHEDULE_CLASS_REQUEST,
  SCHEDULE_CLASS_SUCCESS,
  SCHEDULE_CLASS_FAILURE
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
