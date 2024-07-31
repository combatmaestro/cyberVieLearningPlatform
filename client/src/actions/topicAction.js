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
  TOPIC_LIST_REQUEST,
  TOPIC_LIST_SUCCESS,
  TOPIC_LIST_FAIL,
  SUBTOPIC_ADD_REQUEST,
  SUBTOPIC_ADD_SUCCESS,
  SUBTOPIC_ADD_FAILURE,
  SUBTOPIC_LIST_REQUEST,
  SUBTOPIC_LIST_SUCCESS,
  SUBTOPIC_LIST_FAILURE
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

const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app"


export const getAdminTopic = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_TOPIC_REQUEST,
  })

  try {
    const { data } = await axios({
      method: 'GET',
      url: `${backendUrl}/module/admin/details?id=${id}`,
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
      `${backendUrl}/topic/admin/seed?id=${id}`,
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
      `${backendUrl}/topic/admin/update?id=${id}`,
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
    const { data } = await axios.get(`${backendUrl}/topic/admin/getcontent?id=${id}`)
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
      `${backendUrl}/topic/admin/content?id=${id}`,
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


export const listTopics = (moduleId) => async (dispatch) => {
  try {
    dispatch({ type: TOPIC_LIST_REQUEST })

    const { data } = await axios.get(`${backendUrl}/topic/admin/gettopics?moduleId=${moduleId}`)
    dispatch({
      type: TOPIC_LIST_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: TOPIC_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const addSubtopics = (assessmentData) => async (dispatch) => {
  try {
    dispatch({ type: SUBTOPIC_ADD_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`${backendUrl}/topic/admin/subtopics/save`, assessmentData, config)

    dispatch({
      type: SUBTOPIC_ADD_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: SUBTOPIC_ADD_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}

export const getAllSubtopics = () => async (dispatch) => {
  dispatch({
    type: SUBTOPIC_LIST_REQUEST,
  })

  try {
    const { data } = await axios.get(`${backendUrl}/topic/getAll/subtopics`)
    dispatch({
      type: SUBTOPIC_LIST_SUCCESS,
      payload: data.data,
    })
  } catch (error) {
    dispatch({
      type: SUBTOPIC_LIST_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    })
  }
}