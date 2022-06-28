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

const fetchMessagesService = async (formData = {}) => {
	const params = extractParams(formData, "chatId");
	const { data } = await axiosConfig.get("/messages", { params });
	return data;
};

export { fetchChatsService, createChatService, fetchMessagesService };
