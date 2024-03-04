import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessengerWindow from "./messenger-window";
import classes from "./messenger.module.css";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { createChatRoomAPI } from "../lib/api-chat";
import environment from "../../environment";

const Messenger = () => {
  const { user } = useSelector((state) => state.logInReducer);
  const navigate = useNavigate();

  const [instanceSocket, setInstanceSocket] = useState(null);
  const [chatToggle, setChatToggle] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let socket = openSocket(environment.api.url);
    setInstanceSocket(socket);

    socket.on("MESSAGE-OF-CLIENT-SEND", (data) => {
      let { user: my } = data;
      setMessages(my.message);
    })

    socket.on("CLIENT-RECIVE-MESSAGE-FROMADMIN-SUPPORT", (data) => {
      let { client: my } = data;
      setMessages([]);
      if(user.email == my.email) {
          setMessages(my.message);
      }
    })
  }, [chatToggle])


  const chatToggleHandler = () => {
    if(!user) {
      navigate("/login");
      return;
    }

    if(chatToggle) {
      instanceSocket.emit("CLIENT-SIGNOUT", { email: user.email});
    } else {
      instanceSocket.emit("CLIENT-SIGNIN", {id: user.userId, email: user.email});
    }

    setChatToggle((prvChatToggle) => !prvChatToggle);
  };

  return (
    <div className={classes["messenger-container"]}>
      {chatToggle && (
        <MessengerWindow user={user} socket={instanceSocket} messages={messages}/>
      )}
      <div className={classes["messenger-icon"]}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={chatToggleHandler}
        >
          <path d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z" />
        </svg>
      </div>
    </div>
  );
};

export default Messenger;
