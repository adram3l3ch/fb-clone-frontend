import React from "react";
import { useSelector } from "react-redux";
import "./modal.css";

const Modal = () => {
   const modal = useSelector((state) => state.modal);
   return (
      <div className={modal.visible ? "modal visible" : "modal"}>
         <p>{modal.msg}</p>
      </div>
   );
};

export default Modal;
