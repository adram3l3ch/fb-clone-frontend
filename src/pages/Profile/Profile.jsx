import React from "react";
import Chat from "../../components/Chat/Chat";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./profile.css";

const Profile = () => {
   return (
      <div className="profile">
         <div className="profile__left">
            <ProfileCard />
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
