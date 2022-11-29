import React from "react";
import { cloneElement } from "react";
import { createPortal } from "react-dom";
import "./backdrop.css";

const Backdrop = ({ children, show, onClose = () => {} }) => {
	const newChildren = cloneElement(children, {
		...children.props,
		show: show ? "true" : undefined,
		onClose,
	});
	const closeModal = e => {
		const isBackdrop = e.target.firstChild?.classList?.contains("backdrop__content");
		if (isBackdrop) onClose();
	};

	const node = (
		<div className={show ? "backdrop show" : "backdrop"} onClick={closeModal}>
			<div className="backdrop__content gradient-border">{newChildren}</div>
		</div>
	);
	return createPortal(node, document.getElementById("backdrops"));
};

export default Backdrop;
