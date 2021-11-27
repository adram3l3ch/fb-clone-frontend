import React from "react";
import SinglePost from "./pages/Singlepost/SinglePost.jsx";
import Appbar from "./components/Appbar/Appbar";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
   return (
      <div className="App">
         <Appbar />
         {/* <SinglePost /> */}
         <Profile />
      </div>
   );
}

export default App;
