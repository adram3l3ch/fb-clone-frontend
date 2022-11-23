import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["socket/setSocket", "modal/show/fulfilled"],
				ignoredPaths: ["socket.socket", "modal.modals"],
			},
		}),
});
