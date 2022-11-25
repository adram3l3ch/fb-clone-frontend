import React from "react";
import { dp } from "../../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/modalSlice";
import "./online.css";

const Online = () => {
	const {
		users: { usersOnline, users },
	} = useSelector(state => state);

	const dispatch = useDispatch();

	const allUsers = () => {
		return users.map(user => (
			<Link to={`/user/${user._id}`} key={user._id} onClick={() => dispatch(toggleSidebar(false))}>
				<div className="user">
					<div>
						<img
							src={user.profileImage || dp}
							loading="lazy"
							alt={user.name + " image"}
							className="roundimage"
						/>
					</div>
					<h3>{user.name}</h3>
				</div>
			</Link>
		));
	};

	const onlineUsers = () => {
		const _usersOnline = users.filter(user => usersOnline.some(u => u.id === user._id));
		return _usersOnline.map(user => (
			<Link to={`/user/${user._id}`} key={user._id} onClick={() => dispatch(toggleSidebar(false))}>
				<div className="user" title={user.name}>
					<div className="green">
						<img
							src={user.profileImage || dp}
							alt={user.name + " image"}
							className="roundimage"
						/>
					</div>
				</div>
			</Link>
		));
	};

	return (
		<section className="online">
			<h2>Users Online - {usersOnline.length}</h2>
			<div className="online-users">{onlineUsers()}</div>
			<h2>All Users - {users.length}</h2>
			{allUsers()}
		</section>
	);
};

export default Online;
