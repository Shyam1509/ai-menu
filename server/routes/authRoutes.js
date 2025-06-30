const express = require ('express');
const { login, generateQr } = require("../controllers/authController")

const authRouter = express.Router();

authRouter.post("/login", login)
authRouter.post("/generate-qr", generateQr)

module.exports = authRouter;