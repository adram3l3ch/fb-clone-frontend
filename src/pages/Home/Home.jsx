import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../API";
import CreatePost from "../../components/CreatePost/CreatePost";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import { setPosts } from "../../features/postSlice";
import useFetch from "../../hooks/useFetch";
import "./home.css";

const Home = () => {
    const { token } = JSON.parse(Cookies.get("user"));
    const { posts } = useSelector(state => state.post);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            const data = await customFetch(fetchPosts, token);
            if (data) dispatch(setPosts(data.posts));
        })();
    }, [dispatch, token, customFetch]);

    return (
        <section className="home">
            <main className="home__left">
                <CreatePost />
                {posts.map(post => (
                    <Post post={post} key={post._id} />
                ))}
            </main>
            <aside className="home__right">
                <Online />
            </aside>
        </section>
    );
};

export default Home;
