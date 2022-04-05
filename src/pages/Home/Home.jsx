import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/CreatePost/CreatePost';
import Online from '../../components/Online/Online';
import Post from '../../components/Post/Post';
import './home.css';

const Home = () => {
	const { posts } = useSelector(state => state.post);

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
