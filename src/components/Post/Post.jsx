import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setEditingPost, commentPost, likePost } from "../../features/postSlice";
import { dp } from "../../assets";
import Input from "../Input/Input";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Options from "../Options/Options";
import "./post.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import getDateString from "../../utils/getDateString";
import Share from "./Share";
import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import ImageViewer from "./ImageViewer";
import useConfirmation from "../Confirmation/useConfirmation";

const Post = ({ singlepost, post }) => {
	const createdAt = getDateString(post.createdAt);
	const [showShare, setShowShare] = useState(false);
	const [showImage, setShowImage] = useState(false);

	const dispatch = useDispatch();
	const customFetch = useFetch();
	const navigate = useNavigate();

	//global states
	const {
		user: { id },
		users: { usersOnline },
	} = useSelector(state => state);
	const isOwnPost = id === post.createdBy;
	const isLiked = post.likes?.includes(id);
	const isOnline = usersOnline.some(user => user.id === post.createdBy);

	const likeHandler = () => {
		dispatch(likePost({ customFetch, id: post._id, isLiked }));
	};

	const commentHandler = comment => {
		dispatch(commentPost({ customFetch, id: post._id, comment }));
	};

	const deleteHandler = () => {
		dispatch(deletePost({ customFetch, id: post._id }));
		singlepost && navigate(-1);
	};

	const editHandler = () => {
		dispatch(setEditingPost(post));
	};

	const { Confirmation, toggleShow } = useConfirmation(
		deleteHandler,
		"Are you sure, You want to delete the post?"
	);

	const options = {
		Delete: toggleShow,
		Edit: editHandler,
	};

	const getParagraphs = text => {
		const paragraphArray = text.split(/[\n\r]/g);
		return paragraphArray.map(
			(para, i) =>
				para && (
					<p className="post__caption" key={i}>
						{para}
					</p>
				)
		);
	};

	const getNumberOfLikes = () => {
		if (post.likes?.length) {
			return post.likes?.includes(id)
				? post.likes?.length - 1 === 0
					? "You"
					: post.likes?.length - 1 === 1
					? "You and 1 more"
					: `You and ${post.likes.length - 1} others`
				: post.likes?.length;
		}
		return "";
	};

	const postDetails = () => {
		const toggleImage = () => setShowImage(!showImage);
		return (
			<>
				{post.caption && getParagraphs(post.caption)}
				{singlepost && (
					<Backdrop show={showImage} onClose={toggleImage}>
						<ImageViewer image={post.image?.src} />
					</Backdrop>
				)}
				{post.image?.src && (
					<img
						src={post.image.src}
						alt="post_image"
						className="post__image"
						loading="lazy"
						onClick={toggleImage}
					/>
				)}
			</>
		);
	};

	return (
		<article className={singlepost ? "post halfborder single" : "post gradient-border"}>
			{Confirmation}
			<Backdrop show={showShare} onClose={() => setShowShare(false)}>
				<Share post={post} />
			</Backdrop>
			<header>
				<Link to={`/user/${post.createdBy}`} className={isOnline ? "green" : ""}>
					<img
						src={post.userDetails?.image || dp}
						alt="profileImage"
						loading="lazy"
						className="post__dp roundimage"
					/>
				</Link>
				<div>
					<h3>{post.userDetails?.name}</h3>
					<p>{createdAt}</p>
				</div>
				{isOwnPost && <Options options={options} id={post._id} />}
			</header>
			<div className="post__details">
				{singlepost ? postDetails() : <Link to={`/post/${post._id}`}>{postDetails()}</Link>}
			</div>
			<div className="post__footer">
				<div className="group">
					<div onClick={likeHandler}>{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}</div>
					<p>{getNumberOfLikes()}</p>
				</div>
				{singlepost || <Input placeholder={"Write a comment..."} handler={commentHandler} />}
				<Link className={singlepost ? "comment__icon group" : "group"} to={`/post/${post._id}`}>
					<BiCommentDetail />
					<p>{post.comments.length}</p>
				</Link>
				<div className="group" onClick={() => setShowShare(true)} title="share">
					<IoIosShareAlt />
				</div>
			</div>
		</article>
	);
};

export default Post;
