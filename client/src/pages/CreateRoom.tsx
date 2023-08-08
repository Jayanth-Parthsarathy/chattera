import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const CreateRoom = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("room/create", { name });
    navigateToJoinRoom();
  };
  const [name, setName] = React.useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username === undefined || username === null) {
      navigate("/login");
    }
  }, []);

  const navigateToJoinRoom = () => {
    navigate("/");
  };
  return (
    <div className="h-full w-full bg-gray-500 text-white flex items-center justify-center bg-[url('/login_page.jpg')] bg-no-repeat bg-cover">
      <div className="h-[500px] w-[500px] bg-[#313338] rounded-lg p-5 px-20">
        <div className="text-center mt-14">
          <h1 className="text-5xl">Chattera ✨ </h1>
        </div>
        <div className="text-center">
          <h1 className="text-3xl text-bold mt-7">Create Room</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
          <div className="text-center">
            <h5 className="text-lg text-bold mt-5 text-[#B5BAC1]">Room Name</h5>
            <input
              type="text"
              value={name}
              className="p-1 h-12 w-full mt-3 border-none outline-none rounded-md bg-gray-200 text-black text-lg pl-5"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="mt-6 h-12 w-full bg-blue-600 rounded-md hover:bg-gray-700 text-lg text-bold"
              type="submit"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
