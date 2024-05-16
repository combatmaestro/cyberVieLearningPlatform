import axios from "axios";
import {
  ADMIN_GET_ORDER_REQUEST,
  ADMIN_GET_ORDER_SUCCESS,
  ADMIN_GET_ORDER_FAILURE,
} from "../constants/orderConstants";

export const getAllOrders = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_GET_ORDER_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `/payment/allorders`,
    });

    dispatch({
      type: ADMIN_GET_ORDER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log("hell", error);
    dispatch({
      type: ADMIN_GET_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};
