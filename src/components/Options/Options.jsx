import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { optionsIcon } from "../../assets";
import { setEditingPost } from "../../features/postSlice";
import "./options.css";

const Options = ({ deleteHandler, post }) => {
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	const dispatch = useDispatch();

	const handleOutsideClick = e => {
		if (
			!e.target.classList.contains("options") &&
			!e.target.classList.contains("options__icon")
		) {
			setIsOptionsVisible(false);
		}
	};

	useEffect(() => {
		document.body.addEventListener("click", handleOutsideClick);
		return () => document.body.removeEventListener("click", handleOutsideClick);
	});
	return (
		<div className="options" onClick={() => setIsOptionsVisible(val => !val)}>
			<img src={optionsIcon} alt="options" className="options__icon" />
			<ul className={isOptionsVisible ? "show" : ""}>
				<li
					onClick={() => {
						setIsOptionsVisible(false);
						deleteHandler();
					}}
				>
					Delete
				</li>
				<li
					onClick={() => {
						dispatch(setEditingPost(post));
					}}
				>
					Edit
				</li>
			</ul>
		</div>
	);
};

export default Options;
