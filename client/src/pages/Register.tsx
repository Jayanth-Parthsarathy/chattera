import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !email) {
      return;
    }
    const { data } = await axios.post("auth/register", {
      username,
      password,
      email,
    });
    navigate("/login");
  };
  const navigateToLogin = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={navigateToLogin}>Already Registered? Login</button>
    </div>
  );
};

export default Login;
