import React, { useEffect, useState } from "react";
import Chat from "../../components/Chat/Chat";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./profile.css";
import { useParams } from "react-router";
import CreatePost from "../../components/CreatePost/CreatePost";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
   const { id } = useParams();
   const { token } = useSelector((state) => state.user);
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      try {
         const fetchPosts = async () => {
            const { data } = await axios.get("http://localhost:5000/api/v1/post", {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            });
            setPosts(data.posts);
         };
         fetchPosts();
      } catch (error) {
         console.log(error);
      }
   }, [token]);

   return (
      <div className="profile">
         <div className="profile__left">
            <ProfileCard id={id} />
            <Gallery />
         </div>
         <div className="profile__center">
            <div>
               <CreatePost />
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
