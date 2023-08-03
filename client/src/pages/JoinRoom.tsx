import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import axios from "../utils/axios";
import { RoomType } from "../types/room";

type Props = {
  socket: Socket;
  room: string;
  rooms: RoomType[];
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>;
};

const JoinRoom = (props: Props) => {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(`/room/join/${props.room}`);
    const payload = {
      username: localStorage.getItem("username"),
      room: props.room,
    };
    props.socket.emit("joinRoom", payload);
    navigate(`/room/${props.room}`);
  };
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username === undefined || username === null) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await axios.get("/room/");
      props.setRooms(data.rooms);
    };
    fetchRooms();
  }, []);
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => props.setRoom(e.target.value)}>
          <option value="">Select a room</option>
          {props.rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.name}
            </option>
          ))}
        </select>
        <button type="submit">Join Room</button>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default JoinRoom;
