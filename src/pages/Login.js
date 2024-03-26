import React, { useState } from 'react';
import { TextField, Button, Typography, Container} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission (e.g., login authentication)
        axios.get('http://localhost:3001/Users')
        .then(
            response => {
                const users = response.data;
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    let path;
                    switch(user.type) {
                        case "admin":
                            path = "/admin";
                            break;
                        case "organizer":
                            path = "/organizer";
                            break;
                        case "user":
                            path = "/user";
                            break;
                    }
                    console.log(user);
                    navigate(path, {state: user});
                } else {
                    alert('Invalid credentials!');
                }
            }
        ). catch(
            err => {
                console.error('Error:', err);
            }
        )
        console.log('Email:', email);
        console.log('Password:', password);
    };
    return (
      <div className="Login">
        <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Container>
      </div>
    );
  }
  
  export default Login;