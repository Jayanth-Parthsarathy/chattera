import React from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Message } from "../types/message";

type Props = {
  socket: Socket;
  setMessages: React.Dispatch<Message[]>;
  messages: Message[];
};
const MessageBox = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [text, setText] = React.useState<string>("");
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/message/" + id, { text });
    const username = localStorage.getItem("username");
    const payload = { text, username };
    if (!username) {
      return;
    }
    console.log();
    const messagePayload = {
      text,
      user: {
        _id: data.message.user._id,
        username: username,
      },
      _id: uuidv4(),
    };
    props.setMessages([...props.messages, messagePayload]);
    props.socket.emit("send", payload);
    setText("");
  };
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageBox;
