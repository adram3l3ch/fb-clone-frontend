import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dp } from "../../assets";
import { deleteComment, editComment, replyComment } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import Input from "../Input/Input";
import Options from "../Options/Options";
import "./comment.css";

const SingleComment = ({ comment, postId }) => {
	const { users } = useSelector(state => state.users);
	const user = users.find(user => user._id === comment.commentedBy);

	const customFetch = useFetch();
	const dispatch = useDispatch();
	const { id } = useSelector(state => state.user);

	const [isEditing, setIsEditing] = useState(false);
	const [isReplying, setIsReplying] = useState(false);

	const deleteCommentHandler = () => {
		if (comment.commentId) {
			dispatch(
				deleteComment({ replyId: comment._id, postId, customFetch, commentId: comment.commentId })
			);
		} else dispatch(deleteComment({ commentId: comment._id, postId, customFetch }));
	};

	const editCommentHandler = value => {
		if (comment.commentId) {
			dispatch(
				editComment({
					replyId: comment._id,
					postId,
					customFetch,
					commentId: comment.commentId,
					comment: value,
				})
			);
		} else dispatch(editComment({ commentId: comment._id, postId, comment: value, customFetch }));
		setIsEditing(false);
	};

	const replyHandler = value => {
		dispatch(
			replyComment({
				commentId: comment.commentId || comment._id,
				id: postId,
				comment: value,
				replyTo: user?.name,
				customFetch,
			})
		);
		setIsReplying(false);
	};

	const options = { Reply: () => setIsReplying(true) };
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
					<p className="comment__text">
						{comment?.replyTo && <span>@{comment.replyTo}</span>} {comment?.comment}
					</p>
				</div>
				<Options options={options} id={comment._id} />
			</div>
			{isEditing && (
				<Input
					placeholder="Edit Comment"
					handler={editCommentHandler}
					initialValue={comment?.comment}
				/>
			)}
			{isReplying && <Input placeholder={`Reply to ${user?.name}`} handler={replyHandler} />}
		</div>
	);
};

const Comment = props => {
	return (
		<div className="commentAndReplies">
			<SingleComment {...props} />
			<div className="replies">
				{props.comment?.replies?.map(reply => (
					<SingleComment comment={reply} postId={props.postId} />
				))}
			</div>
		</div>
	);
};

export default Comment;
