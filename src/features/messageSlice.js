import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsersByIDs, getChats } from '../API';

const initialState = {
	conversationID: '',
	to: '',
	messages: [],
	chats: [],
};

export const _getChats = createAsyncThunk('message/getChats', async (props, thunkAPI) => {
	const { customFetch } = props;
	const { getState, rejectWithValue, fulfillWithValue } = thunkAPI;
	const { user } = getState();
	const data = await customFetch(getChats, user.token);
	if (!data) return rejectWithValue();
	const userIDs = data.chat.map(chat => chat.members.find(member => member !== user.id));
	const users = await customFetch(fetchUsersByIDs, userIDs, user.token);
	return fulfillWithValue({ users: users.user, chats: data.chat });
});

export const updateChats = createAsyncThunk('message/updateChat', async (props, thunkAPI) => {
	const { getState, dispatch, fulfillWithValue, rejectWithValue } = thunkAPI;
	const { lastMessage, id, customFetch } = props;
	const { message } = getState();
	const index = message.chats.findIndex(chat => chat.members.includes(id));
	if (index >= 0) return fulfillWithValue({ index, lastMessage });
	dispatch(_getChats({ customFetch }));
	return rejectWithValue();
});

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		clearMessage: (state, action) => {
			state.messages = [];
		},
		setChatID: (state, action) => {
			state.conversationID = action.payload;
		},
		setReceiverID: (state, action) => {
			state.to = action.payload;
		},
		setMessages: (state, action) => {
			state.messages = action.payload.messages.map(message => {
				return {
					text: message.text,
					send: message.sender === action.payload.id,
					createdAt: message.createdAt,
				};
			});
		},
		addMessages: (state, action) => {
			state.messages = [
				...state.messages,
				{
					text: action.payload.text,
					send: action.payload.send || false,
					createdAt: String(new Date()),
				},
			];
		},
	},
	extraReducers: {
		[_getChats.fulfilled]: (state, action) => {
			state.chats = action.payload.chats.map(chat => {
				return {
					...chat,
					userDetails: action.payload.users.find(user => chat.members.includes(user._id)),
				};
			});
		},
		[_getChats.rejected]: (state, action) => {
			return state;
		},
		[updateChats.fulfilled]: (state, action) => {
			const updatingChat = state.chats[action.payload.index];
			state.chats = [
				{
					...updatingChat,
					lastMessage: action.payload.lastMessage,
				},
				...state.chats.filter(chat => chat._id !== updatingChat._id),
			];
		},
		[updateChats.rejected]: (state, action) => {
			return state;
		},
	},
});

export const { addMessages, clearMessage, setChatID, setReceiverID, setMessages } =
	messageSlice.actions;

export default messageSlice.reducer;
