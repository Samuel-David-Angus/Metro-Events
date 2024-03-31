import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Admin from "./pages/HomeAdmin";
import Organizer from "./pages/HomeOrganizer";
import User from "./pages/HomeUser";
import ViewEvents from "./pages/ViewEvents";
import OrganizerRequests from "./pages/OrganizerRequest";
import JoinRequests from "./pages/JoinRequest";
import MyEvents from "./pages/MyEvents";
import JoinedEvents from "./pages/JoinedEvents";
import Notifications from "./pages/Notifications";
import CreateEvent from "./pages/CreateEvent";
import UserRegistration from "./pages/UserRegistration";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <UserRegistration />,
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin/events",
        element: <ViewEvents />,
      },
      {
        path: "/admin/requests",
        element: <OrganizerRequests />,
      },
    ],
  },
  {
    path: "/organizer",
    element: <Organizer />,
    children: [
      {
        path: "/organizer/events",
        element: <ViewEvents />,
      },
      {
        path: "/organizer/join_requests",
        element: <JoinRequests />,
      },
      {
        path: "/organizer/my_events",
        element: <MyEvents />,
      },
      {
        path: "/organizer/create_event",
        element: <CreateEvent />,
      },
    ],
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "/user/events",
        element: <ViewEvents />,
      },
      {
        path: "/user/joined_events",
        element: <JoinedEvents />,
      },
      {
        path: "/user/notifications",
        element: <Notifications />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
