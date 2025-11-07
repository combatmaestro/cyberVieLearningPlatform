import {
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAILURE,
  BLOG_EDIT_REQUEST,
  BLOG_EDIT_SUCCESS,
  BLOG_EDIT_FAILURE,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_FAILURE,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAILURE,
} from "../constants/blogConstants";

// 🆕 Create Blog Reducer
export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ✏️ Edit Blog Reducer
export const blogEditReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_EDIT_REQUEST:
      return { loading: true };
    case BLOG_EDIT_SUCCESS:
      return { loading: false, success: true, blog: action.payload };
    case BLOG_EDIT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 🗑 Delete Blog Reducer
export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true, id: action.payload };
    case BLOG_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 📚 Get All Blogs Reducer
export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };
    case BLOG_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case BLOG_DELETE_SUCCESS:
      // 🧹 remove deleted blog locally
      return {
        ...state,
        blogs: state.blogs.filter((b) => b._id !== action.payload),
      };
    default:
      return state;
  }
};
