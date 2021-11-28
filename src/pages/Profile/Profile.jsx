import React, { useEffect } from "react";
import Chat from "../../components/Chat/Chat";
import Gallery from "../../components/Gallery/Gallery";
import Online from "../../components/Online/Online";
import Post from "../../components/Post/Post";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import "./profile.css";
import { useParams } from "react-router";
import axios from "axios";

const Profile = () => {
   const { id } = useParams();
   useEffect(() => {
      try {
         async function fetchUser() {
            console.log("fetching");
            const { data } = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
            console.log(data);
         }

         fetchUser();
      } catch (error) {
         console.log(error);
      }
   }, []);
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
