import React, { useState } from "react";
import "./themeSwitch.css";
import { AiFillFormatPainter } from "react-icons/ai";

const ThemeSwitch = ({ setTheme }) => {
	const [isOpen, setIsOpen] = useState(false);
	const className = isOpen ? "theme-switch open" : "theme-switch";
	const changeTheme = e => {
		setTheme(e.currentTarget.classList[0]);
		setIsOpen(false);
	};
	return (
		<div className={className}>
			<div className="switch" onClick={() => setIsOpen(!isOpen)}>
				<AiFillFormatPainter />
			</div>
			<div className="themes">
				<div className="dark" onClick={changeTheme}></div>
				<div className="dark-contrast" onClick={changeTheme}></div>
				<div className="dark-blue-tint" onClick={changeTheme}></div>
			</div>
		</div>
	);
};

export default ThemeSwitch;
