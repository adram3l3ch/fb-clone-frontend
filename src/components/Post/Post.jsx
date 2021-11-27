import React from "react";
import dp from "../../assets/dp.jpg";
import img1 from "../../assets/img-1.jpg";
import like from "../../assets/like.svg";
import Input from "../Input/Input";
import "./post.css";

const Post = ({ singlepost }) => {
   return (
      <article className="post">
         <header>
            <img src={dp} alt="dp" className="post__dp" />
            <div>
               <h3>Jane Doe</h3>
               <p>20 min ago</p>
            </div>
         </header>
         <h4>How can you hear your soul if everyone is talking...</h4>
         <img src={img1} alt="" className="post__image" />
         <div className="post__footer">
            <div className="post__reactions">
               <img src={like} alt="" />
               <p>You and 50 others</p>
            </div>
            {singlepost || <Input placeholder={"Write a comment"} />}
         </div>
      </article>
   );
};

export default Post;
