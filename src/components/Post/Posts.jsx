import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
	return (
		<div className="posts">
			{posts.map(post => (
				<Post post={post} key={post._id} />
			))}
		</div>
	);
};

export default Posts;
