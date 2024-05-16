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
} from "../constants/topicConstants";

export const getAdminTopicReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADD_TOPIC_REQUEST:
    case EDIT_TOPIC_REQUEST:
    case ADMIN_TOPIC_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_TOPIC_SUCCESS:
      return {
        loading: false,
        topicData: action.payload.topic,
        error: "",
      };

    case ADD_TOPIC_SUCCESS:
      return {
        loading: false,
        topicData: [...state.topicData, action.payload],
        error: "",
      };

    case EDIT_TOPIC_SUCCESS:
      const editTopic = action.payload;
      return {
        loading: false,
        topicData: state.topicData.map((topic) =>
          topic._id === editTopic._id ? editTopic : topic
        ),
        error: "",
      };

    case ADMIN_TOPIC_FAILURE:
      return {
        loading: false,
        moduleData: "",
        error: action.payload,
      };

    case EDIT_TOPIC_FAILURE:
    case ADD_TOPIC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getTopicContentReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_CONTENT_REQUEST:
    case ADMIN_GET_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_UPDATE_CONTENT_SUCCESS:
    case ADMIN_GET_CONTENT_SUCCESS:
      return {
        loading: false,
        contentData: action.payload,
        error: null,
      };

    case ADMIN_UPDATE_CONTENT_FAILURE:
    case ADMIN_GET_CONTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
