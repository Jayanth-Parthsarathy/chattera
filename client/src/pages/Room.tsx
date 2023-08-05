import React, { useEffect } from "react";
import ChatSideBar from "../components/ChatSideBar";
import MessageBox from "../components/MessageBox";
import Chat from "../components/Chat";
import { Socket } from "socket.io-client";
import { Message } from "../types/message";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

type Props = { socket: Socket };

const Room = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [room, setRoom] = React.useState<string>("");
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(`/room/${id}`);
      setRoom(data.room.name);
    };
    fetchRoom();
  }, []);
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-3/12 bg-gray-600">
        <ChatSideBar socket={props.socket} room={room} />
      </div>
      <div className="h-full w-9/12 bg-gray-800">
        <Chat
          messages={messages}
          setMessages={setMessages}
          socket={props.socket}
        />
        <div className="fixed bottom-16 w-9/12 px-16">
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
