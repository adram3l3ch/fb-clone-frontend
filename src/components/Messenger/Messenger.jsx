import React, { useEffect, useRef } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addMessages, clearMessage, deleteChat, updateChats } from "../../features/messageSlice";
import SingleChat from "../SingleChat/SingleChat";
import Input from "../Input/Input";
import { dp } from "../../assets";
import "./messenger.css";
import Options from "../Options/Options";
import useConfirmation from "../Confirmation/useConfirmation";

const Messenger = () => {
	const {
		user: { id },
		message: { messages, conversationID, to, chats },
		socket: { socket },
		users: { usersOnline },
	} = useSelector(state => state);

	const userDetails = chats?.find(chat => chat._id === conversationID)?.userDetails || {};

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const scroll = useRef();

	useEffect(() => {
		if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
	}, [messages]);

	const submitHandler = async message => {
		socket.emit("send message", message, to, conversationID, id);
		dispatch(addMessages({ text: message, send: true }));
		dispatch(updateChats({ id: to, lastMessage: message, customFetch }));
	};

	const deleteHandler = () => {
		socket.emit("delete chat", conversationID, to);
		dispatch(deleteChat(conversationID));
	};
	const clearHandler = () => {
		socket.emit("clear chat", conversationID, to);
		dispatch(clearMessage({ conversationID }));
	};

	const { Confirmation: ConfirmDelete, toggleShow: toggleDelete } = useConfirmation(
		deleteHandler,
		"Are you sure, you want to delete this chat"
	);

	const { Confirmation: ConfirmClear, toggleShow: toggleClear } = useConfirmation(
		clearHandler,
		"Are you sure, you want to clear this chat"
	);

	const options = {
		"Delete Chat": toggleDelete,
		"Clear Chat": toggleClear,
	};

	return (
		<section className="chat__page__messenger">
			{conversationID ? (
				<>
					{ConfirmDelete}
					{ConfirmClear}
					<header>
						<img src={userDetails.profileImage || dp} alt="chatIcon" className="chat__page__dp" />
						<div>
							<h3>{userDetails.name}</h3>
							{usersOnline.some(u => u.id === userDetails._id) && <p>Online</p>}
						</div>
						<Options options={options} />
					</header>
					<main ref={scroll}>
						<div className="messenger">
							{messages.map((message, i, messages) => {
								return <SingleChat key={i} message={message} index={i} messages={messages} />;
							})}
						</div>
					</main>
					<footer>
						<Input placeholder="Type a message..." handler={submitHandler} showEmoji />
					</footer>
				</>
			) : (
				<h4>Select a conversation</h4>
			)}
		</section>
	);
};

export default Messenger;
