import React from "react";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user";

type Props = { socket: Socket; room: string };

const ChatSideBar = (props: Props) => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<User[]>([]);
  const { id } = useParams<{ id: string }>();
  const leaveRoom = async () => {
    await axios.post(`/room/leave/${id}`);
    props.socket.emit("leave", id);
    navigate("/");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`/room/getusers/${id}`);
      setUsers(data.users);
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    props.socket.on("userJoined", (user: any) => {
      const joinedUser = {
        _id: user.userId,
        username: user.username,
      };
      setUsers((prev) => {
        if (!prev.find((u) => u._id === joinedUser._id)) {
          return [...prev, joinedUser];
        } else {
          return prev;
        }
      });
    });
    return () => {
      props.socket.off("userJoined");
    };
  }, [props.socket]);

  useEffect(() => {
    props.socket.on("userLeft", (user: any) => {
      setUsers((prev) => prev.filter((u) => u._id !== user.userId));
    });
    return () => {
      props.socket.off("userLeft");
    };
  }, [props.socket]);

  return (
    <div className="w-full h-full p-5 flex flex-col justify-between">
      <div>
        <div>
          <h1 className="text-4xl text-white mt-10">{props.room}</h1>
        </div>
        <div>
          <h4 className="text-white text-2xl mt-5"> Users:</h4>
          <div className="text-white text-xl flex flex-col gap-5 mt-10">
            {users?.map((user: User) => (
              <div
                className="text-white text-xl flex gap-3 items-center"
                key={user._id}
              >
                <div className="">{user.username}</div>
                <div className="h-3 mt-1 w-3 rounded-full bg-green-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-red-500 p-2 rounded-lg text-center text-white hover:text-red-500 hover:bg-white flex"
        onClick={leaveRoom}
      >
        Leave Room
      </button>
    </div>
  );
};

export default ChatSideBar;
