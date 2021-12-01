import React from "react";
import { Link } from "react-router-dom";
import close from "../../assets/close.png";
import "./maingallery.css";

const MainGallery = ({ posts, handler }) => {
   return (
      <div className="maingallery">
         <div className="images">
            <button onClick={() => handler(false)}>
               <img src={close} alt="close" />
            </button>
            {posts.map((post) => (
               <Link to={`/post/${post._id}`}>
                  <img src={post.image.src} alt="post-images" />
               </Link>
            ))}
         </div>
      </div>
   );
};

export default MainGallery;
