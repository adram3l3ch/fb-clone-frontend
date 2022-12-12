import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { setEditingPost } from "../features/postSlice";
import Appbar from "../components/Appbar/Appbar";
import Backdrop from "../components/Backdrop/Backdrop";
import EditPost from "../components/EditPost/EditPost";
import ProtectedRoute from "./ProtectedRoute";
import ProgressBar from "react-topbar-progress-indicator";

const Home = lazy(() => import("../pages/Home/Home"));
const SinglePost = lazy(() => import("../pages/Singlepost/SinglePost"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const Chat = lazy(() => import("../pages/Chat/Chat"));
const MessengerPage = lazy(() => import("../pages/Messenger/Messenger"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

const Layout = () => {
	const {
		post: { editingPost },
	} = useSelector(state => state);

	const dispatch = useDispatch();

	const closeEditing = () => {
		dispatch(setEditingPost({}));
	};

	return (
		<>
			<Backdrop show={!!editingPost._id} onClose={closeEditing}>
				<EditPost close={closeEditing} />
			</Backdrop>
			<Appbar />
			<Suspense fallback={<ProgressBar />}>
				<Outlet />
			</Suspense>
		</>
	);
};

const Router = () => {
	const authenticate = Comp => (
		<ProtectedRoute>
			<Comp />
		</ProtectedRoute>
	);
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/post/:id" element={<SinglePost />} />
				<Route path="/user/:id" element={<Profile />} />
				<Route path="/chat" element={authenticate(Chat)} />
				<Route path="/chat/messenger" element={authenticate(MessengerPage)} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default Router;
