// reducers/formDataReducer.js
import {
    SAVE_FORM_DATA_REQUEST,
    SAVE_FORM_DATA_SUCCESS,
    SAVE_FORM_DATA_FAILURE,
    GET_ALL_FORM_DATA_REQUEST,
    GET_ALL_FORM_DATA_SUCCESS,
    GET_ALL_FORM_DATA_FAILURE,
  } from '../constants/leadManagementConstants';
  
  const initialState = {
    formData: null,
    allFormData: [],
    loading: false,
    error: null,
  };
  
  export const formDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case SAVE_FORM_DATA_REQUEST:
      case GET_ALL_FORM_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SAVE_FORM_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          formData: action.payload.data,
        };
      case GET_ALL_FORM_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          allFormData: action.payload.data,
        };
      case SAVE_FORM_DATA_FAILURE:
      case GET_ALL_FORM_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  