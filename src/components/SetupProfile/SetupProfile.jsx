import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./setupprofile.css";
import { update } from "../../features/userSlice";
import { showModal } from "../../features/modalSlice";
import { updateUser } from "../../API";
import Cookies from "js-cookie";

const SetupProfile = ({ setIsEditing, user, setUser }) => {
   const [name, setName] = useState(user.name);
   const [about, setAbout] = useState(user.about);
   const [location, setLocation] = useState(user.location);
   const { token } = JSON.parse(Cookies.get("user"));
   const dispatch = useDispatch();

   const clickHandler = async (e) => {
      e.preventDefault();
      try {
         (async () => {
            const data = await updateUser(name, about, location, token);
            setUser(data.user);
            setIsEditing(false);
            dispatch(update({ name: data.user.name }));
            dispatch(showModal("Success"));
         })();
      } catch (error) {
         dispatch(showModal(error.response?.data?.msg || "Something went wrong"));
      } finally {
         setTimeout(() => dispatch(showModal()), 4000);
      }
   };

   return (
      <div className="setup">
         <form onSubmit={clickHandler}>
            <label htmlFor="">Username</label>
            <input
               type="text"
               value={name}
               required
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
