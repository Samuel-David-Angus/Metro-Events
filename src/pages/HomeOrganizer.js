import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';

function Organizer() {
    const location = useLocation();
    const data = location.state;


    const navigate = useNavigate();

    useEffect(
        
        () => {
            console.log(location.state);
            if (!data) {
                navigate('/');
            }

    }, [])
    return (
      <div className="Organizer">
        <AppBar position="static" sx={{bgcolor: 'orange'}}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data && `Organizer: ${data.first_name} ${data.last_name}`}
            </Typography>
            <Button component={Link} to="/organizer/events" color="inherit" state={data}>See Events</Button>
            <Button component={Link} to="/organizer/join_requests" color="inherit" state={data}>See Join Requests</Button>
            <Button component={Link} to="/organizer/my_events" color="inherit" state={data}>My Events</Button>
            <Button component={Link} to="/organizer/create_event" color="inherit" state={data}>Create Event</Button>
        </Toolbar>
        </AppBar>
        <Outlet />
      </div>
    );
  }
  
  export default Organizer;