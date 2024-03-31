import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useLocation } from "react-router-dom";

function ViewEvents() {
    const [events, setEvents] = useState([]);
    const location = useLocation();
    const data = location.state;

    useEffect(
        () => {
            axios.get('http://localhost:3001/Events')
            .then(
                response => {
                  const active = response.data.filter(e => {
                    return e.status == "active";
                  })
                  setEvents(active);
                }
            ).catch(
                err => {
                    console.log("error:", err);
                }
            )

    }, [])

    return (
      <div className="ViewEvents">
        <h1>View Events</h1>
        {events.map(
            (event, index) => (<EventCard key={index} eventName={event.title} description={event.description} participants={event.participants.length} upvotes={event.upvotes} review={event.review} eid={event.id} data={data} />)
        )}
      </div>
    );
  }
  
  function EventCard({ eventName, description, participants, upvotes, review, eid, data }) {
    const handleRequestJoin = () => {
      axios.get('http://localhost:3001/Requests')
      .then(
        response => {
          const requests = response.data;
          const check = requests.find(request => request.user_id === data.id && request.type == "join");
          if (!check) {
            const result = window.confirm("Send request to organizer to join");
            if (result) {
              console.log("User clicked OK");
              const r = {
                id: (requests.length + 1).toString(),
                user_id: parseInt(data.id),
                type: "join",
                event_id: eid,
                status: "pending",
              }
              return axios.post('http://localhost:3001/Requests', r);
            } else {
              console.log("User clicked Cancel");
            }
          } else {
            alert("You have already sent a request pls wait for a notification");
          }
          return Promise.resolve({ data: null });
        }
      ).then(
        response2 => {
          console.log('Response from second request:', response2.data);
        }
      ).catch (
        err => {
          console.log('error', err);
        }
      )
      };
      
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {eventName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Description: {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Participants: {participants}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Upvotes: {upvotes}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Review: {review}
          </Typography>
          <Button onClick={handleRequestJoin} variant="contained" color="primary">
            Request to Join
          </Button>
        </CardContent>
      </Card>
    );
  }


  export default ViewEvents;
