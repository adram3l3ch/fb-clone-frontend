import React from "react";
import { Link } from "react-router-dom";
import { closeIcon } from "../../assets";
import "./maingallery.css";

const MainGallery = ({ posts, onClose }) => {
	return (
		<div className="maingallery">
			<button onClick={onClose} aria-label="close">
				<img src={closeIcon} alt="close" />
			</button>
			{posts.map(post => (
				<Link to={`/post/${post._id}`} key={post._id}>
					<img src={post.image.src} alt="post-images" />
				</Link>
			))}
		</div>
	);
};

export default MainGallery;
