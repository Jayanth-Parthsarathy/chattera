import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { Message } from "../types/message";
import { Socket } from "socket.io-client";
import MessageText from "./Message";

type Props = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  socket: Socket;
};

const Chat = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await axios.get(`room/getmessages/${id}`);
      props.setMessages(data.messages);
    };
    fetchMessages();
  }, []);
  useEffect(() => {
    props.socket.on("receive", (message: any) => {
      props.setMessages((prev) => [...prev, message]);
    });
    return () => {
      props.socket.off("receive");
    };
  }, [props.socket]);
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username === undefined || username === null) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    props.socket.on("delete", (data: any) => {
      const message = data.message;
      const payload: Message = {
        _id: message._id,
        text: message.text,
        user: {
          _id: message.user._id,
          username: message.user.username,
        },
      };
      props.setMessages((prev) =>
        prev.filter((msg) => msg._id !== payload._id),
      );
    });
    return () => {
      props.socket.off("delete");
    };
  }, [props.socket]);

  return (
    <div
      className="text-white w-full h-full flex flex-col gap-5 overflow-auto"
      id="scroll"
    >
      <div className="mb-20">
        {props.messages.map((message) => (
          <MessageText
            socket={props.socket}
            text={message.text}
            username={message.user?.username}
            key={message._id}
            id={message._id}
            setMessages={props.setMessages}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
