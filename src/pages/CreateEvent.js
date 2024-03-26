import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateEvent() {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            "id": 0,
            "title": "",
            "description": "",
            "location": "",
            "start_date": "",
            "end_date": "",
            "organizer_id": 0,
            "participants": [],
            "capacity": 0,
            "registration_count": 0,
            "upvotes": 0,
            "status": "active"
          },
    );
    useEffect(
        
        () => {
            console.log(location.state);
            if (!data) {
                navigate('/');
            }

    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/Events`)
        .then (
            response => {
                const allEvents = response.data;
                formData.id = allEvents.length + 1;
                formData.organizer_id = data.id;
                axios.post(`http://localhost:3001/Events`, formData);
            }
        ).catch (
            err => {
                console.log("error", err);
            }
        )
        console.log(formData);
        
    };
    return <div className="create-event">
        <h1>Create Event</h1>
        <form onSubmit={handleSubmit}>
            <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                name="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                name="start_date"
                label="Start Date"
                type="date"
                value={formData.start_date}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                name="end_date"
                label="End Date"
                type="date"
                value={formData.end_date}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                name="capacity"
                label="Capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Create Event
            </Button>
        </form>
    </div>
}

export default CreateEvent;