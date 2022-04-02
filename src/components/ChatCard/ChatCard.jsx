import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dp } from '../../assets';
import { setChatID, setReceiverID } from '../../features/messageSlice';
import { useNavigate } from 'react-router-dom';
import './chatcard.css';

const ChatCard = ({ chat, users }) => {
	const { id } = useSelector(state => state.user);
	const {
		message: { conversationID },
		socket: { usersOnline },
	} = useSelector(state => state);

	const [receiver, setReceiver] = useState({});

	const receiverId = chat.members.find(member => member !== id);
	const active = conversationID === chat._id;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setReceiver(users.find(user => user._id === receiverId));
	}, [receiverId, users]);

	const setChat = () => {
		dispatch(setChatID(chat._id));
		dispatch(setReceiverID(receiverId));
		if (window.innerWidth < 801) navigate('/chat/messenger');
	};

	return (
		<article className={active ? 'active chatcard' : 'chatcard'} onClick={setChat}>
			<div className={usersOnline.some(u => u.id === receiverId) ? 'green' : ''}>
				<img src={receiver.profileImage || dp} alt='' className='roundimage' />
			</div>
			<div>
				<h2>{receiver.name || 'User'}</h2>
				<p>{chat.lastMessage || 'Send a hi...'}</p>
			</div>
		</article>
	);
};

export default ChatCard;
