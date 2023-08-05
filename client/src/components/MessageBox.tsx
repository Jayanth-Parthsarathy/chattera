import React, { useEffect } from "react";
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
  const [typing, setTyping] = React.useState<string>("");
  const [boolTyping, setBoolTyping] = React.useState<boolean>(false);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("/message/" + id, { text });
    const username = localStorage.getItem("username");
    const payload = { text, username };
    if (!username) {
      return;
    }
    const messagePayload = {
      text,
      user: {
        _id: data.message.user._id,
        username: username,
      },
      _id: uuidv4(),
    };
    props.socket.emit("send", payload);
    props.setMessages([...props.messages, messagePayload]);
    setText("");
  };
  useEffect(() => {
    props.socket.on("typing", (obj) => {
      setTyping(obj.username);
    });

    return () => {
      props.socket.off("typing");
    };
  }, [props.socket]);
  return (
    <div className="w-full h-10 m-2 text-center ml-4">
      <form
        onSubmit={sendMessage}
        className="w-full p-5 flex flex-col items-start justify-center"
      >
        {typing !== "" ? (
          <div className="text-white">{typing} is typing...</div>
        ) : null}
        <input
          type="text"
          value={text}
          onChange={(e) => {
            if (!boolTyping) {
              props.socket.emit("typing", {
                username: localStorage.getItem("username"),
              });
            }
            const typingTimeout = setTimeout(() => {
              setBoolTyping(false);
            }, 20);
            clearTimeout(typingTimeout);
            setText(e.target.value);
          }}
          className="w-full p-5 bg-[#383A40] rounded-xl h-12 text-xl placeholder:text-xl outline-none text-white placeholder:text-gray-500 px-10 mb-10"
          placeholder="Type a message..."
        />
      </form>
    </div>
  );
};

export default MessageBox;
