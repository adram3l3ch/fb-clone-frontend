import React from "react";
import dp from "../../assets/dp.jpg";
import like from "../../assets/like.svg";
import Input from "../Input/Input";
import "./post.css";

const Post = ({ singlepost, post }) => {
   return (
      <article className={singlepost ? "post halfborder" : "post"}>
         <header>
            <img src={dp} alt="dp" className="post__dp roundimage" />
            <div>
               <h3>Jane Doe</h3>
               <p>20 min ago</p>
            </div>
         </header>
         <p>{post.caption}</p>
         <img src={post.image?.src} alt="" className="post__image" />
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
