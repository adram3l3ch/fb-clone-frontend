import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import "./login.css";
import Cookies from "js-cookie";

const Login = () => {
   const [isRegistering, setIsRegistering] = useState(false);
   const dispatch = useDispatch();

   const loginHandler = async (e) => {
      e.preventDefault();
      const formData = {
         email: e.target[0].value,
         password: e.target[1].value,
      };
      const { data } = await axios.post(
         "http://localhost:5000/api/v1/auth/login",
         formData
      );
      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(data.user));
      dispatch(login(data.user));
   };

   const registerHandler = async (e) => {
      e.preventDefault();
      const formData = {
         email: e.target[0].value,
         name: e.target[1].value,
         dob: e.target[2].value,
         password: e.target[3].value,
      };
      const { data } = await axios.post(
         "http://localhost:5000/api/v1/auth/register",
         formData
      );
      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(data.user));
      dispatch(login(data.user));
   };

   return (
      <div className={isRegistering ? "auth signup" : "auth"}>
         <form onSubmit={loginHandler} className="login">
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" placeholder="johndoe@example.com" />
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Top secret" />
            <button type="submit">Login</button>
            <p>
               Don't have an account?{" "}
               <span
                  onClick={() => {
                     setIsRegistering(true);
                  }}
               >
                  Register
               </span>
            </p>
         </form>
         <form onSubmit={registerHandler} className="register">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="johndoe@example.com" />
            <label htmlFor="name">Username</label>
            <input type="text" id="name" placeholder="john doe" />
            <label htmlFor="dob">Date of birth</label>
            <input type="date" id="dob" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Top secret" />
            <button type="submit">Register</button>
            <p>
               Already have an account?{" "}
               <span
                  onClick={() => {
                     setIsRegistering(false);
                  }}
               >
                  Login
               </span>
            </p>
         </form>
      </div>
   );
};

export default Login;
