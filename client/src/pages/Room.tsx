import React from "react";
import ChatSideBar from "../components/ChatSideBar";
import MessageBox from "../components/MessageBox";
import Chat from "../components/Chat";

type Props = {};

const Room = (props: Props) => {
  return (
    <div>
      <ChatSideBar />
      <Chat />
      <MessageBox />
    </div>
  );
};

export default Room;
