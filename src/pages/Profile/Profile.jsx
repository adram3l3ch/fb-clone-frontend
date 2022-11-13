import React, { useEffect, useState } from "react";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { setUserPosts } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import Posts from "../../components/Post/Posts";
import { fetchPostsService } from "../../services/postServices";
import InfinityScroll from "../../components/InfinityScroll/InfinityScroll";
import "./profile.css";

const Profile = () => {
	const { id } = useParams();
	const {
		userPosts: { posts, page },
	} = useSelector(state => state.post);
	const isOwnProfile = id === useSelector(state => state.user.id);
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			const data = await customFetch(fetchPostsService, { userId: id });
			if (data) dispatch(setUserPosts(data));
			setIsLoading(false);
		})();
	}, [dispatch, id, customFetch]);

	const getNextPage = async () => {
		const data = await customFetch(fetchPostsService, { userId: id, page: page + 1 });
		dispatch(setUserPosts({ posts: posts.concat(data.posts), page: data.page }));
		return data.posts.length;
	};

	return (
		<section className="profile">
			<article className="profile__left">
				<ProfileCard id={id} isOwnProfile={isOwnProfile} />
				<Gallery />
			</article>
			<InfinityScroll getNextPage={getNextPage}>
				<article className="profile__center">
					{isOwnProfile && <CreatePost />}
					{posts.length < 1 && !isLoading && <h2>No Posts</h2>}
					<Posts posts={posts} isLoading={isLoading} />
				</article>
			</InfinityScroll>
			<article className="profile__right gradient-border">
				<Online />
			</article>
		</section>
	);
};

export default Profile;
