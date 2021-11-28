import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profilecard.css";
import dp from "../../assets/dp.jpg";
import clockIcon from "../../assets/clock.svg";
import cakeIcon from "../../assets/cake.svg";
import locationIcon from "../../assets/location.svg";
import mailIcon from "../../assets/mail.svg";
import { months } from "../../DATE";
import Cookies from "js-cookie";
import SetupProfile from "../SetupProfile/SetupProfile";

const ProfileCard = ({ id }) => {
   const [user, setUser] = useState({});
   const [isEditing, setIsEditing] = useState(false);
   const isOwnProfile = id === JSON.parse(Cookies.get("user")).id;

   useEffect(() => {
      try {
         async function fetchUser() {
            const { data } = await axios.get(`http://localhost:5000/api/v1/user/${id}`);
            setUser(data.user);
         }
         fetchUser();
      } catch (error) {
         console.log(error);
      }
   }, [id]);

   let { name, email, about, dob, location, createdAt } = user;
   dob = new Date(dob);
   createdAt = new Date(createdAt);
   createdAt = `Joined on ${months[createdAt.getMonth()]} ${createdAt.getFullYear()}`;
   dob = `${dob.getDate()} ${months[dob.getMonth()]} ${dob.getFullYear()}`;

   return (
      <section className="profilecard">
         {isEditing && (
            <SetupProfile setIsEditing={setIsEditing} user={user} setUser={setUser} />
         )}
         <header>
            <img src={dp} alt="" className="profilecard__dp roundimage" />
            <h1>{name}</h1>
            <h2>{about}</h2>
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
            <button>Message</button>
         )}
      </section>
   );
};

export default ProfileCard;
