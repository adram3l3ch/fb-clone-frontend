import React, { useEffect, useState } from "react";
import "./online.css";
import { dp } from "../../assets";
import { fetchUsers } from "../../API";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Online = () => {
   const { token } = JSON.parse(Cookies.get("user"));
   const [users, setUsers] = useState([]);

   const customFetch = useFetch();

   useEffect(() => {
      (async () => {
         const data = await customFetch(fetchUsers, token);
         if (data) setUsers(data.user);
      })();
   }, [token, customFetch]);

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
