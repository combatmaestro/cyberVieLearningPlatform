import axios from "axios";
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

const backendUrl = "http://localhost:4000"; 
// const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app";

// ✅ Create Blog
export const createNewBlog = (info) => async (dispatch) => {
  dispatch({ type: BLOG_CREATE_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `${backendUrl}/blogs/admin/create`,
      info,
      config
    );

    dispatch({ type: BLOG_CREATE_SUCCESS, payload: data.data });
    return { success: true, data: data.data };
  } catch (error) {
    dispatch({
      type: BLOG_CREATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};

// ✏️ Edit Blog
export const editBlog = (id, info) => async (dispatch) => {
  dispatch({ type: BLOG_EDIT_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `${backendUrl}/blogs/admin/edit/${id}`,
      info,
      config
    );

    dispatch({ type: BLOG_EDIT_SUCCESS, payload: data.data });
    return { success: true, data: data.data };
  } catch (error) {
    dispatch({
      type: BLOG_EDIT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};

// 🗑 Delete Blog
export const deleteBlog = (id) => async (dispatch) => {
  dispatch({ type: BLOG_DELETE_REQUEST });

  try {
    await axios.delete(`${backendUrl}/blogs/admin/delete/${id}`);
    dispatch({ type: BLOG_DELETE_SUCCESS, payload: id });
    return { success: true };
  } catch (error) {
    dispatch({
      type: BLOG_DELETE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};

// 📚 Get All Blogs
export const getAllBlogs = () => async (dispatch) => {
  dispatch({ type: BLOG_LIST_REQUEST });

  try {
    const { data } = await axios.get(`${backendUrl}/blogs/`);
    dispatch({ type: BLOG_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
