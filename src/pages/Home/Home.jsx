import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost/CreatePost";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import Online from "../../components/Online/Online";
import Posts from "../../components/Post/Posts";
import { updatePost } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import { fetchPostsService } from "../../services/postServices";
import "./home.css";

const Home = () => {
	const {
		post: { posts },
	} = useSelector(state => state);

	const customFetch = useFetch();
	const dispatch = useDispatch();

	const getNextPage = async page => {
		const { posts: newPosts } = await customFetch(fetchPostsService, { page });
		dispatch(updatePost([...posts, ...newPosts]));
		return newPosts.length;
	};

	return (
		<section className="home">
			<InfinityScroll getNextPage={getNextPage}>
				<main className="home__left">
					<CreatePost />
					<Posts posts={posts} />
				</main>
			</InfinityScroll>
			<aside className="home__right">
				<Online />
			</aside>
		</section>
	);
};

export default Home;
