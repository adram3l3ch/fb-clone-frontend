import React from "react";
import Chat from "../../components/Chat/Chat";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./profile.css";
import { useParams } from "react-router";

const Profile = () => {
   const { id } = useParams();

   return (
      <div className="profile">
         <div className="profile__left">
            <ProfileCard id={id} />
            <Gallery />
         </div>
         <div className="profile__center">
            <div>
               <Post />
               <Post />
               <Post />
               <Post />
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
