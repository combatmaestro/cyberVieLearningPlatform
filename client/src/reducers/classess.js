import {
    SCHEDULE_CLASS_REQUEST,
    SCHEDULE_CLASS_SUCCESS,
    SCHEDULE_CLASS_FAILURE,
    GET_CLASSES_REQUEST,
    GET_CLASSES_SUCCESS,
    GET_CLASSES_FAILURE
  } from '../constants/classess';
  
  const initialState = {
    loading: false,
    data: null,
    error: null
  };
  
  export const scheduleClassReducer = (state = initialState, action) => {
    switch (action.type) {
      case SCHEDULE_CLASS_REQUEST:
        return { ...state, loading: true };
      case SCHEDULE_CLASS_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case SCHEDULE_CLASS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  

  export const getClassesReducer = (state = {
    loading: false,
    classData: [],
    error: null
  }, action) => {
    switch (action.type) {
      case GET_CLASSES_REQUEST:
        return { ...state, loading: true };
      case GET_CLASSES_SUCCESS:
        return { ...state, loading: false, classData: action.payload };
      case GET_CLASSES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };