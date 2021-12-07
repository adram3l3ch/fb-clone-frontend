import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessage, fetchUser } from "../../API";
import useFetch from "../../hooks/useFetch";
import { dp } from "../../assets";
import { setChatID, setReceiverID } from "../../features/messageSlice";
import "./chatcard.css";

const ChatCard = ({ chat }) => {
   const { id, token } = useSelector(state => state.user);
   const { conversationID } = useSelector(state => state.message);

   const [receiver, setReceiver] = useState({});
   const [lastMessage, setLastMessage] = useState("");

   const receiverId = chat.members.find(member => member !== id);
   const active = conversationID === chat._id;

   const customFetch = useFetch();
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         let data = await customFetch(fetchMessage, chat._id, token);
         if (data) setLastMessage(data.message?.at(-1)?.text);
         data = await customFetch(fetchUser, receiverId, token);
         if (data) setReceiver(data.user);
      })();
   }, [customFetch, receiverId, token, chat]);

   return (
      <article
         className={active ? "active chatcard" : "chatcard"}
         onClick={() => {
            dispatch(setChatID(chat._id));
            dispatch(setReceiverID(receiverId));
         }}
      >
         <img src={receiver.profileImage || dp} alt="" className="roundimage" />
         <div>
            <h2>{receiver.name || "User"}</h2>
            <p>{lastMessage || "Send a hi..."}</p>
         </div>
      </article>
   );
};

export default ChatCard;
