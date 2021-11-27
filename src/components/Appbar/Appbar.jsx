import React from "react";
import "./appbar.css";
import dp from "../../assets/dp.jpg";
import logout from "../../assets/logout.png";
import search from "../../assets/search.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as Logout } from "../../features/userSlice";
import Cookies from "js-cookie";

const Appbar = () => {
   const dispatch = useDispatch();

   const logoutHandler = () => {
      Cookies.remove("user");
      Cookies.remove("token");
      dispatch(Logout());
   };
   return (
      <div className="appbar">
         <form>
            <button type="submit">
               <img src={search} alt="" />
            </button>
            <input type="text" placeholder="Tap to search..." />
         </form>
         <div className="appbar__profile">
            <Link to="/user">
               <img src={dp} alt="" className="appbar__profile__dp" title="profile" />
            </Link>
            <button onClick={logoutHandler}>
               <img
                  src={logout}
                  alt=""
                  className="appbar__profile__logout"
                  title="logout"
               />
            </button>
         </div>
      </div>
   );
};

export default Appbar;
