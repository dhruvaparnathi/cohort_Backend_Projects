const express = require('express');
const postRoutes = express.Router();
const postController = require('../Controllers/post.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require('../Middlewares/auth.middleware');

postRoutes.post('/',upload.single('postImage'), identifyUser, postController.createPostController);

postRoutes.get('/', identifyUser, postController.getAllPostsController);

postRoutes.get('/details/:postId', identifyUser, postController.getPostDetailsController);

postRoutes.post('/like/:postId', identifyUser, postController.likePost);

postRoutes.post('/unlike/:postId', identifyUser, postController.unlikePost);

postRoutes.get('/feed', identifyUser, postController.feedController);

module.exports = postRoutes;