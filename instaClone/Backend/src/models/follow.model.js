const mongoose = require('mongoose');

const followsSchema = new mongoose.Schema({
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected."
        }
    }

}, {
    timestamps: true
});

followsSchema.index(
    { follower: 1, followee: 1 },
    { unique: true }
);

const followModel = mongoose.model("follow", followsSchema);

module.exports = followModel;