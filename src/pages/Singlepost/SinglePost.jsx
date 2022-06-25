import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Comments/Comments";
import Post from "../../components/Post/Post";
import Online from "../../components/Online/Online";
import { fetchPost } from "../../API";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { _commentPost } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import "./singlepost.css";

const SinglePost = () => {
	const { id } = useParams();
	const { token } = JSON.parse(Cookies.get("user"));
	const [post, setPost] = useState({});

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchPost, id, token);
			setPost(data.posts);
		})();
	}, [id, token, dispatch, customFetch]);

	const commentHandler = async comment => {
		dispatch(
			_commentPost({ customFetch, id: post._id, comment, singlepost: true })
		);
	};

	return (
		<section className="singlepost">
			<div className="singlepost__left">
				<article>{post._id && <Post singlepost={true} post={post} />}</article>
				<article className="singlepost__comments">
					<div>
						<Comments post={post} />
						<Input placeholder="Write a comment..." handler={commentHandler} />
					</div>
				</article>
			</div>
			<article className="singlepost__right">
				<Online />
			</article>
		</section>
	);
};

export default SinglePost;
