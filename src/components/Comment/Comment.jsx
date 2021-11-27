import React from "react";
import dp from "../../assets/dp.jpg";
import "./comment.css";

const Comment = () => {
   return (
      <div className="comment">
         <img src={dp} alt="dp" className="comment__dp" />
         <div>
            <h3>
               Jane Doe <span>15m</span>
            </h3>
            <p>
               Let me tell you this: if you meet a loner, no matter what they tell you,
               it's not because they enjoy solitude. It's because they have tried to blend
               into the world before, and people continue to disappoint them.
            </p>
         </div>
      </div>
   );
};

export default Comment;
