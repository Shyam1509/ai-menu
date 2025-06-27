// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
            username,
            password,
        })

        localStorage.setItem("isLoggedIn", "true");
        navigate("/admin")

    } catch (error) {
        alert("Invalid credential")
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h5" gutterBottom>
          Login to Ai-Menu
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
