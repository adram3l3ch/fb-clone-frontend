import React, { useEffect, useState } from "react";
import "./profilecard.css";
import { dp, clockIcon, cakeIcon, locationIcon, mailIcon, cameraIcon } from "../../assets";
import SetupProfile from "../SetupProfile/SetupProfile";
import ImageUpload from "../ImageUpload/ImageUpload";
import useFetch from "../../hooks/useFetch";
import useDate from "../../hooks/useDate";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../features/messageSlice";
import Backdrop from "../Backdrop/Backdrop";
import { fetchUsersService } from "../../services/userServices";
import { setIsLoading } from "../../features/modalSlice";

const ProfileCard = ({ id, isOwnProfile }) => {
	const [user, setUser] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchUsersService, { id });
			if (data) setUser(data.user);
		})();
	}, [id, customFetch]);

	let { name, email, about, dob, location, createdAt, profileImage } = user;
	createdAt = `Joined on ${useDate(createdAt)}`;
	dob = useDate(dob);

	const sendMessage = async () => {
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
		<section className="profilecard">
			{isOwnProfile && (
				<>
					<Backdrop show={isEditing} onClose={hideEditing}>
						<SetupProfile close={hideEditing} user={user} setUser={setUser} />
					</Backdrop>
					<Backdrop show={isUploading} onClose={hideUploading}>
						<ImageUpload setUser={setUser} close={hideUploading} />
					</Backdrop>
				</>
			)}
			<header>
				<div>
					<img src={profileImage || dp} alt="profile_image" className="profilecard__dp roundimage" />
					{isOwnProfile && (
						<div className="dp-upload">
							<img src={cameraIcon} alt="change_profile_image" onClick={() => setIsUploading(true)} />
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
				<button onClick={() => setIsEditing(true)}>Edit Profile</button>
			) : (
				<button onClick={sendMessage}>Message</button>
			)}
		</section>
	);
};

export default ProfileCard;
