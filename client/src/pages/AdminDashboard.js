import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(`/admin/${path}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            AI Menu Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem
            button
            selected={
              location.pathname === "/admin/dashboard" ||
              location.pathname === "/admin"
            }
            onClick={() => handleNav("dashboard")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#2e7d32",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            button
            selected={location.pathname === "/admin/orders"}
            onClick={() => handleNav("orders")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#2e7d32",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

          <ListItem
            button
            selected={location.pathname === "/admin/generate-qr"}
            onClick={() => handleNav("generate-qr")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#2e7d32",
                color: "#fff",
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon><QrCodeIcon /></ListItemIcon>
            <ListItemText primary="Generate QR" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Page Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
