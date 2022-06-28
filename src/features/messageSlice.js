import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createChatService, fetchChatsService, fetchMessagesService } from "../services/messageServices";
import { logout } from "./userSlice";

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

export const updateChats = createAsyncThunk("message/updateChat", async (props, thunkAPI) => {
	const { getState, dispatch, fulfillWithValue } = thunkAPI;
	const { lastMessage, id, chatId, customFetch } = props;
	const { message, users } = getState();
	let index;
	if (chatId) index = message.chats.findIndex(chat => chat._id === chatId);
	else index = message.chats.findIndex(chat => chat.members.includes(id));
	if (index >= 0) return fulfillWithValue({ index, lastMessage });
	dispatch(getAllChats({ customFetch, users: users.users }));
});

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		clearMessage: (state, action) => {
			const conversationID = action.payload?.conversationID;
			if (conversationID) {
				const index = state.chats.findIndex(chat => chat._id === conversationID);
				const updatingChat = state.chats[index];
				state.chats = [
					{ ...updatingChat, lastMessage: "" },
					...state.chats.filter(chat => chat._id !== conversationID),
				];
				if (conversationID === state.conversationID) state.messages = [];
			} else {
				state.messages = [];
			}
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
		deleteChat: (state, action) => {
			state.chats = state.chats.filter(chat => chat._id !== action.payload);
			if (action.payload === state.conversationID) state.conversationID = "";
		},
	},
	extraReducers: {
		[getAllChats.fulfilled]: (state, action) => {
			const { users, chats } = action.payload;
			const getUserDetails = members => users.find(user => members.includes(user._id));
			state.chats = chats.map(chat => ({ ...chat, userDetails: getUserDetails(chat.members) }));
		},
		[updateChats.fulfilled]: (state, action) => {
			const updatingChat = state.chats[action.payload?.index];
			if (updatingChat) {
				state.chats = [
					{
						...updatingChat,
						lastMessage: action.payload.lastMessage,
					},
					...state.chats.filter(chat => chat._id !== updatingChat._id),
				];
			}
		},
		[logout.type]: (state, action) => {
			return initialState;
		},
	},
});

export const { addMessages, clearMessage, setChatID, setReceiverID, setMessages, deleteChat } =
	messageSlice.actions;

export default messageSlice.reducer;
