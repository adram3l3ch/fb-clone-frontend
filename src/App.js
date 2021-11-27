import React, { useEffect } from "react";
import SinglePost from "./pages/Singlepost/SinglePost.jsx";
import Appbar from "./components/Appbar/Appbar";
import Profile from "./pages/Profile/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login.jsx";
import Cookies from "js-cookie";
import { login } from "./features/userSlice.js";

function App() {
   const dispatch = useDispatch();
   const state = useSelector((state) => state.user);

   useEffect(() => {
      const user = Cookies.get("user");
      user && dispatch(login(JSON.parse(user)));
   }, [dispatch]);

   return (
      <Router>
         <div className="container">
            {!state.user.name ? (
               <Login />
            ) : (
               <>
                  <Appbar />
                  <Routes>
                     <Route path="/" element={<SinglePost />} />
                     <Route path="/user" element={<Profile />} />
                  </Routes>
               </>
            )}
         </div>
      </Router>
   );
}

export default App;
