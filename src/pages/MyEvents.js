import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

function MyEvents() {
    const [events, setEvents] = useState([]);
    const location = useLocation();
    const data = location.state;
    const [change, setChange] = useState(false);

    const fetchData = () => {
        axios.get('http://localhost:3001/Events')
            .then(
                response => {
                    const all = response.data;
                    const myevents = all.filter(e => e.organizer_id == data.id && e.status != "cancelled");
                    setEvents(myevents);
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
      <div className="MyEvents">
        <h1>MyEvents</h1>
        {events.map(
            (event, index) => (<EventCard key={index} eventName={event.title} participants={event.participants.length} upvotes={event.upvotes} eid={event.id} setChange={setChange} change={change}/>)
        )}
      </div>
    );
  }
  
  function EventCard({ eventName, participants, upvotes, eid, setChange, change}) {
    const handleCancel = () => {

        const result = window.confirm("Cancel event");
        if (result) {
            let p;
            axios.patch(`http://localhost:3001/Events/${eid}`, {status: "cancelled"})
            .then (
                response => {
                    p = response.data.participants;
                    console.log("event cancelled", response.data);
                    setChange(!change);

                    if (p.length > 0) {
                        p.forEach(
                            (id) => {
                                axios.get('http://localhost:3001/Notifications')
                                .then(
                                    response => {
                                        const notifs = response.data;
                                        const send = {
                                            id: notifs.length + 1,
                                            receiver: id,
                                            title: "Event cancelled",
                                            message: `Event ${eventName} has been cancelled`,
                                            status: "unread"
                                        }
                                        return axios.post('http://localhost:3001/Notifications', send);
                                    }
                                ).then(
                                    response2 => {
                                        console.log("notif sent", response2.data);
                                    }
                                ).catch (
                                    err => {
                                        console.log("error:", err); 
                                    }
                                )
                            }
                        )
                    }
                }
            ).catch (
                err => {
                    console.log("error", err);
                }
            )
            
        }
    }
      
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {eventName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Participants: {participants}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Upvotes: {upvotes}
          </Typography>
          <Button onClick={handleCancel} variant="contained" color="primary">
            Cancel
          </Button>
        </CardContent>
      </Card>
    );
  }


  export default MyEvents;