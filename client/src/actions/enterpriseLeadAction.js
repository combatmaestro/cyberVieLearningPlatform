import axios from "axios";
import { ENTERPRISE_LEADS_REQUEST, ENTERPRISE_LEADS_SUCCESS, ENTERPRISE_LEADS_FAIL } from "../constants/enterpriseLeadConstants";

export const getAllEnterpriseLeads = () => async (dispatch) => {
  try {
    dispatch({ type: ENTERPRISE_LEADS_REQUEST });

    const { data } = await axios.get(
      "https://cyber-vie-learning-platform-client-ten.vercel.app/user/admin/get-enterprise-leads"
    );

    dispatch({
      type: ENTERPRISE_LEADS_SUCCESS,
      payload: data.leads,
    });
  } catch (error) {
    dispatch({
      type: ENTERPRISE_LEADS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
