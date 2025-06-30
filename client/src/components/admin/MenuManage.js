// src/pages/admin/MenuManagement.jsx
import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Switch,
  IconButton,
  Box,
  Dialog,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import AddMenu from "../../components/admin/AddMenu";

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchMenu = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/menu`);
    setMenuItems(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleToggleAvailability = async (item) => {
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/menu/${item._id}`, {
      isAvailable: !item.isAvailable,
    });
    fetchMenu();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/menu/${id}`);
      fetchMenu();
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setOpenForm(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">🍽️ Manage Menu Items</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add New Item
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹ {item.price}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.isAvailable}
                    onChange={() => handleToggleAvailability(item)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Form Dialog for Add/Edit */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <AddMenu
          item={selectedItem}
          onClose={() => {
            setOpenForm(false);
            fetchMenu();
          }}
        />
      </Dialog>
    </Box>
  );
};

export default MenuManagement;
