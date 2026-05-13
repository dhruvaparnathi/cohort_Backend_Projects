const postModel = require('../models/post.model');
const postLikeModel = require('../models/postLike.model');

const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPostController(req, res) {

    if (!req.file || !req.body.caption) {
        return res.status(400).json({
            message: "No file or caption provided."
        });
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: `post-${Date.now()}`,
        folder: 'cohort2-instaClone'
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    });

    const populatedPost = await postModel
        .findById(post._id)
        .populate('user', 'username profileImage');

    res.status(201).json({
        message: "Post created successfully.",
        post: populatedPost
    });
}

async function getAllPostsController(req, res) {

    const userId = req.user.id;

    const posts = await postModel
        .find({ user: userId })
        .populate('user', 'username profileImage')
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: "Posts fetched successfully.",
        posts
    });
}

async function getPostDetailsController(req, res) {

    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel
        .findById(postId)
        .populate('user', 'username profileImage');

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        });
    }

    const isValidUser = post.user._id.toString() === userId;

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden content."
        });
    }

    const likesCount = await postLikeModel.countDocuments({
        post: postId
    });

    const isLiked = await postLikeModel.findOne({
        post: postId,
        user: userId
    });

    res.status(200).json({
        message: "Post details fetched successfully.",
        post: {
            ...post.toObject(),
            likesCount,
            isLiked: !!isLiked
        }
    });
}

async function likePost(req, res) {

    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post you are trying to like does not exist."
        });
    }

    const alreadyLiked = await postLikeModel.findOne({
        post: postId,
        user: userId
    });

    if (alreadyLiked) {
        return res.status(200).json({
            message: "Post already liked."
        });
    }

    const like = await postLikeModel.create({
        post: postId,
        user: userId
    });

    res.status(201).json({
        message: "Post liked successfully.",
        like
    });
}

async function unlikePost(req, res) {

    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post you are trying to unlike does not exist."
        });
    }

    const alreadyLiked = await postLikeModel.findOne({
        post: postId,
        user: userId
    });

    if (!alreadyLiked) {
        return res.status(200).json({
            message: "Post already unliked."
        });
    }

    await postLikeModel.findOneAndDelete({
        post: postId,
        user: userId
    });

    res.status(200).json({
        message: "Post unliked successfully."
    });
}

async function feedController(req, res) {

    const userId = req.user.id;

    const posts = await postModel
        .find()
        .populate('user', 'username profileImage')
        .sort({ createdAt: -1 })
        .lean();

    const updatedPosts = await Promise.all(
        posts.map(async (post) => {

            const likesCount = await postLikeModel.countDocuments({
                post: post._id
            });

            const isLiked = await postLikeModel.findOne({
                post: post._id,
                user: userId
            });

            return {
                ...post,
                likesCount,
                isLiked: !!isLiked
            };
        })
    );

    res.status(200).json({
        message: "Feed fetched successfully.",
        posts: updatedPosts
    });
}

module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController,
    likePost,
    unlikePost,
    feedController
};