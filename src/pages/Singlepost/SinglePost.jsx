import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Comments/Comments";
import Post from "../../components/Post/Post";
import Online from "../../components/Online/Online";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setSinglePost, commentPost } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { fetchPostsService } from "../../services/postServices";
import "./singlepost.css";

const SinglePost = () => {
	const { id } = useParams();
	const { token } = JSON.parse(Cookies.get("user"));
	const { singlePost } = useSelector(state => state.post);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchPostsService, { id });
			if (data) dispatch(setSinglePost(data.post));
		})();
	}, [id, token, dispatch, customFetch]);

	const commentHandler = async comment => {
		dispatch(commentPost({ customFetch, id: singlePost._id, comment }));
	};

	return (
		<section className="singlepost">
			<div className="singlepost__left">
				<Post singlepost={true} post={singlePost} />
				<article className="singlepost__comments">
					<Comments post={singlePost} />
					<Input placeholder="Write a comment..." handler={commentHandler} showEmoji />
				</article>
			</div>
			<article className="singlepost__right gradient-border">
				<Online />
			</article>
		</section>
	);
};

export default SinglePost;
