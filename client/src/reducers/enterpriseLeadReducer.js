import { GET_ENTERPRISE_LEADS_REQUEST,
  GET_ENTERPRISE_LEADS_SUCCESS,
  GET_ENTERPRISE_LEADS_FAILURE, } from "../constants/enterpriseLeadConstants";


const initialState = {
  leads: [],
  loading: false,
  error: null,
};

export const enterpriseLeadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTERPRISE_LEADS_REQUEST:
      return { ...state, loading: true };
    case GET_ENTERPRISE_LEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        leads: action.payload.data || [],
        total: action.payload.total,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case GET_ENTERPRISE_LEADS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
