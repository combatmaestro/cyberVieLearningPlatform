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
import {
  getAdminTopicReducer,
  getTopicContentReducer,
} from "./reducers/topicReducer";
import { ctfReducer } from "./reducers/ctfReducer";

import { orderReducer } from "./reducers/orderReduer";

const initialState = {
  user: {},
  modules: {},
};

const reducer = combineReducers({
  user: userReducer,
  modules: getAllModuleReducer,
  module: getSpecificModuleReducer,
  topics: getAdminTopicReducer,
  content: getTopicContentReducer,
  leaderBoard: leaderBoardReducer,
  ctfs: ctfReducer,
  allUsers: getAllUsersReducer,
  orders: orderReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
