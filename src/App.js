import React from "react";
import SinglePost from "./pages/SinglePost.jsx";
import Appbar from "./components/Appbar/Appbar";

function App() {
   return (
      <div className="App">
         <Appbar />
         <SinglePost />
      </div>
   );
}

export default App;
