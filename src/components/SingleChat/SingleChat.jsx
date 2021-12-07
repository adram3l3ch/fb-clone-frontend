import React from "react";
import useDate from "../../hooks/useDate";
import "./singlechat.css";

const SingleChat = ({ message, index, messages }) => {
   const diff = new Date().getDate() - new Date(message.createdAt).getDate();
   const formatedDate = useDate(message.createdAt);
   const date = diff <= 1 ? "TODAY" : diff <= 2 ? "YESTERDAY" : formatedDate;
   const showDate =
      new Date(message.createdAt).getDate() -
         (new Date(messages[index - 1]?.createdAt).getDate() || 0) >
      0;
   return (
      <div>
         {showDate && <h4>{date}</h4>}
         <div className={message.send ? "chat__sent" : "chat__recieve"}>
            <p className="message">
               {message.text}
               <span className="time">
                  {`${new Date(message.createdAt).getHours()}:${
                     new Date(message.createdAt).getMinutes() > 9
                        ? new Date(message.createdAt).getMinutes()
                        : "0" + new Date(message.createdAt).getMinutes()
                  }`}
               </span>
            </p>
         </div>
      </div>
   );
};

export default SingleChat;
