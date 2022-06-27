import extractParams from "../utils/extractParams";
import axiosConfig from "./axiosConfig";

const fetchChatsService = async () => {
	const { data } = await axiosConfig.get("/chats");
	return data;
};

const createChatService = async (formData = {}) => {
	const { partnerId } = formData;
	const { data } = await axiosConfig.post("/chats", { partnerId });
	return data;
};

// const createMessageService = async (formData = {}) => {
// 	const params = extractParams(formData, "chatId", "text");
// 	const { data } = await axiosConfig.post("/message", params);
// 	return data;
// };

const fetchMessagesService = async (formData = {}) => {
	const params = extractParams(formData, "chatId");
	const { data } = await axiosConfig.get("/messages", { params });
	return data;
};

const deleteChatService = async (formData = {}) => {
	const params = extractParams(formData, "chatId");
	const { data } = await axiosConfig.delete("/chats", { data: params });
	return data;
};

const clearChatService = async (formData = {}) => {
	const params = extractParams(formData, "chatId");
	const { data } = await axiosConfig.delete("/messages", { data: params });
	return data;
};

export { fetchChatsService, createChatService, fetchMessagesService, deleteChatService, clearChatService };
