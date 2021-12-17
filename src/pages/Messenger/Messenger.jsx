import React, { useEffect } from "react";
import Messenger from "../../components/Messenger/Messenger";
import { useNavigate } from "react-router-dom";

const MessengerPage = () => {
   const style = {
      height: "100%",
      borderRadius: "10px",
      overflow: "hidden",
   };

   const navigate = useNavigate();

   useEffect(() => {
      if (window.screen.width > 800) navigate("/chat");
   });

   return (
      <div style={style}>
         <Messenger />
      </div>
   );
};

export default MessengerPage;
