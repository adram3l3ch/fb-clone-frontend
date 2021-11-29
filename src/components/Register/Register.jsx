import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "../../features/modalSlice";
import { login } from "../../features/userSlice";

const Register = ({ setIsRegistering }) => {
   const dispatch = useDispatch();
   const [name, setName] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const [dob, setDob] = useState("");

   const registerHandler = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.post("http://localhost:5000/api/v1/auth/register", {
            name,
            password,
            email,
            dob,
         });
         dispatch(login(data));
      } catch (error) {
         const { msg } = error.response.data;
         dispatch(showModal(msg));
         setTimeout(() => {
            dispatch(hideModal());
         }, 4000);
      }
   };

   return (
      <form onSubmit={registerHandler} className="register">
         <label htmlFor="email">Email</label>
         <input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <label htmlFor="name">Username</label>
         <input
            type="text"
            id="name"
            placeholder="john doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <label htmlFor="dob">Date of birth</label>
         <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
         />
         <label htmlFor="password">Password</label>
         <input
            type="password"
            id="password"
            placeholder="Top secret"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
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
   );
};

export default Register;
