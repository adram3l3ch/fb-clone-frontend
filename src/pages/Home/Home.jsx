import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../API';
import CreatePost from '../../components/CreatePost/CreatePost';
import Online from '../../components/Online/Online';
import Post from '../../components/Post/Post';
import { updatePost } from '../../features/postSlice';
import useFetch from '../../hooks/useFetch';
import './home.css';

const Home = () => {
	const {
		post: { posts },
		user: { token },
	} = useSelector(state => state);

	const [loading, setLoading] = React.useState(false);
	const [isFinished, setIsFinished] = React.useState(false);
	const [pageNumber, setPageNumber] = React.useState(1);
	const postsRef = React.useRef(null);
	const mainRef = React.useRef(null);

	const customFetch = useFetch();
	const dispatch = useDispatch();

	const getNextPage = async () => {
		const mainHeight = mainRef.current.getBoundingClientRect().height;
		const postsBottom = postsRef.current.getBoundingClientRect().bottom;
		if (postsBottom - mainHeight < 110 && !isFinished && !loading) {
			setLoading(true);
			const { posts: next } = await customFetch(fetchPosts, token, '', '', pageNumber + 1);
			if (next.length === 0) setIsFinished(true);
			setPageNumber(pageNumber + 1);
			dispatch(updatePost([...posts, ...next]));
			setLoading(false);
		}
	};

	return (
		<section className='home'>
			<main className='home__left' onScroll={getNextPage} ref={mainRef}>
				<CreatePost />
				<div className='posts' ref={postsRef}>
					{posts.map(post => (
						<Post post={post} key={post._id} />
					))}
					{loading && <div className='spinner'></div>}
				</div>
			</main>
			<aside className='home__right'>
				<Online />
			</aside>
		</section>
	);
};

export default React.memo(Home);
