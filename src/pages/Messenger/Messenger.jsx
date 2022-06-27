import React, { useEffect } from "react";
import Messenger from "../../components/Messenger/Messenger";
import { useNavigate } from "react-router-dom";

const MessengerPage = () => {
	const style = {
		height: "calc(100vh - 9rem)",
		borderRadius: "10px",
		overflow: "hidden",
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (window.innerWidth > 800) navigate("/chat");
	});

	return (
		<div style={style}>
			<Messenger />
		</div>
	);
};

export default MessengerPage;
