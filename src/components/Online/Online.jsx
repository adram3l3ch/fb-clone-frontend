import React, { useEffect, useState } from "react";
import "./online.css";
import dp from "../../assets/dp.jpg";
import { fetchUsers } from "../../API";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Online = () => {
   const { token } = JSON.parse(Cookies.get("user"));
   const [users, setUsers] = useState([]);

   useEffect(() => {
      (async () => {
         const data = await fetchUsers(token);
         setUsers(data.user);
      })();
   }, [token]);

   return (
      <section className="online">
         <h2>Users</h2>
         <div>
            {users.map((user) => (
               <Link to={`/user/${user._id}`}>
                  <div className="user">
                     <img src={user.profileImage || dp} alt="" className="roundimage" />
                     <h3>{user.name}</h3>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default Online;
