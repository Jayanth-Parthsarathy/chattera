import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Room from "./pages/Room";
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <JoinRoom />,
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
      element: <Room />,
    },
  ]);

  return <RouterProvider router={router} />;
}
