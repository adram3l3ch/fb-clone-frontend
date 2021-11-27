import React from "react";
import Input from "../../components/Input/Input";
import Comments from "../../components/Comments/Comments";
import "./singlepost.css";
import Post from "../../components/Post/Post";
import Online from "../../components/Online/Online";
import Chat from "../../components/Chat/Chat";

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
         <div className="singlepost__right">
            <div>
               <Online />
               <Chat />
            </div>
         </div>
      </section>
   );
};

export default SinglePost;
