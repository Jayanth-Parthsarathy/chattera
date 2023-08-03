import React from "react";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import axios from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user";

type Props = { socket: Socket };

const ChatSideBar = (props: Props) => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<User[]>([]);
  const { id } = useParams<{ id: string }>();
  const leaveRoom = async () => {
    props.socket.emit("leave");
    const { data } = await axios.post(`/room/leave/${id}`);
    console.log(data);
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
      console.log(user);
      setUsers((prev) => [...prev, joinedUser]);
    });
    return () => {
      props.socket.off("userJoined");
    };
  }, [props.socket]);
  useEffect(() => {
    props.socket.on("userLeft", (user: any) => {
      console.log("user left");
      setUsers((prev) => prev.filter((u) => u._id !== user.userId));
    });
    return () => {
      props.socket.off("userJoined");
    };
  }, [props.socket]);
  return (
    <div>
      ChatSideBar
      <div>
        Users
        <ul>
          {users?.map((user: User) => <li key={user._id}>{user.username}</li>)}
        </ul>
      </div>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
};

export default ChatSideBar;
