import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showModal } from "../features/modalSlice";

const useFetch = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useCallback(
		async (callback, ...props) => {
			try {
				return await callback(...props);
			} catch (error) {
				if (error.response?.status === 404) navigate("/not-found");
				const msg = error.response?.data?.msg || "Something went wrong";
				dispatch(showModal({ msg }));
			}
		},
		//if I add navigate here, it will be re-rendered every time
		//eslint-disable-next-line
		[dispatch]
	);
};

export default useFetch;
