import React from 'react';
import { dp } from '../../assets';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../features/modalSlice';
import './online.css';

const Online = () => {
	const {
		socket: { usersOnline, users },
	} = useSelector(state => state);

	const dispatch = useDispatch();

	return (
		<section className='online'>
			<div>
				<h2>Users</h2>
				{users.map(user => (
					<Link
						to={`/user/${user._id}`}
						key={user._id}
						onClick={() => {
							dispatch(toggleSidebar(false));
						}}
					>
						<div className='user'>
							<div
								className={usersOnline.some(u => u.id === user._id) ? 'green' : ''}
							>
								<img
									src={user.profileImage || dp}
									alt={user.name + ' image'}
									className='roundimage'
								/>
							</div>
							<h3>{user.name}</h3>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Online;
