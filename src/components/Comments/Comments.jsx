import React from "react";
import Comment from "../Comment/Comment";
import "./comments.css";
import { useSelector } from "react-redux";

const Comments = ({ post }) => {
	const { users } = useSelector(state => state.users);

	return (
		<div className="comments">
			<div>
				<h3>{(post?.comments?.length || "") + " comments"}</h3>
				{post?.comments?.map((comment, i) => (
					<Comment
						key={comment._id}
						comment={comment}
						user={users.find(user => user._id === comment.commentedBy)}
					/>
				))}
			</div>
		</div>
	);
};

export default Comments;
