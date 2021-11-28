import React, { useEffect } from "react";
import SinglePost from "./pages/Singlepost/SinglePost.jsx";
import Appbar from "./components/Appbar/Appbar";
import Profile from "./pages/Profile/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import Cookies from "js-cookie";
import { login } from "./features/userSlice.js";
import Modal from "./components/Modal/Modal.jsx";

function App() {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.user);

   useEffect(() => {
      const user = Cookies.get("user");
      user && dispatch(login(JSON.parse(user)));
   }, [dispatch]);

   return (
      <Router>
         <div className="container">
            <Modal />
            {!user.id ? (
               <Auth />
            ) : (
               <>
                  <Appbar />
                  <Routes>
                     <Route path="/" element={<SinglePost />} />
                     <Route path="/user/:id" element={<Profile />} />
                  </Routes>
               </>
            )}
         </div>
      </Router>
   );
}

export default App;
