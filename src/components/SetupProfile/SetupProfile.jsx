import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../features/userSlice";
import { setPosts } from "../../features/postSlice";
import { showModal } from "../../features/modalSlice";
import { updateUser } from "../../API";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import "./setupprofile.css";
import { useEffect } from "react";

const SetupProfile = ({ close, user, setUser }) => {
	const [userDetails, setUserDetails] = useState({
		name: "",
		about: "",
		location: "",
	});
	const { token } = JSON.parse(Cookies.get("user"));

	useEffect(() => {
		user._id &&
			setUserDetails({
				name: user.name,
				about: user.about,
				location: user.location,
			});
	}, [user]);

	const _updateUser = (key, e) => {
		setUserDetails(user => ({
			...user,
			[key]: e.target.value,
		}));
	};

	const dispatch = useDispatch();
	const customFetch = useFetch();

	const clickHandler = async e => {
		e.preventDefault();
		const data = await customFetch(
			updateUser,
			userDetails.name,
			userDetails.about,
			userDetails.location,
			token
		);
		if (data) {
			setUser(data.user);
			close();
			dispatch(update({ name: data.user.name }));
			dispatch(setPosts({ customFetch }));
			dispatch(showModal({ msg: "Success" }));
		}
	};

	return (
		<form onSubmit={clickHandler} className="setup">
			<label htmlFor="">Username</label>
			<input
				type="text"
				value={userDetails.name}
				required
				onChange={e => _updateUser("name", e)}
			/>
			<label htmlFor="">About</label>
			<input
				type="text"
				value={userDetails.about}
				onChange={e => _updateUser("about", e)}
			/>
			<label htmlFor="">Location</label>
			<input
				type="text"
				value={userDetails.location}
				onChange={e => _updateUser("location", e)}
			/>
			<button type="submit">Continue</button>
			<button onClick={close} type="reset">
				Cancel
			</button>
		</form>
	);
};

export default SetupProfile;
