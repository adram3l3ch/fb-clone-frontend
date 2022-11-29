import React from "react";
import Comment from "../Comment/Comment";
import "./comments.css";

const Comments = ({ post }) => {
	return (
		<div className="comments">
			<div>
				<h3>{(post?.comments?.length || "") + " comments"}</h3>
				{post?.comments?.map(comment => (
					<div className="commentAndReplies" key={comment._id}>
						<Comment comment={comment} postId={post._id} />
						{!!comment.replies.length && (
							<div className="replies">
								{comment.replies?.map(reply => (
									<Comment comment={reply} key={reply._id} postId={post._id} />
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Comments;
