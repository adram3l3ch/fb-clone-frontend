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
	const { id } = useSelector(state => state.user);
	const isOwnPost = id === post.createdBy;
	const isLiked = post?.likes?.includes(id);

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
		return paragraphArray.map(para => para && <p className='post__caption'>{para}</p>);
	};

	return (
		<article className={singlepost ? 'post halfborder' : 'post'}>
			<header>
				<Link to={`/user/${post.createdBy}`}>
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
			<Link to={`/post/${post._id}`} className='post__details'>
				{post.caption && getParagraphs(post.caption)}
				{post.image?.src && (
					<img src={post.image?.src} alt='post_image' className='post__image' />
				)}
			</Link>
			<div className='post__footer'>
				<div className='post__reactions'>
					<img src={isLiked ? likeIcon : likeOutlined} alt='like' onClick={likeHandler} />
					<p>{post.likes.length || ''}</p>
				</div>
				{singlepost || (
					<Input placeholder={'Write a comment...'} handler={commentHandler} />
				)}
			</div>
		</article>
	);
};

export default Post;
