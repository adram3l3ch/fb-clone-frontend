import React from "react";
import dp from "../../assets/dp.jpg";
import "./comment.css";

const Comment = ({ comment, user }) => {
   return (
      <div className="comment">
         <img src={user?.profileImage || dp} alt="dp" className="comment__dp" />
         <div>
            <h3>{user?.name}</h3>
            <p>{comment?.comment}</p>
         </div>
      </div>
   );
};

export default Comment;
