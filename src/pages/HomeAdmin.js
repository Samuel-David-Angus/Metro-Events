import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';

function Admin() {
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
      <div className="Admin">
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {data && `Admin: ${data.first_name} ${data.last_name}`}
            </Typography>
            <Button component={Link} to="/admin/events" color="inherit" state={data}>See Events</Button>
            <Button component={Link} to="/admin/requests" color="inherit" state={data}>See Requests</Button>
            
        </Toolbar>
        </AppBar>
        <Outlet />
      </div>
    );
  }
  
  export default Admin;