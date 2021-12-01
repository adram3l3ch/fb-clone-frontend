import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { fetchUsersByIDs } from "../../API";
import Comment from "../Comment/Comment";
import "./comments.css";

const Comments = ({ post }) => {
   const { token } = JSON.parse(Cookies.get("user"));
   const [commentedUsers, setCommentedUsers] = useState([]);
   const [userIDs, setUserIDs] = useState([]);

   useEffect(() => {
      const userIds = post?.comments?.map((comment) => comment.commentedBy);
      setUserIDs(userIds);
   }, [post?.comments]);

   useEffect(() => {
      if (userIDs) {
         try {
            (async () => {
               const data = await fetchUsersByIDs(userIDs, token);
               setCommentedUsers(data.user);
            })();
         } catch (error) {
            console.log(error);
         }
      }
   }, [userIDs, token]);

   return (
      <div className="comments">
         <h3>{post?.comments?.length} Comments</h3>
         {post?.comments?.map((comment, i) => (
            <Comment
               key={comment._id}
               comment={comment}
               user={commentedUsers.find((user) => user._id === comment.commentedBy)}
            />
         ))}
      </div>
   );
};

export default Comments;
