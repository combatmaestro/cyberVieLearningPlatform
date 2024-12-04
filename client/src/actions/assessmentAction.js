import axios from "axios";
import {
  ADD_ASSESSMENT_REQUEST,
  ADD_ASSESSMENT_SUCCESS,
  ADD_ASSESSMENT_FAILURE,
  GET_ASSESSMENT_QUESTIONS_REQUEST,
  GET_ASSESSMENT_QUESTIONS_SUCCESS,
  GET_ASSESSMENT_QUESTIONS_FAILURE,
  ASSESSMENT_REVIEW_REQUEST,
  ASSESSMENT_REVIEW_SUCCESS,
  ASSESSMENT_REVIEW_FAILURE,
  GET_ASSESSMENTS_TO_REVIEW_REQUEST,
  GET_ASSESSMENTS_TO_REVIEW_SUCCESS,
  GET_ASSESSMENTS_TO_REVIEW_FAILURE,
  GET_ALL_ASSESSMENTS_REQUEST,
  GET_ALL_ASSESSMENTS_SUCCESS,
  GET_ALL_ASSESSMENTS_FAILURE,
} from "../constants/assessmentConstants";
const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app";
// Action creator for adding an assessment request
export const addAssessmentRequest = () => ({
  type: ADD_ASSESSMENT_REQUEST,
});

// Action creator for adding an assessment success
export const addAssessmentSuccess = (assessment) => ({
  type: ADD_ASSESSMENT_SUCCESS,
  payload: assessment,
});

// Action creator for adding an assessment failure
export const addAssessmentFailure = (error) => ({
  type: ADD_ASSESSMENT_FAILURE,
  payload: error,
});

export const addAssessment = (data) => async (dispatch) => {
  dispatch(addAssessmentRequest());
  try {
    const response = await axios({
      method: "post",
      url: `${backendUrl}/assessment/admin/save`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(addAssessmentSuccess(response.data.data));
    return { status: 200, data: response.data.data };
  } catch (error) {
    dispatch(addAssessmentFailure(error.message));
    return { status: error.response?.status || 500, error: error.message };
  }
};

export const getAssessmentQuestionsRequest = () => ({
  type: GET_ASSESSMENT_QUESTIONS_REQUEST,
});

// Action creator for getting assessment questions success
export const getAssessmentQuestionsSuccess = (questions) => ({
  type: GET_ASSESSMENT_QUESTIONS_SUCCESS,
  payload: questions,
});

// Action creator for getting assessment questions failure
export const getAssessmentQuestionsFailure = (error) => ({
  type: GET_ASSESSMENT_QUESTIONS_FAILURE,
  payload: error,
});

export const getAssessmentQuestions = (moduleId) => async (dispatch) => {
  dispatch(getAssessmentQuestionsRequest());
  try {
    const response = await axios({
      method: "get",
      url: `/assessment/module/${moduleId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(getAssessmentQuestionsSuccess(response.data.data));
    return { status: 200, data: response.data.data };
  } catch (error) {
    dispatch(getAssessmentQuestionsFailure(error.message));
    return { status: error.response?.status || 500, error: error.message };
  }
};

export const submitAssessmentReview =
  (assessmentReview) => async (dispatch) => {
    try {
      dispatch({ type: ASSESSMENT_REVIEW_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        // ${backendUrl}
        `/assessment/user/submitAnswers`,
        assessmentReview,
        config
      );

      dispatch({
        type: ASSESSMENT_REVIEW_SUCCESS,
        payload: data,
      });
      return { status: 200, data: data.data };
    } catch (error) {
      dispatch({
        type: ASSESSMENT_REVIEW_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return { status: error.response?.status || 500, error: error.message };
    }
  };

export const getAllAssessmentsToReview = (teacherId) => async (dispatch) => {
  try {
    dispatch({ type: GET_ASSESSMENTS_TO_REVIEW_REQUEST });

    const { data } = await axios.get(
      `/assessment/teacher/review/${teacherId}`
    );

    dispatch({
      type: GET_ASSESSMENTS_TO_REVIEW_SUCCESS,
      payload: data.data,
    });
    return { status: 200, data: data.data };
  } catch (error) {
    dispatch({
      type: GET_ASSESSMENTS_TO_REVIEW_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return { status: error.response?.status || 500, error: error.message };
  }
};

export const getAllAssessments = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ASSESSMENTS_REQUEST });

  try {
    const response = await axios.get(`/assessment/getAll`); // Replace with your actual API endpoint
    dispatch({
      type: GET_ALL_ASSESSMENTS_SUCCESS,
      payload: response.data.data, // Adjust based on the actual structure of your response
    });
    return { status: 200, data: response.data.data };
  } catch (error) {
    dispatch({
      type: GET_ALL_ASSESSMENTS_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
    return { status: error.response?.status || 500, error: error.message };
  }
};
