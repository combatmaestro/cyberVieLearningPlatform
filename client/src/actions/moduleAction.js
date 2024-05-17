import axios from "axios";
import {
  GET_MODULE_FAILURE,
  GET_MODULE_REQUEST,
  GET_MODULE_SUCCESS,
  GET_SPECIFIC_MODULE_FAILURE,
  GET_SPECIFIC_MODULE_REQUEST,
  GET_SPECIFIC_MODULE_SUCCESS,
  EDIT_MODULE_REQUEST,
  EDIT_MODULE_SUCCESS,
  EDIT_MODULE_FAILURE,
  ADD_MODULE_REQUEST,
  ADD_MODULE_SUCCESS,
  ADD_MODULE_FAILURE,
} from "../constants/moduleConstants";


const backendUrl = "https://cyber-vie-learning-platform-server.vercel.app"
function getCookie(cookieName) {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split(';');
  
  // Loop through each cookie to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    
    // Remove leading spaces (if any)
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    
    // Check if this cookie has the specified name
    if (cookie.indexOf(cookieName + '=') === 0) {
      // Return the value of the cookie
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }
  
  // If the cookie with the specified name is not found, return null
  return null;
}


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



export const getAllModules = () => async (dispatch) => {
  dispatch({
    type: GET_MODULE_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `${backendUrl}/module/getall`,
    });
    dispatch({
      type: GET_MODULE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MODULE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getModule = (id) => async (dispatch) => {
  dispatch({
    type: GET_SPECIFIC_MODULE_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `/module/details?id=${id}`,
    });
    dispatch({
      type: GET_SPECIFIC_MODULE_SUCCESS,
      payload: {
        module: data.module,
        responses: data.responses,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_SPECIFIC_MODULE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const editCurrentModule = (id, info) => async (dispatch) => {
  dispatch({
    type: EDIT_MODULE_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/module/admin/update?id=${id}`,
      info,
      config
    );
    dispatch({
      type: EDIT_MODULE_SUCCESS,
      payload: data.data,
    });
    return {
      success: true,
    };
  } catch (error) {
    dispatch({
      type: EDIT_MODULE_FAILURE,
      payload: error.response.data.message,
    });

    return {
      success: false,
    };
  }
};

export const addNewModule = (info) => async (dispatch) => {
  dispatch({
    type: ADD_MODULE_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/module/admin/seed`, info, config);
    dispatch({
      type: ADD_MODULE_SUCCESS,
      payload: data.data,
    });
    return {
      success: true,
    };
  } catch (error) {
    dispatch({
      type: ADD_MODULE_FAILURE,
      payload: error.response.data.message,
    });

    return {
      success: false,
    };
  }
};
