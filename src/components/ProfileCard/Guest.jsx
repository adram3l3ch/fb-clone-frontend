import React from "react";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";

const GradientBackground = () => {
	return (
		<gradient-container>
			<gradient-color></gradient-color>
			<gradient-color></gradient-color>
			<gradient-color></gradient-color>
			<gradient-color></gradient-color>
			<gradient-backdrop></gradient-backdrop>
		</gradient-container>
	);
};

const Guest = () => {
	const dispatch = useDispatch();
	const gotoLogin = () => dispatch(logout());

	return (
		<article className="profilecard guest">
			<GradientBackground />
			<h2>Hello, Stranger</h2>
			<p>Login to use the full features ✨</p>
			<div className="btn-group">
				<button onClick={gotoLogin}>Login</button>
			</div>
		</article>
	);
};

export default Guest;
