import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

function JoinedEvents() {
    const [events, setEvents] = useState([]);
    const location = useLocation();
    const data = location.state;
    const [change, setChange] = useState(false);

    const fetchData = () => {
        axios.get('http://localhost:3001/Events')
        .then(
            response => {
                const allEvents = response.data;
                const joinedEvents = allEvents.filter(event => {
                    const p = event.participants;
                    return p.includes(data.id) && event.status != "cancelled";
                });
                setEvents(joinedEvents);
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
      <div className="JoinedEvents">
        <h1>JoinedEvents</h1>
        {events.map(
            (event, index) => (<EventCard key={index} eventName={event.title} participants={event.participants} upvotes={event.upvotes} eid={event.id} data={data} setChange={setChange} change={change}/>)
        )}
      </div>
    );
  }
  
  function EventCard({ eventName, participants, upvotes, eid, data, setChange, change }) {
    const handleLeave = () => {
        const result = window.confirm("Leave event");
        if (result) {
            const newList = participants.filter(p => p != data.id);
            axios.patch(`http://localhost:3001/Events/${eid}`, {participants: newList})
            .then (
                response => {
                    console.log("left event", response.data)
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
            {eventName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Participants: {participants.length}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Upvotes: {upvotes}
          </Typography>
          <Button onClick={handleLeave} variant="contained" color="primary">
            Leave
          </Button>
        </CardContent>
      </Card>
    );
  }


  export default JoinedEvents;