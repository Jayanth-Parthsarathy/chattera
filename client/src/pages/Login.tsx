import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

type Props = {};

const Login = (props: Props) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("auth/login", { username, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    navigate("/");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="h-full w-full bg-gray-500 text-white flex items-center justify-center bg-[url('/login_page.jpg')] bg-no-repeat bg-cover">
      <div className="h-[600px] w-[500px] bg-[#313338] rounded-lg p-5 px-20">
        <div className="text-center mt-14">
          <h1 className="text-5xl">Chattera ✨ </h1>
        </div>
        <div className="text-center">
          <h1 className="text-3xl text-bold mt-7">Welcome Back!</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
          <div className="text-center">
            <h5 className="text-lg text-bold mt-5 text-[#B5BAC1]">Username</h5>
            <input
              type="text"
              value={username}
              className="p-1 h-12 w-full mt-3 border-none outline-none rounded-md bg-gray-200 text-black text-lg pl-5"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="text-center">
            <h5 className="text-lg text-bold mt-5 text-[#B5BAC1]">Password</h5>
            <input
              type="password"
              value={password}
              className="p-1 h-12 w-full mt-3 border-none outline-none rounded-md text-lg bg-gray-200 text-black pl-5"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="mt-6 h-12 w-full bg-blue-600 rounded-md hover:bg-gray-700 text-lg text-bold"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={navigateToRegister}
            className="underline text-lg mt-4"
          >
            New User? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
