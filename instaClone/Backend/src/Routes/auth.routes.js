const express = require("express");
const authRoutes = express.Router();
const authController = require('../Controllers/auth.controller');
const identifyUser = require('../Middlewares/auth.middleware');

console.log('Auth routes loaded');

authRoutes.post("/register", authController.registerController);

authRoutes.post("/login", authController.loginController);

authRoutes.get("/get-me", identifyUser, authController.getMeController);

authRoutes.post("/logout", authController.logoutController);

module.exports = authRoutes;