import React, { useEffect, useState } from "react";
import { dp } from "../../assets";
import { fetchUsers } from "../../API";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/modalSlice";
import "./online.css";

const Online = () => {
   const { token } = JSON.parse(Cookies.get("user"));
   const {
      socket: { usersOnline },
   } = useSelector(state => state);

   const [users, setUsers] = useState([]);
   const customFetch = useFetch();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         const data = await customFetch(fetchUsers, token);
         if (data) setUsers(data.user);
      })();
   }, [token, customFetch]);

   return (
      <section className="online">
         <div>
            <h2>Users</h2>
            {users.map(user => (
               <Link
                  to={`/user/${user._id}`}
                  key={user._id}
                  onClick={() => {
                     dispatch(toggleSidebar(false));
                  }}
               >
                  <div className="user">
                     <div className={usersOnline.some(u => u.id === user._id) ? "green" : ""}>
                        <img src={user.profileImage || dp} alt={user.name + " image"} className="roundimage" />
                     </div>
                     <h3>{user.name}</h3>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default Online;
