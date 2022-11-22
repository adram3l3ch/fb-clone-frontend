import React from "react";
import { dp } from "../../assets";
import { AiFillHeart } from "react-icons/ai";

export const Post = ({ singlepost }) => (
	<article className={singlepost ? "post halfborder single" : "post gradient-border"}>
		<header>
			<img src={dp} alt="profileImage" className="post__dp roundimage" />
			<div>
				<div className="loadingBox" style={{ width: "70px", height: "10px" }}></div>
				<div
					className="loadingBox"
					style={{ width: "100px", height: "10px", marginTop: "0.5em" }}
				></div>
			</div>
		</header>
		<div className="post__details">
			<div
				className="loadingBox"
				style={{ width: "100%", height: singlepost ? "60vh" : "400px", borderRadius: "1em" }}
			></div>
		</div>
		<div className="post__footer">
			<div className="group">
				<AiFillHeart />
				<div className="loadingBox" style={{ width: "250px", height: "20px" }}></div>
			</div>
		</div>
	</article>
);

const Loading = () => {
	return (
		<>
			<Post />
			<Post />
			<Post />
		</>
	);
};

export default Loading;
