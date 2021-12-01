import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../API";
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
         const data = await registerUser(name, email, password, dob);
         dispatch(login(data));
      } catch (error) {
         const { msg } = error?.response?.data || "Something went wrong";
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
            required
            onChange={(e) => setEmail(e.target.value)}
         />
         <label htmlFor="name">Username</label>
         <input
            type="text"
            id="name"
            placeholder="john doe"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
         />
         <label htmlFor="dob">Date of birth</label>
         <input
            type="date"
            id="dob"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
         />
         <label htmlFor="password">Password</label>
         <input
            type="password"
            id="password"
            placeholder="Top secret"
            required
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
