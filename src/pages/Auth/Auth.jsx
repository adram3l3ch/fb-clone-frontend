import React, { useState } from "react";
import "./auth.css";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const Auth = () => {
   const [isRegistering, setIsRegistering] = useState(false);

   return (
      <div className={isRegistering ? "auth signup" : "auth"}>
         <Login setIsRegistering={setIsRegistering} />
         <Register setIsRegistering={setIsRegistering} />
      </div>
   );
};

export default Auth;
