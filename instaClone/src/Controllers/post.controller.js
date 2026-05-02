const postModel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function createPostController(req, res) {

    const token = req.cookies.token;

    if(!token){
        res.status(401).json({ message:"Token not Provided, Unauthorized access" });
    }

    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({ message: "User not Authorized" });
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'Test',
        folder: 'cohort2-instaClone'
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post Created Successfully",
        post
    })
}

async function getAllPostsController(req,res){

    const token = req.cookies.token;

    if(!token){
        res.status(409).json({ message: "Token not provided, Unauthorized Access." });
    }

    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({ message: "Token Invalid, Unauthorized Access." });
    }

    const userID = decoded.id;
    
    const posts = await postModel.find({ user: userID });

    res.status(200).json({
        message: "Posts Fetched Successfully.",
        posts
    })

}

async function getPostDetailsController(req,res){

    const token = req.cookies.token;

    if(!token){
        res.status(409).json({ message: "Token not provided, Unauthorized Access." });
    }

    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({ message: "Token Invalid, Unauthorized Access." });
    }

    const userID = decoded.id;
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

module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController
}