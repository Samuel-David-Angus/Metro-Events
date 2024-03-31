import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation, Outlet } from "react-router-dom";

function Admin() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="Admin">
      <AppBar position="static" sx={{ bgcolor: "red" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data && `Admin: ${data.first_name} ${data.last_name}`}
          </Typography>
          <Button
            component={Link}
            to="/admin/events"
            color="inherit"
            state={data}
          >
            See Events
          </Button>
          <Button
            component={Link}
            to="/admin/requests"
            color="inherit"
            state={data}
          >
            See Requests
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

export default Admin;
