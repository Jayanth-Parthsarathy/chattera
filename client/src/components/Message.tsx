import { Trash } from "lucide-react";
import axios from "../utils/axios";
import { Socket } from "socket.io-client";
import { Message } from "../types/message";

type Props = {
  username: string;
  text: string;
  id: string;
  socket: Socket;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const MessageText = (props: Props) => {
  const localUsername = localStorage.getItem("username");
  const deleteMessage = async () => {
    const { data } = await axios.delete(`/message/${props.id}`);
    props.socket.emit("delete", { message: data.message });
    props.setMessages((prev) => prev.filter((msg) => msg._id !== props.id));
  };
  const reactToMessage = async () => { };

  if (props.username === localUsername) {
    return (
      <div className="mt-3 flex flex-col text-white w-fit h-fit min-w-[200px] rounded-md ml-auto mr-16 bg-green-400 p-2">
        <div className="ml-auto text-sm text-bold">You</div>
        <div className="text-xl break-normal">{props.text}</div>
        <Trash
          size={24}
          className="ml-auto cursor-pointer"
          onClick={deleteMessage}
        />
      </div>
    );
  }
  return (
    <div
      className="flex mt-3 flex-col w-fit text-white h-fit min-w-[200px] rounded-md ml-20 mr-16 bg-gray-500 p-2"
      onDoubleClick={reactToMessage}
    >
      <div className="text-sm text-bold">{props.username}</div>
      <div className="text-xl ml-auto flex">{props.text}</div>
    </div>
  );
};

export default MessageText;
