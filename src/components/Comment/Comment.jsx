import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dp } from "../../assets";
import { deleteComment } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import Options from "../Options/Options";
import "./comment.css";

const Comment = ({ comment, user, postId }) => {
	const customFetch = useFetch();
	const dispatch = useDispatch();
	const { id } = useSelector(state => state.user);

	const deleteCommentHandler = () => {
		dispatch(deleteComment({ commentId: comment._id, postId, customFetch }));
	};
	const options = { "Reply(Experimental)": () => {} };
	if (id === user?._id) {
		options.Delete = deleteCommentHandler;
		// options.Edit = () => {};
	}
	return (
		<div className="comment">
			<Link to={`/user/${user?._id}`}>
				<img src={user?.profileImage || dp} alt={`${user?.name}-dp`} className="comment__dp" />
			</Link>
			<div>
				<h3>{user?.name || "user"}</h3>
				<p>{comment?.comment}</p>
			</div>
			<Options options={options} id={comment._id} />
		</div>
	);
};

export default Comment;
