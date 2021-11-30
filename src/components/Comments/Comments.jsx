import React from "react";
import Comment from "../Comment/Comment";
import "./comments.css";

const Comments = ({ post }) => {
   return (
      <div className="comments">
         <h3>{post?.comments?.length} Comments</h3>
         {post?.comments?.map((comment) => (
            <Comment comment={comment} />
         ))}
      </div>
   );
};

export default Comments;
