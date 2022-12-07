import React, { useState } from "react";
import { useEffect } from "react";
import { optionsIcon } from "../../assets";
import "./options.css";

const Options = ({ options, id = "" }) => {
	const [isOptionsVisible, setIsOptionsVisible] = useState(false);

	useEffect(() => {
		const handleOutsideClick = e => {
			if (e.target.id !== "options" + id && e.target.id !== "options__icon" + id) {
				setIsOptionsVisible(false);
			}
		};
		document.body.addEventListener("click", handleOutsideClick);
		return () => document.body.removeEventListener("click", handleOutsideClick);
	}, [id]);

	const handleClick = handler => {
		setIsOptionsVisible(false);
		handler();
	};

	return (
		<div className="options" id={"options" + id} onClick={() => setIsOptionsVisible(val => !val)}>
			<img src={optionsIcon} alt="options" className="options__icon" id={"options__icon" + id} />
			<ul className={isOptionsVisible ? "show" : ""}>
				{Object.entries(options).map(([title, handler], i) => (
					<li onClick={() => handleClick(handler)} key={i}>
						{title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Options;
