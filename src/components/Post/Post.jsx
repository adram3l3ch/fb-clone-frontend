import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, likePost } from "../../API";
import { setPosts } from "../../features/postSlice";
import dp from "../../assets/dp.jpg";
import like from "../../assets/like.svg";
import likeOutlined from "../../assets/like-outlined.svg";
import { months } from "../../DATE";
import Input from "../Input/Input";
import "./post.css";

const Post = ({ singlepost, post }) => {
   const [user, setUser] = useState({});
   const { token } = JSON.parse(Cookies.get("user"));
   const { id } = useSelector((state) => state.user);
   const isLiked = post.likes.includes(id);
   const dispatch = useDispatch();

   let createdAt = new Date(post.createdAt);
   createdAt = `${createdAt.getDate()} ${
      months[createdAt.getMonth()]
   } ${createdAt.getFullYear()}`;

   useEffect(() => {
      (async () => {
         const { createdBy } = post;
         const { user } = await fetchUser(createdBy, token);
         setUser(user);
      })();
   }, [post, token]);

   const clickHandler = async () => {
      try {
         const data = await likePost(post._id, token, !isLiked);
         dispatch(setPosts(data.posts));
      } catch (error) {}
   };

   return (
      <article className={singlepost ? "post halfborder" : "post"}>
         <header>
            <img src={user.profileImage || dp} alt="dp" className="post__dp roundimage" />
            <div>
               <h3>{user.name}</h3>
               <p>{createdAt}</p>
            </div>
         </header>
         <p>{post.caption}</p>
         <img src={post.image?.src} alt="" className="post__image" />
         <div className="post__footer">
            <div className="post__reactions">
               <img src={isLiked ? like : likeOutlined} alt="" onClick={clickHandler} />
               <p>{post.likes.length || ""}</p>
            </div>
            {singlepost || <Input placeholder={"Write a comment"} />}
         </div>
      </article>
   );
};

export default Post;
