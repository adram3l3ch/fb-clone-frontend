import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import MainGallery from "../MainGallery/MainGallery";
import "./gallery.css";

const Gallery = () => {
	const {
		userPosts: { posts },
	} = useSelector(state => state.post);
	const postsWithImages = posts.filter(post => !!post.image);
	const [isMainGalleryOpen, setIsMainGalleryOpen] = useState(false);

	const hideGallery = () => {
		setIsMainGalleryOpen(false);
	};

	return (
		<section className="gallery">
			<Backdrop show={isMainGalleryOpen} onClose={hideGallery}>
				<MainGallery posts={postsWithImages} />
			</Backdrop>
			<div className="gallery__images">
				{postsWithImages.map(
					(v, i) =>
						i < 3 && (
							<Link to={`/post/${v._id}`} key={v._id}>
								<img src={v?.image.src} alt="postimage" />
							</Link>
						)
				)}
			</div>
			{postsWithImages.length > 3 && (
				<button onClick={() => setIsMainGalleryOpen(true)}>View All</button>
			)}
		</section>
	);
};

export default Gallery;
