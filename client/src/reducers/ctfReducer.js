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

const initialState = {
  loading: true,
  ctfData: [],
  error: '',
}

export const ctfReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_CTF_REQUEST:
    case ADD_CTF_REQUEST:
    case EDIT_CTF_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case ADMIN_CTF_SUCCESS: {
      return {
        loading: false,
        ctfData: action.payload,
        error: '',
      }
    }

    case ADD_CTF_SUCCESS:
      return {
        loading: false,
        ctfData: [...state.ctfData, action.payload].sort((a, b) => {
          return a.sno - b.sno
        }),
        error: '',
      }

    case EDIT_CTF_SUCCESS:
      const editCtf = action.payload
      return {
        loading: false,
        ctfData: state.ctfData
          .map((ctf) => (ctf._id === editCtf._id ? editCtf : ctf))
          .sort((a, b) => {
            return a.sno - b.sno
          }),
        error: '',
      }

    case ADMIN_CTF_FAILURE: {
      return {
        loading: false,
        error: action.payload,
        ctfData: '',
      }
    }

    case ADD_CTF_FAILURE:
    case EDIT_CTF_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    default:
      return state
  }
}
