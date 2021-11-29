import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import { hideModal, showModal } from "../../features/modalSlice";

const Login = ({ setIsRegistering }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();

   const loginHandler = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", {
            email,
            password,
         });
         dispatch(login(data));
      } catch (error) {
         const { msg } = error.response?.data || "Error";
         dispatch(showModal(msg));
         setTimeout(() => {
            dispatch(hideModal());
         }, 4000);
      }
   };

   return (
      <form onSubmit={loginHandler} className="login">
         <label htmlFor="login-email">Email</label>
         <input
            type="email"
            id="login-email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => {
               setEmail(e.target.value);
            }}
         />
         <label htmlFor="login-password">Password</label>
         <input
            type="password"
            id="login-password"
            placeholder="Top secret"
            value={password}
            onChange={(e) => {
               setPassword(e.target.value);
            }}
         />
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
   );
};

export default Login;
