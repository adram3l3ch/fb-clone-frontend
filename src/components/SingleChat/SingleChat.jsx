import React from "react";
import useDate from "../../hooks/useDate";
import "./singlechat.css";

const SingleChat = ({ message, index, messages }) => {
    const today = new Date();
    const createdAt = new Date(message.createdAt);
    const prevMessageDate = new Date(messages[index - 1]?.createdAt);
    const diff = today.getDate() - createdAt.getDate();
    const formatedDate = useDate(createdAt);

    const date = diff === 1 ? "YESTERDAY" : diff === 0 ? "TODAY" : formatedDate;
    const showDate = createdAt.getDate() - (prevMessageDate.getDate() || 0) > 0;

    const getTime = () => {
        return `${createdAt.getHours()}:${createdAt.getMinutes() > 9 ? createdAt.getMinutes() : "0" + createdAt.getMinutes()}`;
    };

    return (
        <>
            {showDate && <h4>{date}</h4>}
            <div className={message.send ? "chat__sent" : "chat__recieve"}>
                <p className="message">
                    {message.text}
                    <span className="time">{getTime()}</span>
                </p>
            </div>
        </>
    );
};

export default SingleChat;
