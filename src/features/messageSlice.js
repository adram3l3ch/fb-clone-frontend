import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createChatService,
	deleteChatService,
	fetchChatsService,
	fetchMessagesService,
} from "../services/messageServices";
import { showModal } from "./modalSlice";

const initialState = {
	conversationID: "",
	to: "",
	messages: [],
	chats: [],
};

export const getAllChats = createAsyncThunk("message/getAllChats", async (props, thunkAPI) => {
	const { customFetch, users } = props;
	const { getState, rejectWithValue, fulfillWithValue } = thunkAPI;
	const { user } = getState();
	const data = await customFetch(fetchChatsService);
	if (!data) return rejectWithValue();
	return fulfillWithValue({
		users: users.filter(u => u._id !== user.id),
		chats: data.chats,
	});
});

export const updateChats = createAsyncThunk("message/updateChat", async (props, thunkAPI) => {
	const { getState, dispatch, fulfillWithValue, rejectWithValue } = thunkAPI;
	const { lastMessage, id, customFetch } = props;
	const { message } = getState();
	const index = message.chats.findIndex(chat => chat.members.includes(id));
	if (index >= 0) return fulfillWithValue({ index, lastMessage });
	dispatch(getAllChats({ customFetch }));
	return rejectWithValue();
});

export const deleteChat = createAsyncThunk("message/deleteChat", async (props, thunkAPI) => {
	const { getState, fulfillWithValue, dispatch, rejectWithValue } = thunkAPI;
	const { customFetch } = props;
	const {
		message: { conversationID },
	} = getState();
	const data = await customFetch(deleteChatService, { chatId: conversationID });
	if (!data) return rejectWithValue();
	dispatch(showModal({ msg: "Chat deleted" }));
	fulfillWithValue([]);
});

export const createChat = createAsyncThunk("message/createChat", async (props, thunkAPI) => {
	const { getState, dispatch, rejectWithValue } = thunkAPI;
	const { customFetch, id } = props;
	const { user, users, message } = getState();
	const data = await customFetch(createChatService, { partnerId: id });
	if (!data) rejectWithValue();
	if (message.chats.every(chat => chat._id !== data.cid)) {
		dispatch(getAllChats({ customFetch, users: users.users }));
	}
	dispatch(messageSlice.actions.setChatID(data.cid));
	dispatch(messageSlice.actions.setReceiverID(id));
	const _data = await customFetch(fetchMessagesService, { chatId: data.cid });
	dispatch(clearMessage());
	dispatch(setMessages({ messages: _data.messages, id: user.id }));
});

const messageSlice = createSlice({
	name: "message",
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
			const { messages, id } = action.payload;
			state.messages = messages.map(message => {
				return { text: message.text, send: message.sender === id, createdAt: message.createdAt };
			});
		},
		addMessages: (state, action) => {
			const { text, send = false } = action.payload;
			state.messages = [...state.messages, { text, send, createdAt: String(new Date()) }];
		},
	},
	extraReducers: {
		[getAllChats.fulfilled]: (state, action) => {
			const { users, chats } = action.payload;
			const getUserDetails = members => users.find(user => members.includes(user._id));
			state.chats = chats.map(chat => ({ ...chat, userDetails: getUserDetails(chat.members) }));
		},
		[getAllChats.rejected]: (state, action) => {
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
		[deleteChat.fulfilled]: (state, action) => {
			state.chats = state.chats.filter(chat => chat._id !== state.conversationID);
			state.conversationID = "";
			state.to = "";
			state.messages = [];
		},
		[deleteChat.rejected]: (state, action) => {
			return state;
		},
	},
});

export const { addMessages, clearMessage, setChatID, setReceiverID, setMessages } = messageSlice.actions;

export default messageSlice.reducer;
