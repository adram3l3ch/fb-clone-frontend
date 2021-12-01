import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainGallery from "../MainGallery/MainGallery";
import "./gallery.css";

const Gallery = () => {
   const { posts } = useSelector((state) => state.post);
   const postsWithImages = posts.filter((post) => !!post.image);
   const [isMainGalleryOpen, setIsMainGalleryOpen] = useState(false);

   return (
      <section className="gallery">
         {isMainGalleryOpen && (
            <MainGallery posts={postsWithImages} handler={setIsMainGalleryOpen} />
         )}
         <div className="gallery__images">
            {postsWithImages.map(
               (v, i) =>
                  i < 3 && (
                     <Link to={`/post/${v._id}`} key={v._id}>
                        <img src={v?.image.src} alt="postimage" />
                     </Link>
                  )
            )}
         </div>
         {postsWithImages.length > 3 && (
            <button onClick={() => setIsMainGalleryOpen(true)}>View All</button>
         )}
      </section>
   );
};

export default Gallery;
