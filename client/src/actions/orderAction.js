import axios from "axios";
import {
  ADMIN_GET_ORDER_REQUEST,
  ADMIN_GET_ORDER_SUCCESS,
  ADMIN_GET_ORDER_FAILURE,
} from "../constants/orderConstants";

if(localStorage.getItem("token")){
  axios.interceptors.request.use(
    config => {
      const accessToken = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    },
    error =>{
      return Promise.reject(error);
    }
  )
}


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
    dispatch({
      type: ADMIN_GET_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};
