import React, { forwardRef } from "react";
import "emoji-picker-element";
import { FaRegKeyboard } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";

const EmojiPicker = forwardRef(({ setValue }, ref) => {
	const emojiRef = useRef();

	useImperativeHandle(ref, () => ({
		close: () => setIsOpen(false),
	}));

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const emojiPicker = emojiRef.current;
		const addEmoji = e => {
			setValue(value => value + e.detail.unicode);
		};
		emojiPicker.addEventListener("emoji-click", addEmoji);
		return () => {
			emojiPicker.removeEventListener("emoji-click", addEmoji);
		};
	}, [setValue]);

	return (
		<div className="emoji-picker">
			<div className="opener" onClick={() => setIsOpen(open => !open)}>
				{isOpen ? <FaRegKeyboard /> : <BsEmojiSmile />}
			</div>
			<div className={isOpen ? "picker open" : "picker"}>
				<emoji-picker ref={emojiRef} />
			</div>
		</div>
	);
});

export default EmojiPicker;
