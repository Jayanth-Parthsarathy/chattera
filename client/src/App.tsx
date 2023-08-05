import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Room from "./pages/Room";
import { io } from "socket.io-client";
import { useState } from "react";
import { RoomType } from "./types/room";
import CreateRoom from "./pages/CreateRoom";
const socket = io("http://localhost:3000");
export default function App() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [room, setRoom] = useState<string>("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <JoinRoom
          socket={socket}
          room={room}
          rooms={rooms}
          setRoom={setRoom}
          setRooms={setRooms}
        />
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/room/:id",
      element: <Room socket={socket} />,
    },
    {
      path: "/create",
      element: <CreateRoom />,
    },
  ]);

  return <RouterProvider router={router} />;
}
