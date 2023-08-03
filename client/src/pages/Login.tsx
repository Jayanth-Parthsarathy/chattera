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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={navigateToRegister}>New User? Sign Up</button>
    </div>
  );
};

export default Login;
