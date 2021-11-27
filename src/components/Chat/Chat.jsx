import React, { useState } from "react";
import "./chat.css";
import chat from "../../assets/chat.png";
import close from "../../assets/close.png";
import Input from "../Input/Input";
import dp from "../../assets/dp.jpg";

const Chat = () => {
   const [expanded, setExpanded] = useState(true);
   return (
      <div className={expanded ? "chat" : "chat btn"}>
         <header className={expanded ? "" : "hide"}>
            <img src={chat} alt="" />
            <h3>John Doe</h3>
            <button onClick={() => setExpanded(false)}>
               <img src={close} alt="" />
            </button>
         </header>
         <main className={expanded ? "" : "hide"}>
            <div>
               <h4>TODAY</h4>
               <div className="chat__sent">
                  <img src={dp} alt="" className="roundimage" />
                  <p className="message">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                     dolorum
                  </p>
               </div>
               <div className="chat__recieve">
                  <img src={dp} alt="" className="roundimage" />
                  <p className="message">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
                     dolor!
                  </p>
               </div>
               <div className="chat__sent">
                  <img src={dp} alt="" className="roundimage" />
                  <p className="message">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                     dolorum
                  </p>
               </div>
               <div className="chat__recieve">
                  <img src={dp} alt="" className="roundimage" />
                  <p className="message">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
                     dolor!
                  </p>
               </div>
               <div className="chat__sent">
                  <img src={dp} alt="" className="roundimage" />
                  <p className="message">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                     dolorum
                  </p>
               </div>
               <div className="chat__recieve">
                  <img src={dp} alt="" className="roundimage" />
                  <p className="message">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur,
                     dolor!
                  </p>
               </div>
            </div>
         </main>
         <div className="chat__input" onClick={() => setExpanded(true)}>
            <Input placeholder="Type a message..." />
         </div>
      </div>
   );
};

export default Chat;
