import React, { useEffect } from "react";
import Chat from "../../components/Chat/Chat";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./profile.css";
import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../API";
import Cookies from "js-cookie";
import { setPosts } from "../../features/postSlice";

const Profile = () => {
   const { id } = useParams();
   const { token } = JSON.parse(Cookies.get("user"));
   const dispatch = useDispatch();
   const { posts } = useSelector((state) => state.post);
   const isOwnProfile = id === useSelector((state) => state.user.id);

   useEffect(() => {
      try {
         (async () => {
            const data = await fetchPosts(token, id);
            dispatch(setPosts(data.posts));
         })();
      } catch (error) {
         console.log(error);
      }
   }, [token, dispatch, id]);

   return (
      <div className="profile">
         <div className="profile__left">
            <ProfileCard id={id} isOwnProfile={isOwnProfile} />
            <Gallery />
         </div>
         <div className="profile__center">
            <div>
               {isOwnProfile && <CreatePost />}
               {posts.length < 1 && <h2>No Posts</h2>}
               {posts.map((post) => (
                  <Post post={post} />
               ))}
            </div>
         </div>
         <div className="profile__right">
            <Online />
            <Chat />
         </div>
      </div>
   );
};

export default Profile;
