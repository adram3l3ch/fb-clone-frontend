import React from "react";
import "./gallery.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Gallery = () => {
   const { posts } = useSelector((state) => state.post);
   const postsWithImages = posts.filter((post) => !!post.image);
   console.log(postsWithImages);
   return (
      <section className="gallery">
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
         {postsWithImages.length > 3 && <button>View All</button>}
      </section>
   );
};

export default Gallery;
