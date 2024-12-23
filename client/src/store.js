import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  getAllModuleReducer,
  getSpecificModuleReducer,
  getAllStatsReducer
} from "./reducers/moduleReducer";
import {
  userReducer,
  leaderBoardReducer,
  getAllUsersReducer,
  getAllTeachersReducer
} from "./reducers/userReducer";
import { labReducer } from "./reducers/labReducer";
import {
  getAdminTopicReducer,
  getTopicContentReducer,
  topicListReducer,
  subtopicListReducer,
  subtopicDeleteReducer
} from "./reducers/topicReducer";
import { ctfReducer } from "./reducers/ctfReducer";
import { orderReducer } from "./reducers/orderReduer";
import { getAllBatchReducer } from "./reducers/batchReducer";
import assessmentReducer from "./reducers/assessmentReducer";
import { scheduleClassReducer , getClassesReducer  } from "./reducers/classess";
import { assessmentReviewReducer } from "./reducers/assessmentReviewReducer";
import { formDataReducer } from "./reducers/leadManagement";
const initialState = {
  user: {},
  modules: {},
  batches: {},
};



const reducer = combineReducers({
  user: userReducer,
  modules: getAllModuleReducer,
  batches: getAllBatchReducer,
  module: getSpecificModuleReducer,
  topics: getAdminTopicReducer,
  content: getTopicContentReducer,
  leaderBoard: leaderBoardReducer,
  ctfs: ctfReducer,
  allUsers: getAllUsersReducer,
  allTeachers: getAllTeachersReducer,
  orders: orderReducer,
  lab: labReducer,
  topicList: topicListReducer,
  assessment: assessmentReducer,
  scheduleClass: scheduleClassReducer,
  assessmentReview: assessmentReviewReducer,
  subtopics:subtopicListReducer,
  getClasses: getClassesReducer,
  allStats: getAllStatsReducer,
  formDataState: formDataReducer,
  subtopicDelete: subtopicDeleteReducer,
});


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);


export default store;




