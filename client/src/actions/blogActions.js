import axios from "axios";
import {
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAILURE,
} from "../constants/blogConstants";

const backendUrl = "http://localhost:4000";

// Action to create a new blog
export const createNewBlog = (info) => async (dispatch) => {
  dispatch({ type: BLOG_CREATE_REQUEST });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${backendUrl}/blogs/admin/create`, // ✅ create endpoint
      info,
      config
    );

    dispatch({ type: BLOG_CREATE_SUCCESS, payload: data.data });

    return { success: true, data: data.data }; // return the created blog
  } catch (error) {
    dispatch({
      type: BLOG_CREATE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    return { success: false };
  }
};
