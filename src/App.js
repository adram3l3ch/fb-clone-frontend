import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
//utilities
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import useFetch from './hooks/useFetch.js';
import SERVER_URI from './serverUri';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/userSlice.js';
import { setSocket } from './features/socketSlice';
import { showModal } from './features/modalSlice.js';
import { addMessages, updateChats, _getChats } from './features/messageSlice.js';
import { addOnline, getUsers } from './features/usersSlice.js';
import { setPosts } from './features/postSlice.js';
//components
import SinglePost from './pages/Singlepost/SinglePost.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Appbar from './components/Appbar/Appbar';
import Auth from './pages/Auth/Auth';
import Modal from './components/Modal/Modal.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Loading from './components/Loading/Loading.jsx';
import Chat from './pages/Chat/Chat.jsx';
import Messenger from './pages/Messenger/Messenger.jsx';
import Online from './components/Online/Online.jsx';

function App() {
	const dispatch = useDispatch();
	const customFetch = useFetch();
	const {
		user: { id },
		modal: { isLoading, isSidebarVisible },
		socket: { socket },
		message: { to },
	} = useSelector(state => state);

	//login
	useEffect(() => {
		const user = Cookies.get('user');
		user && dispatch(login(JSON.parse(user)));
	}, [dispatch]);

	//get users and chats and init socket
	useEffect(() => {
		if (id) {
			const query = `id=${id}`;
			dispatch(getUsers({ customFetch }));
			dispatch(_getChats({ customFetch }));
			dispatch(setPosts({ customFetch }));
			dispatch(setSocket(io(SERVER_URI, { query })));
		}
	}, [id, customFetch, dispatch]);

	//socket events
	useEffect(() => {
		if (socket) {
			socket.on('usersOnline', users => dispatch(addOnline(users)));
		}
	}, [socket, dispatch]);

	useEffect(() => {
		if (socket) {
			socket.off('receive message').on('receive message', (message, senderID) => {
				dispatch(showModal({ msg: '1 new message' }));
				dispatch(updateChats({ lastMessage: message, id: senderID, customFetch }));
				senderID === to && dispatch(addMessages({ text: message }));
			});
		}
	}, [customFetch, dispatch, socket, to]);

	return (
		<div className='container'>
			{isLoading && <Loading />}
			<Modal />
			{!id ? (
				<Auth />
			) : (
				<>
					<Appbar />
					<div className={isSidebarVisible ? 'sidebar visible' : 'sidebar'}>
						<Online />
					</div>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/post/:id' element={<SinglePost />} />
						<Route path='/user/:id' element={<Profile />} />
						<Route path='/chat' element={<Chat />} />
						<Route path='/chat/messenger' element={<Messenger />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</>
			)}
		</div>
	);
}

export default App;
