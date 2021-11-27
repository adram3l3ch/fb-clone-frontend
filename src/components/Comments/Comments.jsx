import React from "react";
import Comment from "../Comment/Comment";
import "./comments.css";

const Comments = () => {
   return (
      <div className="comments">
         <h3>12 Comments</h3>
         <Comment />
         <Comment />
         <Comment />
         <Comment />
         <Comment />
      </div>
   );
};

export default Comments;
