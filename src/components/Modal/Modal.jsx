import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import "./modal.css";

const Modal = () => {
	const modal = useSelector(state => state.modal);
	const node = (
		<div className={modal.visible ? "modal visible" : "modal"}>
			<p>{modal.msg}</p>
		</div>
	);
	return createPortal(node, document.getElementById("modals"));
};

export default Modal;
