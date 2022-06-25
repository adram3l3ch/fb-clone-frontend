import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../CreatePost/CreatePost";
import "./editpost.css";

const EditPost = ({ close }) => {
	const {
		post: { editingPost },
	} = useSelector(state => state);
	return (
		<div className="editPost">
			<CreatePost post={editingPost} id="editpost-image" close={close} />
		</div>
	);
};

export default EditPost;
