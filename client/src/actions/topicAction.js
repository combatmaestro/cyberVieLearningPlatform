import axios from 'axios'
import {
  ADMIN_TOPIC_REQUEST,
  ADMIN_TOPIC_SUCCESS,
  ADMIN_TOPIC_FAILURE,
  ADD_TOPIC_REQUEST,
  ADD_TOPIC_SUCCESS,
  ADD_TOPIC_FAILURE,
  EDIT_TOPIC_REQUEST,
  EDIT_TOPIC_SUCCESS,
  EDIT_TOPIC_FAILURE,
  ADMIN_GET_CONTENT_REQUEST,
  ADMIN_GET_CONTENT_SUCCESS,
  ADMIN_GET_CONTENT_FAILURE,
  ADMIN_UPDATE_CONTENT_REQUEST,
  ADMIN_UPDATE_CONTENT_SUCCESS,
  ADMIN_UPDATE_CONTENT_FAILURE,
} from '../constants/topicConstants'

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


export const getAdminTopic = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_TOPIC_REQUEST,
  })

  try {
    const { data } = await axios({
      method: 'GET',
      url: `/module/admin/details?id=${id}`,
    })
    // console.log("daa", data);
    dispatch({
      type: ADMIN_TOPIC_SUCCESS,
      payload: {
        topic: data.topic,
      },
    })
  } catch (error) {
    dispatch({
      type: ADMIN_TOPIC_FAILURE,
      payload: error.response.data.message,
    })
  }
}

export const addNewTopic = (id, info) => async (dispatch) => {
  dispatch({
    type: ADD_TOPIC_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/topic/admin/seed?id=${id}`,
      info,
      config
    )
    dispatch({
      type: ADD_TOPIC_SUCCESS,
      payload: data.data,
    })
    return {
      success: true,
    }
  } catch (error) {
    console.log('mess', error.response)
    dispatch({
      type: ADD_TOPIC_FAILURE,
      payload: error.response.data.message,
    })
    return {
      success: false,
    }
  }
}

export const editCurrentTopic = (id, info) => async (dispatch) => {
  dispatch({
    type: EDIT_TOPIC_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/topic/admin/update?id=${id}`,
      info,
      config
    )
    dispatch({
      type: EDIT_TOPIC_SUCCESS,
      payload: data.data,
    })
    return {
      success: true,
    }
  } catch (error) {
    dispatch({
      type: EDIT_TOPIC_FAILURE,
      payload: error.response.data.message,
    })
    return {
      success: false,
    }
  }
}

export const getContentTopic = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_GET_CONTENT_REQUEST,
  })

  try {
    const { data } = await axios.get(`/topic/admin/getcontent?id=${id}`)
    // console.log(data.data);
    dispatch({
      type: ADMIN_GET_CONTENT_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    console.log('mess', error.response)
    dispatch({
      type: ADMIN_GET_CONTENT_FAILURE,
      payload: error.response.data.message,
    })
  }
}

export const updateContent = (id, info) => async (dispatch) => {
  dispatch({
    type: ADMIN_UPDATE_CONTENT_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `/topic/admin/content?id=${id}`,
      info,
      config
    )
    dispatch({
      type: ADMIN_UPDATE_CONTENT_SUCCESS,
      payload: data.data,
    })

    return {
      success: true,
    }
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_CONTENT_FAILURE,
      payload: error.response.data.message,
    })

    return {
      success: false,
    }
  }
}
