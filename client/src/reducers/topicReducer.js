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

export const topicListReducer = (state = { topics: [] }, action) => {
  switch (action.type) {
    case TOPIC_LIST_REQUEST:
      return { loading: true, topics: [] }
    case TOPIC_LIST_SUCCESS:
      return { loading: false, topics: action.payload }
    case TOPIC_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const subtopicAddReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBTOPIC_ADD_REQUEST:
      return { loading: true }
    case SUBTOPIC_ADD_SUCCESS:
      return { loading: false, success: true, subtopics: action.payload }
    case SUBTOPIC_ADD_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const subtopicListReducer = (state = { subtopics: [] }, action) => {
  switch (action.type) {
    case SUBTOPIC_LIST_REQUEST:
      return { loading: true, subtopics: [] }
    case SUBTOPIC_LIST_SUCCESS:
      return { loading: false, subtopics: action.payload }
    case SUBTOPIC_LIST_FAILURE:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}