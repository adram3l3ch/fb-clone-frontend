import React from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Comments/Comments";
import "./singlepost.css";
import Post from "../../components/Post/Post";

const SinglePost = () => {
   return (
      <section className="singlepost">
         <Post singlepost={true} />
         <div className="singlepost__comments">
            <div>
               <Comments />
               <Input placeholder="Write a comment..." />
            </div>
         </div>
      </section>
   );
};

export default SinglePost;
