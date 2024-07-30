import {
    GET_ASSESSMENTS_TO_REVIEW_REQUEST,
    GET_ASSESSMENTS_TO_REVIEW_SUCCESS,
    GET_ASSESSMENTS_TO_REVIEW_FAILURE
  } from '../constants/assessmentConstants';
  
  const initialState = {
    loading: false,
    assessments: [],
    error: null,
  };
  
  export const assessmentReviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ASSESSMENTS_TO_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_ASSESSMENTS_TO_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          assessments: action.payload,
        };
      case GET_ASSESSMENTS_TO_REVIEW_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  