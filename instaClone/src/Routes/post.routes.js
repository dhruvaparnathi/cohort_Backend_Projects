const express = require('express');
const postRoutes = express.Router();
const postController = require('../Controllers/post.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

postRoutes.post('/',upload.single('postImage'), postController.createPostController);

module.exports = postRoutes;