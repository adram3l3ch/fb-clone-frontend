import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../CreatePost/CreatePost";
import "./editpost.css";

const EditPost = () => {
	const {
		post: { editingPost },
	} = useSelector(state => state);
	return (
		<div className="editPost">
			<CreatePost post={editingPost} />
		</div>
	);
};

export default EditPost;
