import React, { useEffect, useState } from "react";
import { chatIcon, closeIcon, dp } from "../../assets";
import Input from "../Input/Input";
import { io } from "socket.io-client";
import "./chat.css";

const Chat = () => {
   const [expanded, setExpanded] = useState(false);
   const [socket, setSocket] = useState(null);
   const [messages, setMessages] = useState([]);

   useEffect(() => {
      setSocket(io("http://localhost:5000"));
   }, []);

   const submitHandler = (message) => {
      setMessages((messages) => [
         ...messages,
         {
            message,
            send: true,
         },
      ]);
      document
         .querySelector(".chat main")
         .scrollTo(0, document.getElementById("bottom").getBoundingClientRect().bottom);
      socket.emit("send message", message);
   };

   useEffect(() => {
      socket?.on("recieve message", (message) => {
         setMessages((messages) => [
            ...messages,
            {
               message,
               send: false,
            },
         ]);
         document
            .querySelector(".chat main")
            .scrollTo(
               0,
               document.getElementById("bottom").getBoundingClientRect().bottom
            );
      });
   }, [socket]);

   return (
      <div className={expanded ? "chat" : "chat btn"}>
         <header className={expanded ? "" : "hide"}>
            <img src={chatIcon} alt="chatIcon" />
            <h3>John Doe</h3>
            <button onClick={() => setExpanded(false)}>
               <img src={closeIcon} alt="close" />
            </button>
         </header>
         <main className={expanded ? "" : "hide"}>
            <div>
               <h4>TODAY</h4>
               {messages.map((message) => (
                  <div className={message.send ? "chat__sent" : "chat__recieve"}>
                     <img src={dp} alt="profileImage" className="roundimage" />
                     <p className="message">{message.message}</p>
                  </div>
               ))}
               <div id="bottom"></div>
            </div>
         </main>
         <div className="chat__input" onClick={() => setExpanded(true)}>
            <Input placeholder="Type a message..." handler={submitHandler} />
         </div>
      </div>
   );
};

export default Chat;
