import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';

function JoinRequests() {
    const [JoinRequests, setJoinRequests] = useState([]);
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(
        () => {
            fetchData();

    }, [reload])


    const fetchData = () => {
        axios.get('http://localhost:3001/Requests')
            .then(
                response => {
                    const req = response.data;
                    const pendings = req.filter(item => item.type === "join" && item.status === "pending");
                    setJoinRequests(pendings);
                }
            ).catch(
                err => {
                    console.log("error:", err);
                }
            )

            axios.get('http://localhost:3001/Users')
            .then(
                response => {
                    setUsers(response.data);
                }
            ).catch(
                err => {
                    console.log("error:", err);
                }
            )

            axios.get('http://localhost:3001/Events')
            .then(
                response => {
                    setEvents(response.data);
                }
            ).catch(
                err => {
                    console.log("error:", err);
                }
            )
            
    }


    return (
      <div className= "JoinRequests">
        <h1> Join Requests</h1>
        {users && JoinRequests.map(
            (req, index) => (<JoinRequestCard key={index}  req={req} users={users} setReload={setReload} reload={reload} events={events}/>)
        )}
      </div>
    );
  }
  
  function JoinRequestCard({ req, users, setReload, reload, events }) {
    const requester = users.find(user => user.id == req.user_id);
    if (!requester) {
        return null; // If requester is not found, don't render anything
    }
    const handleApprove = () => {
        axios.get('http://localhost:3001/Notifications')
        .then(
            response => {
                const notifs = response.data;
                const send = {
                    id: notifs.length + 1,
                    receiver: req.user_id,
                    title: "Request Approved",
                    message: "You are now part of the event " + req.event_id,
                    status: "unread"
                }
                return axios.post('http://localhost:3001/Notifications', send);
            }
        ).then(
            response2 => {
                console.log(response2.data);
                return axios.patch(`http://localhost:3001/Requests/${req.id}/`, { status: "approved" });
            }
        ).then (
            response3 => {
                console.log("Request approved successfully:", response3.data);
                setReload(!reload);
            }
        ).catch (
            err => {
                console.log("error:", err); 
            }
        )
        const p = events.find(e => e.id == req.event_id);
        const arr = [...p.participants,req.user_id];
        console.log(req.event_id);
        axios.patch(`http://localhost:3001/Events/${req.event_id}`, {participants: arr, registration_count: arr.length})
        .then(
            response => {
                console.log("Changed successfully:", response.data);
            }
        ).catch (
            err => {
                console.log("error:", err); 
            }
        )

       
    };

    const handleDisapprove = () => {
        axios.get('http://localhost:3001/Notifications')
        .then(
            response => {
                const notifs = response.data;
                const send = {
                    id: notifs.length + 1,
                    receiver: req.user_id,
                    title: "Request to join Disapproved",
                    message: "Declined",
                    status: "unread"
                }
                return axios.post('http://localhost:3001/Notifications', send);
            }
        ).then(
            response2 => {
                console.log(response2.data);
                return axios.patch(`http://localhost:3001/Requests/${req.id}/`, { status: "disapproved" });
            }
        ).then (
            response3 => {
                console.log("Request disapproved successfully:", response3.data);
                setReload(!reload);
            }
        ).catch (
            err => {
                console.log("error:", err); 
            }
        )
        
    };
      
    return (
      <Card>
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Request from: {`${requester.first_name} ${requester.last_name}`}
          </Typography>
          <Button onClick={handleApprove} variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Approve
          </Button>
          <Button onClick={handleDisapprove} variant="contained" color="primary">
            Disapprove
          </Button>
        </CardContent>
      </Card>
    );
  }


  export default JoinRequests;
