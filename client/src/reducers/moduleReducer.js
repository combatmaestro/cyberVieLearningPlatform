import {
  GET_MODULE_FAILURE,
  GET_MODULE_REQUEST,
  GET_MODULE_SUCCESS,
  GET_SPECIFIC_MODULE_FAILURE,
  GET_SPECIFIC_MODULE_REQUEST,
  GET_SPECIFIC_MODULE_SUCCESS,
  EDIT_MODULE_REQUEST,
  EDIT_MODULE_SUCCESS,
  EDIT_MODULE_FAILURE,
  ADD_MODULE_REQUEST,
  ADD_MODULE_SUCCESS,
  ADD_MODULE_FAILURE,
  GET_MODULE_DETAILS_REQUEST,
  GET_MODULE_DETAILS_SUCCESS,
  GET_MODULE_DETAILS_FAILURE,
  GET_MODULE_STATS_REQUEST,
  GET_MODULE_STATS_SUCCESS,
  GET_MODULE_STATS_FAILURE
} from "../constants/moduleConstants";


const initialState = {
  loading: true,
  data: "",
  error: "",
  moduleDetails:null
};


export const getAllModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_MODULE_REQUEST:
    case ADD_MODULE_REQUEST:
    case GET_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
      };


    case GET_MODULE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: "",
      };


    case EDIT_MODULE_SUCCESS:
      const editModule = action.payload;
      return {
        loading: false,
        error: "",
        data: state.data.map((module) =>
          module._id === editModule._id ? editModule : module
        ),
      };


    case ADD_MODULE_SUCCESS:
      const addModule = action.payload;


      return {
        loading: false,
        error: "",
        data: [...state.data, addModule],
      };


    case GET_MODULE_FAILURE:
      return {
        loading: false,
        data: "",
        error: action.payload,
      };


    case ADD_MODULE_FAILURE:
    case EDIT_MODULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };




      case GET_MODULE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_MODULE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        moduleDetails: action.payload,
      };
    case GET_MODULE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


   
    default:
      return state;
  }
};


export const getSpecificModuleReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SPECIFIC_MODULE_REQUEST:
      return {
        ...state,
        loading: true,
      };


    case GET_SPECIFIC_MODULE_SUCCESS:
      return {
        loading: false,
        moduleData: action.payload.module,
        responses: action.payload.responses,
        error: "",
      };


    case GET_SPECIFIC_MODULE_FAILURE:
      return {
        loading: false,
        moduleData: "",
        responses: "",
        error: action.payload,
      };


    default:
      return state;
  }
};




export const getAllStatsReducer =(state ={
  loading:false,
  stats:{},
  error:null
}, action )=>{
  switch(action.type){


  case GET_MODULE_STATS_SUCCESS:
      return{
        loading:false,
        stats:action.payload,
        error:""
      }
    case GET_MODULE_STATS_REQUEST:
      return{
        ...state,
        loading:true,
      }


    case GET_MODULE_STATS_FAILURE:
      return{
        loading:true,
        error:action.payload,
      }


    default:
      return state;
}
};






