import React, { useEffect, useState } from "react";
import "./profilecard.css";
import { dp, clockIcon, cakeIcon, locationIcon, mailIcon, cameraIcon } from "../../assets";
import SetupProfile from "../SetupProfile/SetupProfile";
import { createChat, fetchUser } from "../../API";
import ImageUpload from "../ImageUpload/ImageUpload";
import useFetch from "../../hooks/useFetch";
import useDate from "../../hooks/useDate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatID, setReceiverID } from "../../features/messageSlice";

const ProfileCard = ({ id, isOwnProfile }) => {
   const [user, setUser] = useState({});
   const [isEditing, setIsEditing] = useState(false);
   const [isUploading, setIsUploading] = useState(false);

   const { token } = useSelector(state => state.user);
   const customFetch = useFetch();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         const data = await customFetch(fetchUser, id, token);
         if (data) setUser(data.user);
      })();
   }, [id, token, customFetch]);

   let { name, email, about, dob, location, createdAt, profileImage } = user;
   createdAt = `Joined on ${useDate(createdAt)}`;
   dob = useDate(dob);

   const message = async () => {
      const data = await customFetch(createChat, id, token);
      if (data) {
         dispatch(setChatID(data.cid));
         dispatch(setReceiverID(id));
      }
      navigate("/chat");
   };

   return (
      <section className="profilecard">
         {isEditing && <SetupProfile setIsEditing={setIsEditing} user={user} setUser={setUser} />}
         {isUploading && <ImageUpload setIsUploading={setIsUploading} setUser={setUser} />}
         <header>
            <div>
               <img src={profileImage || dp} alt="profile_image" className="profilecard__dp roundimage" />
               {isOwnProfile && (
                  <div className="dp-upload">
                     <img src={cameraIcon} alt="change_profile_image" onClick={() => setIsUploading(true)} />
                  </div>
               )}
            </div>
            <h1>{name || "User"}</h1>
            <h2>{about || "About"}</h2>
         </header>
         <article>
            <div className="profilecard__info">
               <img src={clockIcon} alt="join date" />
               <h3>{createdAt}</h3>
            </div>
            <div className="profilecard__info">
               <img src={locationIcon} alt="location" />
               <h3>{location}</h3>
            </div>
            <div className="profilecard__info">
               <img src={mailIcon} alt="mail" />
               <h3>{email}</h3>
            </div>
            <div className="profilecard__info">
               <img src={cakeIcon} alt="date of birth" />
               <h3>{dob}</h3>
            </div>
         </article>
         {isOwnProfile ? <button onClick={() => setIsEditing(true)}>Edit Profile</button> : <button onClick={message}>Message</button>}
      </section>
   );
};

export default ProfileCard;
