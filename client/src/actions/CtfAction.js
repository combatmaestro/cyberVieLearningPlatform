import axios from 'axios'
import {
  ADD_CTF_FAILURE,
  ADD_CTF_REQUEST,
  ADD_CTF_SUCCESS,
  ADMIN_CTF_FAILURE,
  ADMIN_CTF_REQUEST,
  ADMIN_CTF_SUCCESS,
  EDIT_CTF_FAILURE,
  EDIT_CTF_REQUEST,
  EDIT_CTF_SUCCESS,
} from '../constants/CtfConstants'

export const getAdminCtf = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_CTF_REQUEST,
  })

  try {
    const { data } = await axios({
      method: 'GET',
      url: `/topic/admin/getctfs?id=${id}`,
    })
    dispatch({
      type: ADMIN_CTF_SUCCESS,
      payload: data.data.ctf,
    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ADMIN_CTF_FAILURE,
      payload: error.response.data.message,
    })
  }
}

export const addNewCtf = (id, info) => async (dispatch) => {
  dispatch({
    type: ADD_CTF_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(`/ctf/admin/seed?id=${id}`, info, config)
    dispatch({
      type: ADD_CTF_SUCCESS,
      payload: data.data,
    })
    return {
      success: true,
    }
  } catch (error) {
    console.log('mess', error.response)
    dispatch({
      type: ADD_CTF_FAILURE,
      payload: error.response.data.message,
    })
    return {
      success: false,
    }
  }
}

export const editCurrentCtf = (id, info) => async (dispatch) => {
  dispatch({
    type: EDIT_CTF_REQUEST,
  })

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(`/ctf/admin/update?id=${id}`, info, config)
    dispatch({
      type: EDIT_CTF_SUCCESS,
      payload: data.data,
    })
    return {
      success: true,
    }
  } catch (error) {
    dispatch({
      type: EDIT_CTF_FAILURE,
      payload: error || error.response.data.message,
    })
    return {
      success: false,
    }
  }
}
