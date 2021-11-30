import React, { useEffect, useState } from "react";
import "./profilecard.css";
import dp from "../../assets/dp.jpg";
import clockIcon from "../../assets/clock.svg";
import cakeIcon from "../../assets/cake.svg";
import locationIcon from "../../assets/location.svg";
import mailIcon from "../../assets/mail.svg";
import cameraIcon from "../../assets/camera.svg";
import { months } from "../../DATE";
import SetupProfile from "../SetupProfile/SetupProfile";
import { fetchUser } from "../../API";
import ImageUpload from "../ImageUpload/ImageUpload";
import Cookies from "js-cookie";

const ProfileCard = ({ id, isOwnProfile }) => {
   const [user, setUser] = useState({});
   const [isEditing, setIsEditing] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const { token } = JSON.parse(Cookies.get("user"));

   useEffect(() => {
      try {
         (async () => {
            const data = await fetchUser(id, token);
            setUser(data.user);
         })();
      } catch (error) {
         console.log(error);
      }
   }, [id, token]);

   let { name, email, about, dob, location, createdAt, profileImage } = user;
   dob = new Date(dob);
   createdAt = new Date(createdAt);
   createdAt = `Joined on ${months[createdAt.getMonth()]} ${createdAt.getFullYear()}`;
   dob = `${dob.getDate()} ${months[dob.getMonth()]} ${dob.getFullYear()}`;

   return (
      <section className="profilecard">
         {isEditing && (
            <SetupProfile setIsEditing={setIsEditing} user={user} setUser={setUser} />
         )}
         {isUploading && (
            <ImageUpload setIsUploading={setIsUploading} setUser={setUser} />
         )}
         <header>
            <div>
               <img
                  src={profileImage || dp}
                  alt=""
                  className="profilecard__dp roundimage"
               />
               {isOwnProfile && (
                  <div className="dp-upload">
                     <img src={cameraIcon} alt="" onClick={() => setIsUploading(true)} />
                  </div>
               )}
            </div>
            <h1>{name || "User"}</h1>
            <h2>{about || "About"}</h2>
         </header>
         <article>
            <div className="profilecard__info">
               <img src={clockIcon} alt="" />
               <h3>{createdAt}</h3>
            </div>
            <div className="profilecard__info">
               <img src={locationIcon} alt="" />
               <h3>{location}</h3>
            </div>
            <div className="profilecard__info">
               <img src={mailIcon} alt="" />
               <h3>{email}</h3>
            </div>
            <div className="profilecard__info">
               <img src={cakeIcon} alt="" />
               <h3>{dob}</h3>
            </div>
         </article>
         {isOwnProfile ? (
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
         ) : (
            <button disabled>Message</button>
         )}
      </section>
   );
};

export default ProfileCard;
