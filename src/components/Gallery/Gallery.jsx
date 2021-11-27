import React from "react";
import "./gallery.css";
import img1 from "../../assets/img-1.jpg";
import img2 from "../../assets/img-2.jpg";
import img3 from "../../assets/img-3.jpg";

const Gallery = () => {
   return (
      <section className="gallery">
         <div className="gallery__images">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
         </div>
         <button>View All</button>
      </section>
   );
};

export default Gallery;
