const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: "",
        trim: true
    },

    imgUrl:{
        type: String,
        required: [true, "imageUrl required for creating a post."]
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "UserID is required for creating a post."]
    }

},{
    timestamps: true
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;