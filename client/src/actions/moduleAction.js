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
  GET_MODULE_DETAILS_FAILURE,
  GET_MODULE_DETAILS_SUCCESS,
  GET_MODULE_DETAILS_REQUEST,
} from "../constants/moduleConstants";
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
} from "../constants/batchConstants";
const backendUrl = "https://cyber-vie-learning-platform-server.vercel.app";

function getCookie(cookieName) {
  // Split the cookie string into individual cookies
  const cookies = document.cookie.split(";");

  // Loop through each cookie to find the one with the specified name
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    // Remove leading spaces (if any)
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }

    // Check if this cookie has the specified name
    if (cookie.indexOf(cookieName + "=") === 0) {
      // Return the value of the cookie
      return cookie.substring(cookieName.length + 1, cookie.length);
    }
  }

  // If the cookie with the specified name is not found, return null
  return null;
}

if (localStorage.getItem("token")) {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export const getAllBatches = () => async (dispatch) => {
  dispatch({
    type: GET_BATCH_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `${backendUrl}/batch/admin/getall`,
    });
    dispatch({
      type: GET_BATCH_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BATCH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

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

export const getModuleDetailsRequest = () => ({
  type: GET_MODULE_DETAILS_REQUEST,
});

export const getModuleDetailsSuccess = (data) => ({
  type: GET_MODULE_DETAILS_SUCCESS,
  payload: data,
});

export const getModuleDetailsFailure = (error) => ({
  type: GET_MODULE_DETAILS_FAILURE,
  payload: error,
});



export const getModuleDetailsComplete = (user) => async (dispatch) => {
  console.log('getModuleDetailsComplete')
  dispatch(getModuleDetailsRequest());

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${backendUrl}/module/allDetails`, { user: user }, config);
    dispatch(getModuleDetailsSuccess(data.allModulesData));
  } catch (error) {
    dispatch(getModuleDetailsFailure(error.response.data.message));
  }
};

export const getModule = (id) => async (dispatch) => {
  dispatch({
    type: GET_SPECIFIC_MODULE_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `${backendUrl}/module/details?id=${id}`,
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
      `${backendUrl}/module/admin/update?id=${id}`,
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

    const { data } = await axios.post(
      `${backendUrl}/module/admin/seed`,
      info,
      config
    );
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

export const addNewBatch = (info) => async (dispatch) => {
  dispatch({
    type: ADD_BATCH_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${backendUrl}/batch/admin/save`,
      info,
      config
    );
    dispatch({
      type: ADD_BATCH_SUCCESS,
      payload: data.data,
    });
    return {
      success: true,
    };
  } catch (error) {
    dispatch({
      type: ADD_BATCH_FAILURE,
      payload: error.response.data.message,
    });

    return {
      success: false,
    };
  }
};

export const editBatchModule = (id, info) => async (dispatch) => {
  dispatch({
    type: EDIT_BATCH_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${backendUrl}/batch/admin/update?id=${id}`,
      info,
      config
    );
    dispatch({
      type: EDIT_BATCH_SUCCESS,
      payload: data.data,
    });
    return {
      success: true,
    };
  } catch (error) {
    dispatch({
      type: EDIT_BATCH_FAILURE,
      payload: error.response.data.message,
    });

    return {
      success: false,
    };
  }
};