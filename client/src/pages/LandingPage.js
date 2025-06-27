import React from "react";
import { Container, Typography, Button, Box, Paper } from "@mui/material";

const LandingPage = () => {
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

        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" color="primary" href="/signin">
            Go to Admin Panel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LandingPage;
