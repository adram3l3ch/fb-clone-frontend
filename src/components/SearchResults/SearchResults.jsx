import React from "react";
import { Link } from "react-router-dom";
import "./searchresult.css";

const SearchResults = ({ searchResult, reset }) => {
	return (
		<div className="search-results">
			<div>
				<h3>Posts</h3>
				{searchResult.posts?.map(post => (
					<Link to={`/post/${post._id}`} key={post._id}>
						<p onClick={reset}>{post.caption}</p>
					</Link>
				))}
			</div>
			<div>
				<h3>Users</h3>
				{searchResult.users?.map(user => (
					<Link to={`/user/${user._id}`} key={user._id}>
						<p onClick={reset}>{user.name}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default SearchResults;
