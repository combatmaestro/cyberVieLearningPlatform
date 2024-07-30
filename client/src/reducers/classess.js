import {
    SCHEDULE_CLASS_REQUEST,
    SCHEDULE_CLASS_SUCCESS,
    SCHEDULE_CLASS_FAILURE
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
  