import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dp } from '../../assets';
import { clearMessage, setChatID, setMessages, setReceiverID } from '../../features/messageSlice';
import { useNavigate } from 'react-router-dom';
import './chatcard.css';
import useFetch from '../../hooks/useFetch';
import { fetchMessage } from '../../API';

const ChatCard = ({ chat }) => {
	const { userDetails } = chat;
	const {
		message: { conversationID },
		users: { usersOnline },
		user: { id, token },
	} = useSelector(state => state);

	const active = conversationID === chat._id;

	const dispatch = useDispatch();
	const customFetch = useFetch();
	const navigate = useNavigate();

	const setChat = () => {
		dispatch(setReceiverID(userDetails._id));
		dispatch(clearMessage());
		dispatch(setChatID(chat._id));
		if (window.innerWidth < 801) navigate('/chat/messenger');
		customFetch(fetchMessage, chat._id, token).then(data => {
			dispatch(setMessages({ messages: data.message, id }));
		});
	};

	return (
		<article className={active ? 'active chatcard' : 'chatcard'} onClick={setChat}>
			<div className={usersOnline.some(u => u.id === userDetails._id) ? 'green' : ''}>
				<img src={userDetails.profileImage || dp} alt='' className='roundimage' />
			</div>
			<div>
				<h2>{userDetails.name || 'User'}</h2>
				<p>{chat.lastMessage || 'Send a hi...'}</p>
			</div>
		</article>
	);
};

export default ChatCard;
