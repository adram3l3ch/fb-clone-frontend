import React from "react";
import { cloneElement } from "react";
import "./backdrop.css";

const Backdrop = ({ children, show, onClose = () => {} }) => {
	const newChildren = cloneElement(children, {
		...children.props,
		show,
	});
	const closeModal = e => {
		const isBackdrop = e.target.firstChild?.classList?.contains("backdrop__content");
		if (isBackdrop) onClose();
	};
	return (
		<div className={show ? "backdrop show" : "backdrop"} onClick={closeModal}>
			<div className="backdrop__content gradient-border">{newChildren}</div>
		</div>
	);
};

export default Backdrop;
