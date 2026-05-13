const mongoose = require('mongoose');

const postLikesSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post ID is required"]
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user ID is required"]
    }

},{
    timestamps: true
});

postLikesSchema.index(
    { post: 1, user: 1 },
    { unique: true }
);

const postLikeModel = mongoose.model("postLike", postLikesSchema);

module.exports = postLikeModel;