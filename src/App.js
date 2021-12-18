import React, { useEffect } from "react";
import SinglePost from "./pages/Singlepost/SinglePost.jsx";
import Appbar from "./components/Appbar/Appbar";
import Profile from "./pages/Profile/Profile.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";
import Cookies from "js-cookie";
import { login } from "./features/userSlice.js";
import { setSocket, usersOnline } from "./features/socketSlice";
import Modal from "./components/Modal/Modal.jsx";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Loading from "./components/Loading/Loading.jsx";
import { io } from "socket.io-client";
import Chat from "./pages/Chat/Chat.jsx";
import Messenger from "./pages/Messenger/Messenger.jsx";
import Online from "./components/Online/Online.jsx";
import { hideModal, showModal } from "./features/modalSlice.js";

function App() {
    const dispatch = useDispatch();
    const {
        user: { id },
        modal: { isLoading, isSidebarVisible },
        socket: { socket },
    } = useSelector(state => state);

    useEffect(() => {
        const user = Cookies.get("user");
        user && dispatch(login(JSON.parse(user)));
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            // dispatch(setSocket(io("http://localhost:5000")));
            dispatch(setSocket(io("https://adramelech-fb-clone.herokuapp.com")));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (socket) {
            socket.emit("add user", id);
            socket.on("usersOnline", users => {
                dispatch(usersOnline(users));
            });
            socket.on("receive message", () => {
                dispatch(showModal("1 new message"));
                setTimeout(() => dispatch(hideModal()), 4000);
            });
        }
    }, [socket, id, dispatch]);

    return (
        <Router>
            <div className="container">
                {isLoading && <Loading />}
                <Modal />
                {!id ? (
                    <Auth />
                ) : (
                    <>
                        <Appbar />
                        <div className={isSidebarVisible ? "sidebar visible" : "sidebar"}>
                            <Online />
                        </div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/post/:id" element={<SinglePost />} />
                            <Route path="/user/:id" element={<Profile />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/chat/messenger" element={<Messenger />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
