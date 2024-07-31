import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  getAllModuleReducer,
  getSpecificModuleReducer,
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
  subtopicListReducer
} from "./reducers/topicReducer";
import { ctfReducer } from "./reducers/ctfReducer";
import { orderReducer } from "./reducers/orderReduer";
import { getAllBatchReducer } from "./reducers/batchReducer";
import assessmentReducer from "./reducers/assessmentReducer";
import { scheduleClassReducer } from "./reducers/classess";
import { assessmentReviewReducer } from "./reducers/assessmentReviewReducer";
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
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
