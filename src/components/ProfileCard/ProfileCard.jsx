import React, { useState } from "react";
import { dp, clockIcon, cakeIcon, locationIcon, mailIcon, cameraIcon } from "../../assets";
import SetupProfile from "../SetupProfile/SetupProfile";
import ImageUpload from "../ImageUpload/ImageUpload";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../features/messageSlice";
import Backdrop from "../Backdrop/Backdrop";
import { setIsLoading, showModal } from "../../features/modalSlice";
import "./profilecard.css";
import { logout } from "../../features/userSlice";
import getDateString from "../../utils/getDateString";

const ProfileCard = ({ id, isOwnProfile }) => {
	const {
		users: { users },
		user: { isGuest },
	} = useSelector(state => state);
	const user = users.find(user => user._id === id) || {};
	const [isEditing, setIsEditing] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let { name, email, about, dob, location, createdAt, profileImage } = user;
	createdAt = `Joined on ${getDateString(createdAt)}`;
	dob = getDateString(dob);

	const sendMessage = async () => {
		if (isGuest) return dispatch(showModal({ msg: "You must be logged in to do this action!!" }));
		dispatch(setIsLoading(true));
		dispatch(createChat({ customFetch, id })).then(() => {
			if (window.innerWidth < 801) navigate("/chat/messenger");
			else navigate("/chat");
			dispatch(setIsLoading(false));
		});
	};

	const hideUploading = () => {
		setIsUploading(false);
	};
	const hideEditing = () => {
		setIsEditing(false);
	};

	return (
		<section className="profilecard gradient-border">
			{isOwnProfile && (
				<>
					<Backdrop show={isEditing} onClose={hideEditing}>
						<SetupProfile close={hideEditing} user={user} />
					</Backdrop>
					<Backdrop show={isUploading} onClose={hideUploading}>
						<ImageUpload close={hideUploading} />
					</Backdrop>
				</>
			)}
			<header>
				<div>
					<img
						src={profileImage || dp}
						alt="profile_image"
						className="profilecard__dp roundimage"
					/>
					{isOwnProfile && (
						<div className="dp-upload">
							<img
								src={cameraIcon}
								alt="change_profile_image"
								onClick={() => setIsUploading(true)}
							/>
						</div>
					)}
				</div>
				<h1>{name || "User"}</h1>
				<h2>{about || "About"}</h2>
			</header>
			<article>
				<div className="profilecard__info">
					<img src={clockIcon} alt="join date" />
					<h3>{createdAt}</h3>
				</div>
				<div className="profilecard__info">
					<img src={locationIcon} alt="location" />
					<h3>{location}</h3>
				</div>
				<div className="profilecard__info">
					<img src={mailIcon} alt="mail" />
					<h3>{email}</h3>
				</div>
				<div className="profilecard__info">
					<img src={cakeIcon} alt="date of birth" />
					<h3>{dob}</h3>
				</div>
			</article>
			{isOwnProfile ? (
				<div className="btn-group">
					<button onClick={() => dispatch(logout())}>Logout</button>
					<button onClick={() => setIsEditing(true)}>Edit Profile</button>
				</div>
			) : (
				<div className="btn-group">
					<button onClick={sendMessage}>Message</button>
					<button disabled>Add Friend</button>
				</div>
			)}
		</section>
	);
};

export default ProfileCard;
