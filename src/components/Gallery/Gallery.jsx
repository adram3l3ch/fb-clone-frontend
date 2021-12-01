import React, { useState } from "react";
import "./gallery.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainGallery from "../MainGallery/MainGallery";

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
                     <Link to={`/post/${postsWithImages[i]._id}`}>
                        <img src={postsWithImages[i]?.image.src} alt="" />
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
