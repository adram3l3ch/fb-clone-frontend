import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	conversationID: '',
	to: '',
	messages: [],
};

const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
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
	},
});

export const { addMessages, clearMessage, setChatID, setReceiverID, setMessages } =
	messageSlice.actions;

export default messageSlice.reducer;
