import React, { useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../API';
import { setUserPosts, updatePost } from '../../features/postSlice';
import useFetch from '../../hooks/useFetch';
import Post from './Post';

const Posts = ({ posts, containerRef, user, nextPageLoaderRef }) => {
	const postsRef = useRef(null);
	const [isFinished, setIsFinished] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	useImperativeHandle(nextPageLoaderRef, () => ({
		getNextPage: () => getNextPage(),
	}));

	const {
		user: { token },
	} = useSelector(state => state);

	const getNextAllPosts = async () => {
		const { posts: newPosts } = await customFetch(fetchPosts, token, '', '', pageNumber + 1);
		return newPosts;
	};
	const getNextUserPosts = async id => {
		const { posts: newPosts } = await customFetch(fetchPosts, token, id, '', pageNumber + 1);
		return newPosts;
	};

	const getNextPage = async () => {
		const mainHeight = containerRef.current.getBoundingClientRect().height;
		const postsBottom = postsRef.current.getBoundingClientRect().bottom;
		if (postsBottom - mainHeight < 130 && !isFinished && !loading) {
			setLoading(true);
			let next;
			if (user) {
				next = await getNextUserPosts(user.id);
				dispatch(setUserPosts([...posts, ...next]));
			} else {
				next = await getNextAllPosts();
				dispatch(updatePost([...posts, ...next]));
			}
			if (next.length === 0) setIsFinished(true);
			setPageNumber(pageNumber + 1);
			setLoading(false);
		}
	};

	return (
		<div className='posts' ref={postsRef}>
			{posts.map(post => (
				<Post post={post} key={post._id} />
			))}
			{loading && <div className='spinner'></div>}
		</div>
	);
};

export default Posts;
