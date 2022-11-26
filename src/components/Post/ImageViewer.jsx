import React from "react";
import { closeIcon } from "../../assets";

const ImageViewer = ({ image, onClose }) => {
	return (
		<div className="imageViewer">
			<button onClick={onClose} aria-label="close">
				<img src={closeIcon} alt="close" />
			</button>
			<img src={image} alt="post" />
		</div>
	);
};

export default ImageViewer;
