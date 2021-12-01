import React, { useEffect, useState } from "react";
import "./online.css";
import dp from "../../assets/dp.jpg";
import { fetchUsers } from "../../API";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../features/modalSlice";

const Online = () => {
   const { token } = JSON.parse(Cookies.get("user"));
   const [users, setUsers] = useState([]);
   const dispatch = useDispatch();

   useEffect(() => {
      try {
         (async () => {
            const data = await fetchUsers(token);
            setUsers(data.user);
         })();
      } catch (error) {
         dispatch(showModal(error.response?.data?.msg || "Something went wrong"));
         setTimeout(() => dispatch(hideModal()), 4000);
      }
   }, [token, dispatch]);

   return (
      <section className="online">
         <h2>Users</h2>
         <div>
            {users.map((user) => (
               <Link to={`/user/${user._id}`} key={user._id}>
                  <div className="user">
                     <img
                        src={user.profileImage || dp}
                        alt={user.name + " image"}
                        className="roundimage"
                     />
                     <h3>{user.name}</h3>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default Online;
