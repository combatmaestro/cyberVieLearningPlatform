import {
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAILURE,
} from "../constants/blogConstants";

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, data: action.payload };
    case BLOG_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
