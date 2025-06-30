require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dbConnection = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_FRONTEND_URL
    : process.env.DEV_FRONTEND_URL;

app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(express.json());

app.use("/admin", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  dbConnection();
});
