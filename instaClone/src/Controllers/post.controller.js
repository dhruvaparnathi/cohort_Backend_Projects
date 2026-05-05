const postModel = require('../models/post.model');
const postLikeModel = require('../models/postLike.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: 'cohort2-instaClone'
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post Created Successfully",
        post
    })
}

async function getAllPostsController(req,res){

    const userID = req.user.id;
    
    const posts = await postModel.find({ user: userID });

    res.status(200).json({
        message: "Posts Fetched Successfully.",
        posts
    })

}

async function getPostDetailsController(req,res){

    const userID = req.user.id;
    const postID = req.params.postId;

    const post = await postModel.findById(postID);

    if(!post){
        res.status(404).json({ message: "Post not Found." });
    }

    const isValidUser = post.user.toString() === userID;

    if(!isValidUser){
        res.status(403).json({ message: "Forbidden Content." })
    }

    res.status(200).json({
        message: "Post Details Fetched Successfully.",
        post
    })

}

async function likePost(req,res){

    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({ message: "Post you trying to like does not exists."});
    }

    const ifAlreadyLiked = await postLikeModel.findOne({
        post: postId,
        user: userId
    });

    if(ifAlreadyLiked){
        return res.status(200).json({ message: "Post already liked" });
    }

    const like = await postLikeModel.create({
        post: postId,
        user: userId
    });

    res.status(200).json({
        message: "Post Liked Successfully",
        like
    });
}

async function unlikePost(req,res){

    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({ message: "Post you trying to dislike does not exists."});
    }

    const ifAlreadyLiked = await postLikeModel.findOne({
        post: postId,
        user: userId
    });

    if(!ifAlreadyLiked){
        return res.status(200).json({ message: "Post already disliked" });
    }

    await postLikeModel.findByIdAndDelete(postId);

    res.status(200).json({
        message: "Post Disliked Successfully"
    });
}

module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController,
    likePost,
    unlikePost
}