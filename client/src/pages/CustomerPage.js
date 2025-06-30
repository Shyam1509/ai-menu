import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, Button, Card, CardContent, TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const MenuPage = () => {
  const { tableId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu`);
        setMenuItems(res.data);
      } catch (error) {
        console.error("Error fetching menu", error);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item._id]: {
        ...item,
        quantity: prev[item._id]?.quantity + 1 || 1,
      },
    }));
  };

  const handlePlaceOrder = async () => {
    try {
      const items = Object.values(cart);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/order`, {
        tableId,
        items,
      });
      alert("✅ Order placed!");
      setCart({});
    } catch (error) {
      console.error("Order failed", error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Welcome to AI Menu - Table {tableId}
      </Typography>

      <Grid container spacing={2}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>₹ {item.price}</Typography>
                <Button onClick={() => handleAddToCart(item)} variant="outlined" sx={{ mt: 1 }}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {Object.keys(cart).length > 0 && (
        <Box mt={4}>
          <Typography variant="h5">🛒 Cart</Typography>
          {Object.values(cart).map((item) => (
            <Typography key={item._id}>
              {item.name} × {item.quantity} = ₹{item.price * item.quantity}
            </Typography>
          ))}
          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MenuPage;
