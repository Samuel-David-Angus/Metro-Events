import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

function Notifications() {
    const [notifs, setNotifs] = useState([]);
    const location = useLocation();
    const data = location.state;
    const [change, setChange] = useState(false);

    const fetchData = () => {
        axios.get('http://localhost:3001/Notifications')
        .then(
            response => {
                const allNotifs = response.data;
                const joinedEvents = allNotifs.filter(notif => {
                    return notif.receiver == data.id && notif.status == "unread";
                });
                setNotifs(joinedEvents);
            }
        ).catch(
            err => {
                console.log("error:", err);
            }
        )
    }

    useEffect(
        () => {
           fetchData();

    }, [change])

    return (
      <div className="Notifications">
        <h1>Notifications</h1>
        {notifs.map(
            (notif, index) => (<NotifCard key={index} notifName={notif.title} notifMessage={notif.message} nid={notif.id} data={data} setChange={setChange} change={change} />)
        )}
      </div>
    );
  }
  
  function NotifCard({ notifName, participants, notifMessage, nid, data, setChange, change }) {
    const handleRead = () => {
        const result = window.confirm("Mark as read");
        if (result) {
            axios.patch(`http://localhost:3001/Notifications/${nid}`, {status: "read"})
            .then (
                response => {
                    console.log("marked as read", response.data);
                    setChange(!change);
                }
            ).catch (
                err => {
                    console.log("error", err);
                }
            )
        }
      };
      
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {notifName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Message: {notifMessage}
          </Typography>
          <Button onClick={handleRead} variant="contained" color="primary">
            Mark as Read
          </Button>
        </CardContent>
      </Card>
    );
  }


  export default Notifications;