// src/reducers/labReducer.js

import {
    GET_LAB_REQUEST,
    GET_LAB_SUCCESS,
    GET_LAB_FAILURE,
    ADD_LAB_REQUEST,
    ADD_LAB_SUCCESS,
    ADD_LAB_FAILURE,
    CREATE_LAB_REQUEST,
    CREATE_LAB_SUCCESS,
    CREATE_LAB_FAILURE,
    START_LAB_REQUEST,
    START_LAB_SUCCESS,
    START_LAB_FAILURE,
    STOP_LAB_SUCCESS,
    STOP_LAB_FAILURE,
  } from "../constants/labConstants";
  
  const initialState = {
    loading: false,
    labs: [],
    error: null,
    labCreated: false,
    labData: null,
    labUrl: "",
  };
  
  export const labReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_LAB_REQUEST:
      case ADD_LAB_REQUEST:
      case CREATE_LAB_REQUEST:
      case START_LAB_REQUEST:
        return { ...state, loading: true };
      
      case GET_LAB_SUCCESS:
      case ADD_LAB_SUCCESS:
      case STOP_LAB_SUCCESS:
        return { ...state, loading: false, labData: action.payload };
  
      case CREATE_LAB_SUCCESS:
        return { ...state, loading: false, labCreated: true, labData: action.payload };
  
      case START_LAB_SUCCESS:
        return { ...state, loading: false, labData: action.payload };
  
      case GET_LAB_FAILURE:
      case ADD_LAB_FAILURE:
      case CREATE_LAB_FAILURE:
      case START_LAB_FAILURE:
      case STOP_LAB_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  