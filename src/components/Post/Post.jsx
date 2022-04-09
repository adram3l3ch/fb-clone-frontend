import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, _commentPost, _likePost } from '../../features/postSlice';
import { dp, likeIcon, likeOutlined } from '../../assets';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useDate from '../../hooks/useDate';
import './post.css';
import Options from '../Options/Options';

const Post = ({ singlepost, post }) => {
	const createdAt = useDate(post.createdAt);

	const dispatch = useDispatch();
	const customFetch = useFetch();

	//global states
	const {
		user: { id },
		users: { usersOnline },
	} = useSelector(state => state);
	const isOwnPost = id === post.createdBy;
	const isLiked = post?.likes?.includes(id);
	const isOnline = usersOnline.some(user => user.id === post.createdBy);

	const likeHandler = async () => {
		dispatch(_likePost({ customFetch, id: post._id, isLiked, singlepost }));
	};

	const commentHandler = async comment => {
		dispatch(_commentPost({ customFetch, id: post._id, comment }));
	};

	const deleteHandler = async () => {
		dispatch(removePost({ customFetch, id: post._id }));
	};

	const getParagraphs = text => {
		const paragraphArray = text.split(/[\n\r]/g);
		return paragraphArray.map(
			(para, i) =>
				para && (
					<p className='post__caption' key={i}>
						{para}
					</p>
				)
		);
	};

	const likes = () => {
		if (post.likes.length) {
			return post.likes.includes(id)
				? post.likes.length - 1 === 0
					? 'You'
					: post.likes.length - 1 === 1
					? 'You and 1 more'
					: `You and ${post.likes.length - 1} others`
				: post.likes.length;
		}
		return false;
	};

	const postDetails = () => {
		return (
			<>
				{post.caption && getParagraphs(post.caption)}
				{post.image?.src && (
					<img src={post.image?.src} alt='post_image' className='post__image' />
				)}
			</>
		);
	};

	return (
		<article className={singlepost ? 'post halfborder single' : 'post'}>
			<header>
				<Link to={`/user/${post.createdBy}`} className={isOnline ? 'green' : ''}>
					<img
						src={post.userDetails.image || dp}
						alt='profileImage'
						className='post__dp roundimage'
					/>
				</Link>
				<div>
					<h3>{post.userDetails.name}</h3>
					<p>{createdAt}</p>
				</div>
				{isOwnPost && <Options deleteHandler={deleteHandler} />}
			</header>
			<div className='post__details'>
				{singlepost ? (
					postDetails()
				) : (
					<Link to={`/post/${post._id}`} className='post__details'>
						{postDetails()}
					</Link>
				)}
			</div>
			<div className='post__footer'>
				<div className='post__reactions'>
					<img src={isLiked ? likeIcon : likeOutlined} alt='like' onClick={likeHandler} />
					<p>{likes() || ''}</p>
				</div>
				{singlepost || (
					<Input placeholder={'Write a comment...'} handler={commentHandler} />
				)}
			</div>
		</article>
	);
};

export default Post;
