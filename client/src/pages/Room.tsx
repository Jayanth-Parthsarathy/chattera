import React from "react";
import ChatSideBar from "../components/ChatSideBar";
import MessageBox from "../components/MessageBox";
import Chat from "../components/Chat";
import { Socket } from "socket.io-client";
import { Message } from "../types/message";

type Props = { socket: Socket };

const Room = (props: Props) => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  return (
    <div>
      <ChatSideBar socket={props.socket} />
      <Chat
        messages={messages}
        setMessages={setMessages}
        socket={props.socket}
      />
      <MessageBox
        socket={props.socket}
        setMessages={setMessages}
        messages={messages}
      />
    </div>
  );
};

export default Room;
