import React from "react";
import SinglePost from "./pages/Singlepost/SinglePost.jsx";
import Appbar from "./components/Appbar/Appbar";
import Profile from "./pages/Profile/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <div className="container">
            <Appbar />
            <Routes>
               <Route path="/" element={<SinglePost />} />
               <Route path="/user" element={<Profile />} />
            </Routes>
         </div>
      </Router>
   );
}

export default App;
