const mongoose = require('mongoose');

const postLikesSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "postId is required"]
    },
    user:{
        type: String,
        required: [true, "user is required"]
    }
},{
    timestamps: true
});

postLikesSchema.index({ post: 1,user: 1 },{ unique: true });

const postLikeModel = mongoose.model("postLikes", postLikesSchema);

module.exports = postLikeModel;