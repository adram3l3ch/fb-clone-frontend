import React from "react";
import Comment from "../Comment/Comment";
import "./comments.css";

const Comments = ({ post }) => {
	return (
		<div className="comments">
			<div>
				<h3>{(post?.comments?.length || "") + " comments"}</h3>
				{post?.comments?.map(comment => (
					<Comment key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</div>
	);
};

export default Comments;
