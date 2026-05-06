const mongoose = require('mongoose');

const followsSchema = new mongoose.Schema({
    followee: {
        type: String,
    },
    follower: {
        type: String,
    },
    status:{
        type: String,
        default: "pending",
        enum: {
            values: ["pending","accepted","rejected"],
            message: "status can only be pending, accepted or rejected."
        }
    }
},{
    timestamps: true
});

followsSchema.index({ follower: 1, followee: 1 },{ unique: true });

const followsModel = mongoose.model("follows",followsSchema);

module.exports = followsModel;