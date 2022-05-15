import React, { useEffect } from 'react';
import Gallery from '../../components/Gallery/Gallery';
import Online from '../../components/Online/Online';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useParams } from 'react-router';
import CreatePost from '../../components/CreatePost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../API';
import Cookies from 'js-cookie';
import { setUserPosts } from '../../features/postSlice';
import './profile.css';
import useFetch from '../../hooks/useFetch';
import Posts from '../../components/Post/Posts';

const Profile = () => {
	const { id } = useParams();
	const { token } = JSON.parse(Cookies.get('user'));
	const { userPosts } = useSelector(state => state.post);
	const isOwnProfile = id === useSelector(state => state.user.id);
	const mainRef = React.useRef(null);
	const nextPageLoaderRef = React.useRef(null);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		(async () => {
			const data = await customFetch(fetchPosts, token, id);
			if (data) dispatch(setUserPosts(data.posts));
		})();
	}, [token, dispatch, id, customFetch]);

	const getNextPage = () => {
		nextPageLoaderRef.current?.getNextPage?.();
	};

	return (
		<section className='profile'>
			<article className='profile__left'>
				<ProfileCard id={id} isOwnProfile={isOwnProfile} />
				<Gallery />
			</article>
			<article className='profile__center'>
				<div ref={mainRef} onScroll={getNextPage}>
					{isOwnProfile && <CreatePost />}
					{userPosts.length < 1 && <h2>No Posts</h2>}
					<Posts
						posts={userPosts}
						containerRef={mainRef}
						user={{ id }}
						nextPageLoaderRef={nextPageLoaderRef}
					/>
				</div>
			</article>
			<article className='profile__right'>
				<Online />
			</article>
		</section>
	);
};

export default Profile;
