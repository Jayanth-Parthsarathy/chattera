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
    await axios.post(`/room/join/${props.room}`);
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
    <div className="h-full w-full bg-[url('/login_page.jpg')] bg-cover text-white flex items-center justify-center">
      <div className="h-[550px] w-[500px] bg-[#313338] p-16 rounded-lg text-center">
        <h1 className="text-4xl text-center">Chattera ✨ </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-black mt-10"
        >
          <div className="text-white text-2xl mb-5 text-center">
            Select Room
          </div>
          <select
            className="w-full h-14 rounded-md border-none outline-none bg-gray-100 px-10 mt-10 text-xl p-3"
            onChange={(e) => props.setRoom(e.target.value)}
          >
            <option value="" className="w-full h-10 rouded-md">
              Select a room
            </option>
            {props.rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="h-12 w-full bg-blue-600 rounded-md hover:bg-gray-700 text-lg text-bold mt-10"
          >
            Join Room
          </button>
        </form>
        <div className="text-center mt-10">
          <button
            className="w-52 h-10 bg-red-700 text-center rounded-md hover:text-red-500 hover:bg-white hover:border-red-500 hover:border-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
        <button
          className="underline text-center text-lg mt-4"
          onClick={() => navigate("/create")}
        >
          Create your own room
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;
