import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { loginUser } from "../../API";
import useFetch from "../../hooks/useFetch";
import { setIsLoading } from "../../features/modalSlice";

const Login = ({ setIsRegistering }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   const customFetch = useFetch();

   const loginHandler = async (e) => {
      e.preventDefault();
      dispatch(setIsLoading(true));
      const data = await customFetch(loginUser, email, password);
      if (data) dispatch(login(data));
      dispatch(setIsLoading(false));
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
