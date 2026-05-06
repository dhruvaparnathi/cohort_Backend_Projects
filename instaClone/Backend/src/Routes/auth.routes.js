const express = require("express");
const authRoutes = express.Router();
const authController = require('../Controllers/auth.controller');

authRoutes.post("/register", authController.registerController);

authRoutes.post("/login", authController.loginController);

module.exports = authRoutes;