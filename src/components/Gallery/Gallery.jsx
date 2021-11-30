import React from "react";
import "./gallery.css";
import { useSelector } from "react-redux";

const Gallery = () => {
   const { posts } = useSelector((state) => state.post);
   const postsWithImages = posts.filter((post) => !!post.image);
   console.log(postsWithImages);
   return (
      <section className="gallery">
         <div className="gallery__images">
            {postsWithImages.map(
               (v, i) => i < 3 && <img src={postsWithImages[i]?.image.src} alt="" />
            )}
         </div>
         {postsWithImages.length > 3 && <button>View All</button>}
      </section>
   );
};

export default Gallery;
