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
} from "./reducers/userReducer";
import { labReducer } from "./reducers/labReducer";
import {
  getAdminTopicReducer,
  getTopicContentReducer,
} from "./reducers/topicReducer";
import { ctfReducer } from "./reducers/ctfReducer";
import { orderReducer } from "./reducers/orderReduer";
import { getAllBatchReducer } from "./reducers/batchReducer"; // Import the batch reducer

const initialState = {
  user: {},
  modules: {},
  batches: {}
};

const reducer = combineReducers({
  user: userReducer,
  modules: getAllModuleReducer,
  batches: getAllBatchReducer, // Add batch reducer here
  module: getSpecificModuleReducer,
  topics: getAdminTopicReducer,
  content: getTopicContentReducer,
  leaderBoard: leaderBoardReducer,
  ctfs: ctfReducer,
  allUsers: getAllUsersReducer,
  orders: orderReducer,
  lab: labReducer, // Add lab reducer here
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
