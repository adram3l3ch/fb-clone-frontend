import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const { isGuest } = useSelector(state => state.user);
	return isGuest ? <Navigate to="/" /> : children;
};

export default ProtectedRoute;
