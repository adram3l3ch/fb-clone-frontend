import React, { useState } from "react";
import { optionsIcon } from "../../assets";
import "./options.css";

const Options = ({ deleteHandler }) => {
   const [isOptionsVisible, setIsOptionsVisible] = useState(false);
   return (
      <div className="options">
         <img src={optionsIcon} alt="" onClick={() => setIsOptionsVisible(val => !val)} />
         <ul className={isOptionsVisible ? "show" : ""}>
            <li
               onClick={() => {
                  setIsOptionsVisible(false);
                  deleteHandler();
               }}
            >
               Delete
            </li>
         </ul>
      </div>
   );
};

export default Options;
