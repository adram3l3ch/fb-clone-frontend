import React from "react";
import Loading from "./Loading";
import Post from "./Post";

const Posts = ({ posts, isLoading }) => {
	return (
		<div className="posts">
			{isLoading ? <Loading /> : posts.map(post => <Post post={post} key={post._id} />)}
		</div>
	);
};

export default Posts;
