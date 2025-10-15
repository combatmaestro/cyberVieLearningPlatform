import axios from "axios";
import { GET_ENTERPRISE_LEADS_REQUEST,
  GET_ENTERPRISE_LEADS_SUCCESS,
  GET_ENTERPRISE_LEADS_FAILURE, } from "../constants/enterpriseLeadConstants";

export const getAllEnterpriseLeads = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ENTERPRISE_LEADS_REQUEST });

    const { data } = await axios.get(
      "https://cyber-vie-learning-platform-client-ten.vercel.app/user/admin/get-enterprise-leads"
    );

    dispatch({
      type: GET_ENTERPRISE_LEADS_SUCCESS,
      payload:  { leads: data.leads },
    });
  } catch (error) {
    dispatch({
      type: GET_ENTERPRISE_LEADS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
