import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost/CreatePost";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import Online from "../../components/Online/Online";
import Posts from "../../components/Post/Posts";
import { setAllPosts } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import { fetchPostsService } from "../../services/postServices";
import "./home.css";

const Home = () => {
	const {
		allPosts: { posts, page },
	} = useSelector(state => state.post);

	const customFetch = useFetch();
	const dispatch = useDispatch();

	const getNextPage = async () => {
		const data = await customFetch(fetchPostsService, { page: page + 1 });
		dispatch(setAllPosts({ posts: posts.concat(data.posts), page: data.page }));
		return data.posts.length;
	};

	return (
		<section className="home">
			<InfinityScroll getNextPage={getNextPage}>
				<main className="home__left">
					<CreatePost />
					<Posts posts={posts} />
				</main>
			</InfinityScroll>
			<aside className="home__right gradient-border">
				<Online />
			</aside>
		</section>
	);
};

export default Home;
