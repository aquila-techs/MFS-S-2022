import { combineReducers } from "redux";

//Import All Reducers
import { authReducer } from "./features";
import { langReducer } from "./LanguageTranslator";

export default combineReducers({
  auth: authReducer,
  language: langReducer,
});
