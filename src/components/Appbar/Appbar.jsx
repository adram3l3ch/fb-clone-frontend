import React, { useState } from "react";
import "./appbar.css";
import dp from "../../assets/dp.jpg";
import logout from "../../assets/logout.png";
import close from "../../assets/close.png";
import search from "../../assets/search.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as Logout } from "../../features/userSlice";
import { fetchPosts, fetchUsers } from "../../API";
import Cookies from "js-cookie";
import hamburger from "../../assets/hamburger.png";
import { toggleSidebar } from "../../features/modalSlice";

const Appbar = () => {
   const dispatch = useDispatch();
   const { id } = useSelector((state) => state.user);
   const { isSidebarVisible } = useSelector((state) => state.modal);
   const { profileImage } = useSelector((state) => state.user);
   const [query, setQuery] = useState("");
   const [searchResult, setSearchResult] = useState({});
   const { token } = JSON.parse(Cookies.get("user"));

   const logoutHandler = () => {
      dispatch(Logout());
   };

   const searchHandler = async (e) => {
      e.preventDefault();
      if (query) {
         const { posts } = await fetchPosts(token, null, query);
         const { user } = await fetchUsers(token, query);
         setSearchResult({ posts, user });
      }
   };

   const reset = () => {
      setQuery("");
      setSearchResult({});
   };

   return (
      <div className="appbar">
         <div
            className="hamburger"
            onClick={() => dispatch(toggleSidebar(!isSidebarVisible))}
         >
            <img src={isSidebarVisible ? close : hamburger} alt="" />
         </div>
         <form onSubmit={searchHandler} className="searchform">
            <button type="submit">
               <img src={search} alt="" />
            </button>
            <input
               type="text"
               placeholder="Tap to search..."
               value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={reset}>
               <img src={close} alt="" className="close" />
            </button>
            {searchResult.posts || searchResult.user ? (
               <div className="search-results">
                  <div>
                     <h3>Posts</h3>
                     {searchResult.posts?.map((post) => (
                        <Link to={`/post/${post._id}`}>
                           <p onClick={reset}>{post.caption}</p>
                        </Link>
                     ))}
                  </div>
                  <div>
                     <h3>Users</h3>
                     {searchResult.user?.map((val) => (
                        <Link to={`/user/${val._id}`}>
                           <p onClick={reset}>{val.name}</p>
                        </Link>
                     ))}
                  </div>
               </div>
            ) : (
               ""
            )}
         </form>
         <nav className="appbar__profile">
            <Link to={`/user/${id}`}>
               <img
                  src={profileImage || dp}
                  alt=""
                  className="appbar__profile__dp"
                  title="profile"
               />
            </Link>
            <button onClick={logoutHandler}>
               <img
                  src={logout}
                  alt=""
                  className="appbar__profile__logout"
                  title="logout"
               />
            </button>
         </nav>
      </div>
   );
};

export default Appbar;
