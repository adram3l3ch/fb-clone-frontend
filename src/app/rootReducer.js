import { combineReducers } from "redux";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";
import postReducer from "../features/postSlice";
import messageReducer from "../features/messageSlice";

export default combineReducers({
   user: userReducer,
   modal: modalReducer,
   post: postReducer,
   message: messageReducer,
});
