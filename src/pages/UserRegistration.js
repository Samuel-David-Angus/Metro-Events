import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        type: 'user', // Assuming default type is 'user'
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/Users`)
        .then (
            response => {
                const allUsers = response.data;
                const newUserId = allUsers.length + 1;
                const newUser = { ...formData, id: newUserId };
                console.log(newUser);
                return axios.post(`http://localhost:3001/Users`, newUser);
            }
        ).then (
            response2 => {
                console.log("added user", response2.data);
                navigate('/');
            }
        ).catch (
            err => {
                console.log("error", err);
            }
        )
    };

    return (
        <div className="user-registration">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="first_name"
                    label="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    name="last_name"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                {/* Assuming 'type' is automatically set to 'user' */}
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </div>
    );
}

export default UserRegistration;
