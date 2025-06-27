import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const WelcomePage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper elevation={2} sx={{ p: 25, textAlign: "center" }}>
        <Typography variant="h3" sx={{fontSize: "70px", fontWeight: "bold"}}>
          Welcome to AI Menu 
        </Typography>
        <Typography sx={{ fontSize: "80px", mb: 1 }}>🍽️</Typography>

        <Typography variant="subtitle1" sx={{ fontSize: "20px", mb: 3 }}>
          A smart restaurant ordering system where customers scan a QR code, view the menu, and place orders. Admins monitor everything in real-time.
        </Typography>

      </Paper>
    </Container>
  );
};

export default WelcomePage;
