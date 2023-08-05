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
    <div className="h-full w-full flex">
      <div className="h-full w-3/12 bg-gray-600">
        <ChatSideBar socket={props.socket} />
      </div>
      <div className="h-full w-9/12 bg-gray-800">
        <Chat
          messages={messages}
          setMessages={setMessages}
          socket={props.socket}
        />
        <div className="fixed bottom-9 w-9/12 px-16">
          <MessageBox
            socket={props.socket}
            setMessages={setMessages}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
};

export default Room;
