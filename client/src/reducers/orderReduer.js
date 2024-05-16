import {
  ADMIN_GET_ORDER_REQUEST,
  ADMIN_GET_ORDER_SUCCESS,
  ADMIN_GET_ORDER_FAILURE,
} from "../constants/orderConstants";

const initialState = {
  loading: true,
  orderData: [],
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case ADMIN_GET_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        orderData: action.payload,
        error: null,
      };
    }

    case ADMIN_GET_ORDER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
