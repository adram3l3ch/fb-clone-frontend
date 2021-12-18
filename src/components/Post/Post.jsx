import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, deletePost, likePost } from "../../API";
import { popPost, setPosts, setSinglePost } from "../../features/postSlice";
import { dp, likeIcon, likeOutlined } from "../../assets";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import { hideModal, showModal } from "../../features/modalSlice";
import useFetch from "../../hooks/useFetch";
import useDate from "../../hooks/useDate";
import "./post.css";
import Options from "../Options/Options";

const Post = ({ singlepost, post }) => {
    const { token } = JSON.parse(Cookies.get("user"));
    const createdAt = useDate(post.createdAt);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    //global states
    const { id } = useSelector(state => state.user);
    let { posts } = useSelector(state => state.post);
    const isOwnPost = id === post.createdBy;
    const isLiked = post?.likes?.includes(id);

    const slicePosts = (posts, data) => {
        const index = posts.reduce((acc, post, i) => {
            if (post._id === data.posts._id) return i;
            return acc;
        }, -1);
        let slicedPosts = [...posts];
        slicedPosts.splice(index, 1, data.posts);
        return slicedPosts;
    };

    const likeHandler = async () => {
        const data = await customFetch(likePost, post._id, token, !isLiked);
        if (data) {
            if (singlepost) {
                dispatch(setSinglePost(data.posts));
            } else {
                let slicedPosts = slicePosts(posts, data);
                dispatch(setPosts(slicedPosts));
            }
        }
    };

    const commentHandler = async comment => {
        const data = await await customFetch(commentPost, post._id, comment, token);
        if (data) {
            let slicedPosts = slicePosts(posts, data);
            dispatch(setPosts(slicedPosts));
        }
    };

    const deleteHandler = async () => {
        await customFetch(deletePost, post._id, token);
        dispatch(popPost(post._id));
        dispatch(showModal("Deleted"));
        setTimeout(() => dispatch(hideModal()), 4000);
    };

    return (
        <article className={singlepost ? "post halfborder" : "post"}>
            <header>
                <Link to={`/user/${post.createdBy}`}>
                    <img src={post.userDetails.image || dp} alt="profileImage" className="post__dp roundimage" />
                </Link>
                <div>
                    <h3>{post.userDetails.name}</h3>
                    <p>{createdAt}</p>
                </div>
                {isOwnPost && <Options deleteHandler={deleteHandler} />}
            </header>
            <Link to={`/post/${post._id}`} className="post__details">
                {post.caption && <p className="post__caption">{post.caption}</p>}
                {post.image?.src && <img src={post.image?.src} alt="post_image" className="post__image" />}
            </Link>
            <div className="post__footer">
                <div className="post__reactions">
                    <img src={isLiked ? likeIcon : likeOutlined} alt="like" onClick={likeHandler} />
                    <p>{post.likes.length || ""}</p>
                </div>
                {singlepost || <Input placeholder={"Write a comment..."} handler={commentHandler} />}
            </div>
        </article>
    );
};

export default Post;
