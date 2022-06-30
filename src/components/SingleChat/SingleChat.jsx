import React from "react";
import getDateString from "../../utils/getDateString";
import "./singlechat.css";

const SingleChat = ({ message, index, messages }) => {
	const today = new Date();
	const createdAt = new Date(message.createdAt);
	const prevMessageDate = messages[index - 1] && new Date(messages[index - 1]?.createdAt);
	const diff = today.getDate() - createdAt.getDate();
	const formattedDate = getDateString(createdAt);

	const date = diff === 1 ? "YESTERDAY" : diff === 0 ? "TODAY" : formattedDate;
	const showDate = prevMessageDate
		? createdAt.getDate() - prevMessageDate.getDate() > 0
			? true
			: false
		: true;

	const getTime = () => {
		return `${createdAt.getHours()}:${
			createdAt.getMinutes() > 9 ? createdAt.getMinutes() : "0" + createdAt.getMinutes()
		}`;
	};

	const isEmoji = message.text.length === 2 && !message.text.match(/\w/);
	return (
		<>
			{showDate && <h4>{date}</h4>}
			<div className={message.send ? "chat__sent" : "chat__recieve"}>
				<p className={isEmoji ? "emoji message" : "message"}>
					{message.text}
					{messages[index + 1]?.send !== message.send && <span className="time">{getTime()}</span>}
				</p>
			</div>
		</>
	);
};

export default SingleChat;
