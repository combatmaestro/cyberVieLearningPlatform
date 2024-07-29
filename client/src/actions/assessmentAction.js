import axios from "axios";
import {
  ADD_ASSESSMENT_REQUEST,
  ADD_ASSESSMENT_SUCCESS,
  ADD_ASSESSMENT_FAILURE,
  GET_ASSESSMENT_QUESTIONS_REQUEST,
  GET_ASSESSMENT_QUESTIONS_SUCCESS,
  GET_ASSESSMENT_QUESTIONS_FAILURE,
} from "../constants/assessmentConstants";

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
      url: `/assessment/admin/save`,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data);
    dispatch(addAssessmentSuccess(response.data.data));
  } catch (error) {
    console.log(error);
    dispatch(addAssessmentFailure(error.message));
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
        method: 'get',
        url: `/assessment/module/${moduleId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(getAssessmentQuestionsSuccess(response.data.data));
    } catch (error) {
      dispatch(getAssessmentQuestionsFailure(error.message));
    }
  };