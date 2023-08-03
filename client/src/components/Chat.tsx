import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Message, MessageFromSocket } from "../types/message";
import { Socket } from "socket.io-client";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket;
};

const Chat = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await axios.get(`room/getmessages/${id}`);
      props.setMessages(data.messages);
    };
    fetchMessages();
  }, []);
  useEffect(() => {
    props.socket.on("receive", (message: any) => {
      console.log(message);
      props.setMessages((prev) => [...prev, message]);
    });
    return () => {
      props.socket.off("receive");
    };
  }, [props.socket]);
  return (
    <div>
      Chat
      <ul>
        {props.messages.map((message) => (
          <li key={message._id}>
            {message.text}
            <span>sent by{" " + message.user?.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
