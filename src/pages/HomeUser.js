import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation, Outlet } from "react-router-dom";
import axios from "axios";

function User() {
  const location = useLocation();
  const data = location.state;

  const handleRequest = () => {
    axios
      .get("http://localhost:3001/Requests")
      .then((response) => {
        const requests = response.data;
        const check = requests.find(
          (request) =>
            request.user_id === data.id && request.type === "organizer"
        );
        console.log(check);
        if (!check) {
          const result = window.confirm(
            "Send request to admin to be an event organizer"
          );
          if (result) {
            console.log("User clicked OK");
            const r = {
              id: (requests.length + 1).toString(),
              user_id: parseInt(data.id).toString(),
              type: "organizer",
              event_id: null,
              status: "pending",
            };
            return axios.post("http://localhost:3001/Requests", r);
          } else {
            console.log("User clicked Cancel");
          }
        } else {
          alert("You have already sent a request pls wait for a notification");
        }
        return Promise.resolve({ data: null });
      })
      .then((response2) => {
        console.log("Response from second request:", response2.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="User">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data && `Regular User: ${data.first_name} ${data.last_name}`}
          </Typography>
          <Button
            component={Link}
            to="/user/events"
            color="inherit"
            state={data}
          >
            View Events
          </Button>
          <Button
            component={Link}
            to="/user/joined_events"
            color="inherit"
            state={data}
          >
            Joined Events
          </Button>
          <Button color="inherit" onClick={handleRequest}>
            Request to Organize
          </Button>
          <Button
            component={Link}
            to="/user/notifications"
            color="inherit"
            state={data}
          >
            Notifications
          </Button>
          <Button component={Link} to="/" color="inherit" state={data}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}

export default User;
