// src/components/admin/MenuItemForm.jsx
import React, { useState, useEffect } from "react";
import {
  DialogTitle, DialogContent, DialogActions, Button,
  TextField, FormControlLabel, Switch
} from "@mui/material";
import axios from "axios";

const MenuItemForm = ({ item, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price);
      setCategory(item.category);
      setIsAvailable(item.isAvailable);
    }
  }, [item]);

  const handleSubmit = async () => {
    const payload = { name, price, category, isAvailable };

    if (item) {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/menu/${item._id}`, payload);
    } else {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/menu`, payload);
    }

    onClose();
  };

  return (
    <>
      <DialogTitle>{item ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ my: 1 }} />
        <TextField fullWidth label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} sx={{ my: 1 }} />
        <TextField fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)} sx={{ my: 1 }} />
        <FormControlLabel
          control={<Switch checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />}
          label="Available"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{item ? "Update" : "Add"}</Button>
      </DialogActions>
    </>
  );
};

export default MenuItemForm;
