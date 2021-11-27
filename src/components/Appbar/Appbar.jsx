import React from "react";
import "./appbar.css";
import dp from "../../assets/dp.jpg";
import logout from "../../assets/logout.png";
import search from "../../assets/search.svg";

const Appbar = () => {
   return (
      <div className="appbar">
         <form>
            <button type="submit">
               <img src={search} alt="" />
            </button>
            <input type="text" placeholder="Tap to search..." />
         </form>
         <div className="appbar__profile">
            <img src={dp} alt="" className="appbar__profile__dp" title="profile" />
            <img src={logout} alt="" className="appbar__profile__logout" title="logout" />
         </div>
      </div>
   );
};

export default Appbar;
