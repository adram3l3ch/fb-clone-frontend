import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage, fetchUser } from "../../API";
import useFetch from "../../hooks/useFetch";
import { dp } from "../../assets";
import { setChatID, setReceiverID } from "../../features/messageSlice";
import { useNavigate } from "react-router-dom";
import "./chatcard.css";

const ChatCard = ({ chat }) => {
   const { id, token } = useSelector(state => state.user);
   const {
      message: { conversationID },
      socket: { usersOnline },
   } = useSelector(state => state);

   const [receiver, setReceiver] = useState({});
   const [lastMessage, setLastMessage] = useState("");

   const receiverId = chat.members.find(member => member !== id);
   const active = conversationID === chat._id;

   const customFetch = useFetch();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         let data = await customFetch(fetchMessage, chat._id, token);
         if (data) setLastMessage(data.message?.at(-1)?.text);
         data = await customFetch(fetchUser, receiverId, token);
         if (data) setReceiver(data.user);
      })();
   }, [customFetch, receiverId, token, chat]);

   const setChat = () => {
      dispatch(setChatID(chat._id));
      dispatch(setReceiverID(receiverId));
      if (window.screen.width < 801) navigate("/chat/messenger");
   };

   return (
      <article className={active ? "active chatcard" : "chatcard"} onClick={setChat}>
         <div className={usersOnline.some(u => u.id === receiverId) ? "green" : ""}>
            <img src={receiver.profileImage || dp} alt="" className="roundimage" />
         </div>
         <div>
            <h2>{receiver.name || "User"}</h2>
            <p>{lastMessage || "Send a hi..."}</p>
         </div>
      </article>
   );
};

export default ChatCard;
