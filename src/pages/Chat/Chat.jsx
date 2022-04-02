import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChats, fetchUsersByIDs } from '../../API';
import ChatCard from '../../components/ChatCard/ChatCard';
import useFetch from '../../hooks/useFetch';
import Messenger from '../../components/Messenger/Messenger';
import './chat.css';

const Chat = () => {
	const {
		user: { token, id },
	} = useSelector(state => state);

	const [chats, setChats] = useState([]);
	const [users, setUsers] = useState([]);
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(getChats, token);
			const userIDs = data?.chat.map(chat => chat.members.find(member => member !== id));
			const users = await customFetch(fetchUsersByIDs, userIDs, token);
			setUsers(users?.user);
			if (data) setChats(data.chat);
		})();
	}, [customFetch, token, id]);

	return (
		<main className='chat__page'>
			<section className='chat__page__cards'>
				{chats.map(chat => (
					<ChatCard chat={chat} users={users} key={chat._id} />
				))}
			</section>
			<Messenger />
		</main>
	);
};

export default Chat;
