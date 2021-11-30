import React from "react";
import dp from "../../assets/dp.jpg";
import "./comment.css";

const Comment = ({ comment }) => {
   return (
      <div className="comment">
         <img src={dp} alt="dp" className="comment__dp" />
         <div>
            <h3>
               Jane Doe <span>15m</span>
            </h3>
            <p>{comment.comment}</p>
         </div>
      </div>
   );
};

export default Comment;
