import React, { useState } from "react";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./auth.css";

const Auth = () => {
   const [isRegistering, setIsRegistering] = useState(false);

   return (
      <section className={isRegistering ? "auth signup" : "auth"}>
         <Login setIsRegistering={setIsRegistering} />
         <Register setIsRegistering={setIsRegistering} />
      </section>
   );
};

export default Auth;
