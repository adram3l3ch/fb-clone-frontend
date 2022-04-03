import { combineReducers } from 'redux';
import userReducer from '../features/userSlice';
import modalReducer from '../features/modalSlice';
import postReducer from '../features/postSlice';
import messageReducer from '../features/messageSlice';
import socketReducer from '../features/socketSlice';
import usersReducer from '../features/usersSlice';

export default combineReducers({
	user: userReducer,
	modal: modalReducer,
	post: postReducer,
	message: messageReducer,
	socket: socketReducer,
	users: usersReducer,
});
