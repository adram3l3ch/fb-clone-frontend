import React, { useEffect } from 'react';
import SinglePost from './pages/Singlepost/SinglePost.jsx';
import Appbar from './components/Appbar/Appbar';
import Profile from './pages/Profile/Profile.jsx';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth/Auth';
import Cookies from 'js-cookie';
import { login } from './features/userSlice.js';
import { setSocket, setUsers, usersOnline } from './features/socketSlice';
import Modal from './components/Modal/Modal.jsx';
import Home from './pages/Home/Home.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Loading from './components/Loading/Loading.jsx';
import { io } from 'socket.io-client';
import Chat from './pages/Chat/Chat.jsx';
import Messenger from './pages/Messenger/Messenger.jsx';
import Online from './components/Online/Online.jsx';
import { hideModal, showModal } from './features/modalSlice.js';
import useFetch from './hooks/useFetch.js';
import { fetchUsers } from './API.js';
import { addMessages } from './features/messageSlice.js';

function App() {
	const dispatch = useDispatch();
	const customFetch = useFetch();
	const {
		user: { id, token },
		modal: { isLoading, isSidebarVisible },
		socket: { socket },
		message: { to },
	} = useSelector(state => state);

	useEffect(() => {
		const user = Cookies.get('user');
		user && dispatch(login(JSON.parse(user)));
	}, [dispatch]);

	useEffect(() => {
		if (token) {
			(async () => {
				const data = await customFetch(fetchUsers, token);
				data && dispatch(setUsers(data.user));
			})();
		}
	}, [token, customFetch, dispatch]);

	useEffect(() => {
		console.log('render');
	}, [customFetch]);

	useEffect(() => {
		if (id) {
			// dispatch(setSocket(io('http://localhost:5000')));
			dispatch(setSocket(io('https://adramelech-fb-clone.herokuapp.com')));
		}
	}, [id, dispatch]);

	useEffect(() => {
		if (socket) {
			socket.emit('add user', id);
			socket.on('usersOnline', users => {
				dispatch(usersOnline(users));
			});
			if (to) {
				socket.on('receive message', (message, senderID) => {
					dispatch(showModal('1 new message'));
					setTimeout(() => dispatch(hideModal()), 4000);
					senderID === to &&
						dispatch(
							addMessages({
								text: message,
								send: false,
								createdAt: String(new Date()),
							})
						);
				});
			}
		}
	}, [socket, id, dispatch, to]);

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
