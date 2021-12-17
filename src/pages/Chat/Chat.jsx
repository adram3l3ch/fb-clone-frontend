import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createMessage, fetchMessage, fetchUser, getChats } from "../../API";
import ChatCard from "../../components/ChatCard/ChatCard";
import useFetch from "../../hooks/useFetch";
import { dp } from "../../assets";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import { addMessages, clearMessage } from "../../features/messageSlice";
import SingleChat from "../../components/SingleChat/SingleChat";
import Online from "../../components/Online/Online";
import "./chat.css";

const Chat = () => {
   const {
      user: { token, id },
      message: { messages, conversationID, to },
      modal: { isSidebarVisible },
      socket: { socket },
   } = useSelector(state => state);

   const [chats, setChats] = useState([]);
   const [receiver, setReceiver] = useState({});

   const scroll = useRef();

   useEffect(() => {
      if (scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
   }, [scroll?.current?.scrollHeight]);

   const customFetch = useFetch();
   const dispatch = useDispatch();

   useEffect(() => {
      socket?.on("receive message", (message, senderID) => {
         senderID === to && dispatch(addMessages({ text: message, send: false, createdAt: String(new Date()) }));
      });
   }, [socket, dispatch, to]);

   useEffect(() => {
      (async () => {
         const data = await customFetch(getChats, token);
         if (data) setChats(data.chat);
      })();
   }, [customFetch, token]);

   useEffect(() => {
      (async () => {
         if (conversationID) {
            let data = await customFetch(fetchUser, to, token);
            if (data) setReceiver(data.user);
            data = await customFetch(fetchMessage, conversationID, token);
            dispatch(clearMessage());
            data?.message?.forEach(m => {
               dispatch(
                  addMessages({
                     text: m.text,
                     send: m.sender === id,
                     createdAt: m.createdAt,
                  })
               );
            });
         }
      })();
   }, [conversationID, customFetch, dispatch, token, id, to]);

   const submitHandler = async message => {
      socket.emit("send message", message, to);
      dispatch(addMessages({ text: message, send: true, createdAt: String(new Date()) }));
      await customFetch(createMessage, conversationID, message, token);
   };

   return (
      <main className="chat__page">
         <section className="chat__page__cards">
            {chats.map(chat => (
               <ChatCard chat={chat} key={chat._id} />
            ))}
         </section>
         <section className="chat__page__messenger">
            {conversationID ? (
               <>
                  <header>
                     <img src={receiver.profileImage || dp} alt="chatIcon" />
                     <h3>{receiver.name}</h3>
                  </header>
                  <main ref={scroll}>
                     <div className="messenger">
                        {messages.map((message, i, messages) => {
                           return <SingleChat key={i} message={message} index={i} messages={messages} />;
                        })}
                     </div>
                  </main>
                  <footer>
                     <Input placeholder="Type a message..." handler={submitHandler} />
                  </footer>
               </>
            ) : (
               <h4>Select a conversation</h4>
            )}
            <article className={isSidebarVisible ? "singlepost__right visible" : "singlepost__right"}>
               <Online />
            </article>
         </section>
      </main>
   );
};

export default Chat;
