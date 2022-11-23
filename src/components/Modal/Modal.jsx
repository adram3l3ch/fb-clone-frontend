import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import "./modal.css";

const Modal = () => {
	const { modals } = useSelector(state => state.modal);
	const node = modals.map(modal => (
		<div className="modal" key={modal.id}>
			<p>{modal.msg}</p>
		</div>
	));
	return createPortal(node, document.getElementById("modals"));
};

export default Modal;
