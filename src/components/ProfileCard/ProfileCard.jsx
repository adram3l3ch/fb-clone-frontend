import React from "react";
import "./profilecard.css";
import dp from "../../assets/dp.jpg";
import clock from "../../assets/clock.svg";
import cake from "../../assets/cake.svg";
import location from "../../assets/location.svg";
import mail from "../../assets/mail.svg";
import { months } from "../../DATE";

const ProfileCard = ({ user }) => {
   // let { name, email, about, dob } = user;
   // dob = new Date(dob);
   // dob = `${dob.getDate()} ${months[dob.getMonth()]} ${dob.getFullYear()}`;

   return (
      <section className="profilecard">
         <header>
            <img src={dp} alt="" className="profilecard__dp roundimage" />
            <h1>Jane Doe</h1>
            <h2>Graphic Designer</h2>
         </header>
         <article>
            <div className="profilecard__info">
               <img src={clock} alt="" />
               <h3>Joined on January 2017</h3>
            </div>
            <div className="profilecard__info">
               <img src={location} alt="" />
               <h3>New Jersey, USA</h3>
            </div>
            <div className="profilecard__info">
               <img src={mail} alt="" />
               <h3>asd@gmail.com</h3>
            </div>
            <div className="profilecard__info">
               <img src={cake} alt="" />
               <h3>23 aug 2000</h3>
            </div>
         </article>
         <button>Edit Profile</button>
      </section>
   );
};

export default ProfileCard;
