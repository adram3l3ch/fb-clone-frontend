import { combineReducers } from "redux";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";

export default combineReducers({
   user: userReducer,
   modal: modalReducer,
});
