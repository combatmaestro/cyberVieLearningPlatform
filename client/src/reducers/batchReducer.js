import {
    GET_BATCH_REQUEST,
    GET_BATCH_SUCCESS,
    GET_BATCH_FAILURE,
    ADD_BATCH_REQUEST,
    ADD_BATCH_SUCCESS,
    ADD_BATCH_FAILURE,
    EDIT_BATCH_REQUEST,
    EDIT_BATCH_SUCCESS,
    EDIT_BATCH_FAILURE,
  } from '../constants/batchConstants';
  
  const initialState = {
    loading: true,
    data: [],
    error: '',
  };
  
  export const getAllBatchReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BATCH_REQUEST:
      case ADD_BATCH_REQUEST:
      case EDIT_BATCH_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_BATCH_SUCCESS:
        return {
          loading: false,
          data: action.payload,
          error: '',
        };
      case ADD_BATCH_SUCCESS:
      case EDIT_BATCH_SUCCESS:
        const updatedBatch = action.payload;
        return {
          loading: false,
          error: '',
          data: state.data.map((batch) =>
            batch._id === updatedBatch._id ? updatedBatch : batch
          ),
        };
      case GET_BATCH_FAILURE:
      case ADD_BATCH_FAILURE:
      case EDIT_BATCH_FAILURE:
        return {
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  