import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dp } from "../../assets";
import { deleteComment, editComment } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import Input from "../Input/Input";
import Options from "../Options/Options";
import "./comment.css";

const Comment = ({ comment, user, postId }) => {
	const customFetch = useFetch();
	const dispatch = useDispatch();
	const { id } = useSelector(state => state.user);
	const [isEditing, setIsEditing] = useState(false);

	const deleteCommentHandler = () => {
		dispatch(deleteComment({ commentId: comment._id, postId, customFetch }));
	};

	const editCommentHandler = value => {
		dispatch(editComment({ commentId: comment._id, postId, comment: value, customFetch }));
		setIsEditing(false);
	};

	const options = { Reply: () => {} };
	if (id === user?._id) {
		options.Delete = deleteCommentHandler;
		options.Edit = () => setIsEditing(true);
	}
	return (
		<div className="comment__group">
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
			{isEditing && (
				<Input
					placeholder="Edit Comment"
					handler={editCommentHandler}
					showEmoji
					initialValue={comment?.comment}
				/>
			)}
		</div>
	);
};

export default Comment;
