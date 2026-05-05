const express = require("express");
const followRoutes = express.Router();
const userController = require('../Controllers/user.controller');
const identifyUser = require("../Middlewares/auth.middleware");

followRoutes.post('/follow/:username', identifyUser, userController.followUserController);

followRoutes.post('/unfollow/:username', identifyUser, userController.unfollowUserController);

module.exports = followRoutes;