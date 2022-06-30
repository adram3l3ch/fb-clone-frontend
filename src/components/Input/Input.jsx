import React, { useState } from "react";
import { sendIcon } from "../../assets";

import "./input.css";
import EmojiPicker from "./EmojiPicker";
import { useRef } from "react";

const Input = ({ placeholder, handler, showEmoji }) => {
	const submitHandler = async e => {
		e.preventDefault();
		emojiRef.current?.close();
		if (value.trim()) await handler(value.trim());
		setValue("");
	};
	const [value, setValue] = useState("");
	const emojiRef = useRef();
	return (
		<form className="input__box" onSubmit={submitHandler}>
			{showEmoji && <EmojiPicker setValue={setValue} ref={emojiRef} />}
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={e => setValue(e.target.value)}
				onFocus={() => emojiRef.current?.close()}
			/>
			<button type="submit" aria-label="submit">
				<img src={sendIcon} alt="send" />
			</button>
		</form>
	);
};

export default Input;
