import { combineReducers } from "redux";

import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import organizationsReducer from "./organizationsReducer";

export default combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  organizations: organizationsReducer
});
