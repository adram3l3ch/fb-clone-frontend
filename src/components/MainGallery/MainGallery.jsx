import React from "react";
import { Link } from "react-router-dom";
import "./maingallery.css";
import close from "../../assets/close.png";

const MainGallery = ({ posts, handler }) => {
   return (
      <div className="maingallery">
         <div className="images">
            <button onClick={() => handler(false)}>
               <img src={close} alt="" />
            </button>
            {posts.map((post) => (
               <Link to={`/post/${post._id}`}>
                  <img src={post.image.src} alt="" />
               </Link>
            ))}
         </div>
      </div>
   );
};

export default MainGallery;
