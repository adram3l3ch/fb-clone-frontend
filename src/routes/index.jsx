import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setEditingPost } from "../features/postSlice";
import Appbar from "../components/Appbar/Appbar";
import Backdrop from "../components/Backdrop/Backdrop";
import EditPost from "../components/EditPost/EditPost";
import Online from "../components/Online/Online";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
import MessengerPage from "../pages/Messenger/Messenger";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import SinglePost from "../pages/Singlepost/SinglePost";
import ProtectedRoute from "./ProtectedRoute";
import ThemeSwitch from "../components/ThemeSwitch/ThemeSwitch";

const Router = () => {
	const {
		modal: { isSidebarVisible },
		post: { editingPost },
	} = useSelector(state => state);

	const dispatch = useDispatch();

	const closeEditing = () => {
		dispatch(setEditingPost({}));
	};

	const authenticate = Comp => (
		<ProtectedRoute>
			<Comp />
		</ProtectedRoute>
	);
	return (
		<>
			<div className={isSidebarVisible ? "sidebar visible" : "sidebar"}>
				<ThemeSwitch />
				<Online />
			</div>
			<Backdrop show={!!editingPost._id} onClose={closeEditing}>
				<EditPost close={closeEditing} />
			</Backdrop>
			<Appbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/post/:id" element={<SinglePost />} />
				<Route path="/user/:id" element={<Profile />} />
				<Route path="/chat" element={authenticate(Chat)} />
				<Route path="/chat/messenger" element={authenticate(MessengerPage)} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default Router;
