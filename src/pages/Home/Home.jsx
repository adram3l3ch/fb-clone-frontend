import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../../components/CreatePost/CreatePost';
import Online from '../../components/Online/Online';
import Post from '../../components/Post/Post';
import { setPosts } from '../../features/postSlice';
import useFetch from '../../hooks/useFetch';
import './home.css';

const Home = () => {
	const { posts } = useSelector(state => state.post);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useEffect(() => {
		dispatch(setPosts({ customFetch }));
	}, [dispatch, customFetch]);

	return (
		<section className='home'>
			<main className='home__left'>
				<CreatePost />
				{posts.map(post => (
					<Post post={post} key={post._id} />
				))}
			</main>
			<aside className='home__right'>
				<Online />
			</aside>
		</section>
	);
};

export default Home;
