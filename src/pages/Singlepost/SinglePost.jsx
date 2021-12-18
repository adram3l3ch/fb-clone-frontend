import React, { useEffect } from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Comments/Comments";
import Post from "../../components/Post/Post";
import Online from "../../components/Online/Online";
import { fetchPost, commentPost } from "../../API";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSinglePost } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import "./singlepost.css";

const SinglePost = () => {
    const { id } = useParams();
    const { token } = JSON.parse(Cookies.get("user"));
    const { singlePost: post } = useSelector(state => state.post);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            const data = await customFetch(fetchPost, id, token);
            if (data) dispatch(setSinglePost(data.posts));
        })();
    }, [id, token, dispatch, customFetch]);

    const commentHandler = async comment => {
        const data = await customFetch(commentPost, post._id, comment, token);
        if (data) dispatch(setSinglePost(data.posts));
    };

    return (
        <section className="singlepost">
            <article className="singlepost__left">{post._id && <Post singlepost={true} post={post} />}</article>
            <article className="singlepost__comments">
                <div>
                    <Comments post={post} />
                    <Input placeholder="Write a comment..." handler={commentHandler} />
                </div>
            </article>
            <article className="singlepost__right">
                <Online />
            </article>
        </section>
    );
};

export default SinglePost;
