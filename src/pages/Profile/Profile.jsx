import React, { useEffect } from "react";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../API";
import Cookies from "js-cookie";
import { setPosts } from "../../features/postSlice";
import "./profile.css";
import useFetch from "../../hooks/useFetch";

const Profile = () => {
    const { id } = useParams();
    const { token } = JSON.parse(Cookies.get("user"));
    const { posts } = useSelector(state => state.post);
    const isOwnProfile = id === useSelector(state => state.user.id);

    const dispatch = useDispatch();
    const customFetch = useFetch();

    useEffect(() => {
        (async () => {
            const data = await customFetch(fetchPosts, token, id);
            if (data) dispatch(setPosts(data.posts));
        })();
    }, [token, dispatch, id, customFetch]);

    return (
        <section className="profile">
            <article className="profile__left">
                <ProfileCard id={id} isOwnProfile={isOwnProfile} />
                <Gallery />
            </article>
            <article className="profile__center">
                <div>
                    {isOwnProfile && <CreatePost />}
                    {posts.length < 1 && <h2>No Posts</h2>}
                    {posts.map(post => (
                        <Post post={post} key={post._id} />
                    ))}
                </div>
            </article>
            <article className="profile__right">
                <Online />
            </article>
        </section>
    );
};

export default Profile;
