import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import "./setupprofile.css";

const SetupProfile = ({ setIsEditing, user, setUser }) => {
   const [name, setName] = useState(user.name);
   const [about, setAbout] = useState(user.about);
   const [location, setLocation] = useState(user.location);

   const updateUser = async (e) => {
      e.preventDefault();
      try {
         const { token } = JSON.parse(Cookies.get("user"));
         const { data } = await axios.patch(
            `http://localhost:5000/api/v1/user/update`,
            {
               name,
               about,
               location,
            },
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            }
         );
         setUser(data.user);
         setIsEditing(false);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className="setup">
         <form onSubmit={updateUser}>
            <label htmlFor="">Username</label>
            <input
               type="text"
               value={name}
               onChange={(e) => {
                  setName(e.target.value);
               }}
            />
            <label htmlFor="">About</label>
            <input
               type="text"
               value={about}
               onChange={(e) => {
                  setAbout(e.target.value);
               }}
            />
            <label htmlFor="">Location</label>
            <input
               type="text"
               value={location}
               onChange={(e) => {
                  setLocation(e.target.value);
               }}
            />
            <button type="submit">Continue</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
         </form>
      </div>
   );
};

export default SetupProfile;
