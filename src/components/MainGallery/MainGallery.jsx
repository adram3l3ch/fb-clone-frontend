import React from "react";
import { Link } from "react-router-dom";
import { closeIcon } from "../../assets";
import "./maingallery.css";

const MainGallery = ({ posts, handler }) => {
    return (
        <div className="maingallery">
            <div className="images">
                <button onClick={() => handler(false)} aria-label="close">
                    <img src={closeIcon} alt="close" />
                </button>
                {posts.map(post => (
                    <Link to={`/post/${post._id}`}>
                        <img src={post.image.src} alt="post-images" />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainGallery;
