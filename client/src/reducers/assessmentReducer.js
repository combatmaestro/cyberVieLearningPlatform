import {
    ADD_ASSESSMENT_REQUEST,
    ADD_ASSESSMENT_SUCCESS,
    ADD_ASSESSMENT_FAILURE,
    GET_ASSESSMENT_QUESTIONS_REQUEST,
    GET_ASSESSMENT_QUESTIONS_SUCCESS,
    GET_ASSESSMENT_QUESTIONS_FAILURE,
  } from '../constants/assessmentConstants';
  
  const initialState = {
    loading: false,
    assessment: null,
    questions: [],
    error: null,
  };
  
  const assessmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ASSESSMENT_REQUEST:
      case GET_ASSESSMENT_QUESTIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case ADD_ASSESSMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          assessment: action.payload,
        };
      case GET_ASSESSMENT_QUESTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          questions: action.payload,
        };
      case ADD_ASSESSMENT_FAILURE:
      case GET_ASSESSMENT_QUESTIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default assessmentReducer;
  