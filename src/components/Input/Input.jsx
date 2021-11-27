import React from "react";
import send from "../../assets/plane.svg";
import "./input.css";

const Input = ({ placeholder }) => {
   return (
      <form className="input__box">
         <input type="text" placeholder={placeholder} />
         <button type="submit">
            <img src={send} alt="" />
         </button>
      </form>
   );
};

export default Input;
