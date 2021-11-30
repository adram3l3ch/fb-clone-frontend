import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { fetchUser } from "../../API";
import dp from "../../assets/dp.jpg";
import "./comment.css";

const Comment = ({ comment }) => {
   const { token } = JSON.parse(Cookies.get("user"));
   const [user, setUser] = useState({});

   useEffect(() => {
      (async () => {
         const { commentedBy } = comment;
         const { user } = await fetchUser(commentedBy, token);
         setUser(user);
      })();
   }, [token, comment]);

   return (
      <div className="comment">
         <img src={user.profileImage || dp} alt="dp" className="comment__dp" />
         <div>
            <h3>{user.name}</h3>
            <p>{comment.comment}</p>
         </div>
      </div>
   );
};

export default Comment;
