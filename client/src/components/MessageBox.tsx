import React from "react";

type Props = {};

const MessageBox = (props: Props) => {
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("send message");
  };
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageBox;
