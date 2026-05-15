const express = require("express");
const followRoutes = express.Router();
const userController = require('../Controllers/user.controller');
const identifyUser = require("../Middlewares/auth.middleware");

followRoutes.post('/follow/:username', identifyUser, userController.followUserController);
followRoutes.post('/unfollow/:username', identifyUser, userController.unfollowUserController);

followRoutes.get('/followrequests', identifyUser, userController.getAllFollowRequestsController);
followRoutes.get('/pendingrequests', identifyUser, userController.getPendingFollowRequestsController);
followRoutes.get('/followings', identifyUser, userController.getAllFollowingsController);
followRoutes.get('/followers', identifyUser, userController.getAllFollowersController);

followRoutes.post('/accept/:username', identifyUser, userController.acceptFollowRequestController);
followRoutes.post('/reject/:username', identifyUser, userController.rejectFollowRequestController);

module.exports = followRoutes;