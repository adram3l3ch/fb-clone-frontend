import React, { useEffect } from "react";
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
import "./profile.css";

const Profile = () => {
	const { id } = useParams();
	const { userPosts } = useSelector(state => state.post);
	const isOwnProfile = id === useSelector(state => state.user.id);
	const mainRef = React.useRef(null);
	const nextPageLoaderRef = React.useRef(null);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchPostsService, { userId: id });
			if (data) dispatch(setUserPosts(data.posts));
		})();
	}, [dispatch, id, customFetch]);

	const getNextPage = () => {
		nextPageLoaderRef.current?.getNextPage?.();
	};

	return (
		<section className="profile">
			<article className="profile__left">
				<ProfileCard id={id} isOwnProfile={isOwnProfile} />
				<Gallery />
			</article>
			<article className="profile__center" ref={mainRef} onScroll={getNextPage}>
				{isOwnProfile && <CreatePost />}
				{userPosts.length < 1 && <h2>No Posts</h2>}
				<Posts posts={userPosts} containerRef={mainRef} user={{ id }} nextPageLoaderRef={nextPageLoaderRef} />
			</article>
			<article className="profile__right">
				<Online />
			</article>
		</section>
	);
};

export default Profile;
