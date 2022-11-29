import React from "react";
import { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./confirmation.css";

const Confirmation = ({ show, toggleShow, text, onSuccess }) => (
	<Backdrop show={show} onClose={toggleShow}>
		<div className="confirmation">
			<h2>{text}</h2>
			<div className="btn-group">
				<button onClick={toggleShow}>Cancel</button>
				<button
					className="danger"
					onClick={() => {
						toggleShow();
						onSuccess();
					}}
				>
					Yes, I'm sure
				</button>
			</div>
		</div>
	</Backdrop>
);
const useConfirmation = (onSuccess, text = "Are Your sure ?") => {
	const [show, setShow] = useState(false);
	const toggleShow = () => setShow(!show);
	const Comp = <Confirmation show={show} onSuccess={onSuccess} text={text} toggleShow={toggleShow} />;
	return { toggleShow, Confirmation: Comp };
};

export default useConfirmation;
