const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {

    const followeeUsername = req.params.username;
    const followerUsername = req.user.username;

    if (followerUsername === followeeUsername) {
        return res.status(400).json({ message: "You Can't follow yourself." });
    }

    const followeeExists = await userModel.findOne({
        username: followeeUsername
    });

    if (!followeeExists) {
        return res.status(404).json({ message: `user ${followeeUsername} you trying to follow, does not exist.` });
    }

    const alreadyFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (alreadyFollow) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}.`
        });
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    });

    res.status(201).json({
        message: "follow request sent successfully.",
        follow: followRecord
    })
}

async function unfollowUserController(req, res) {

    const followeeUsername = req.params.username;
    const followerUsername = req.user.username;

    if (followeeUsername === followerUsername) {
        return res.status(400).json({ message: "You Can't unfollow yourself." });
    }

    const followeeExists = await userModel.findOne({
        username: followeeUsername
    });

    if (!followeeExists) {
        return res.status(404).json({ message: `user ${followeeUsername} you trying to unfollow, does not exist.` });
    }

    const isUserFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    });

    if (!isUserFollowing) {
        return res.status(400).json({ message: `You are not following ${followeeUsername}` });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `Now you unfollowed ${followeeUsername}`
    });

}

async function getAllFollowRequestsController(req, res) {

    const username = req.user.username;

    const followRequests = await followModel.find({
        followee: username
    });

    if (!followRequests) {
        return res.status(200).json({ message: "No Follow Requests Found" });
    }

    res.status(200).json({
        message: "Follow Request Fetched successfully.",
        followRequests
    });
}

async function getAllFollowingsController(req, res) {

    const username = req.user.username;

    const followings = await followModel.find({
        follower: username,
        status: "accepted"
    });

    if (followings.length===0) {
        return res.status(200).json({ message: "You don't follow anyone." });
    }

    res.status(200).json({
        message: "Followings Fetched successfully.",
        followings
    });
}

async function getAllFollowersController(req, res) {

    const username = req.user.username;

    const followers = await followModel.find({
        followee: username,
        status: "accepted"
    });

    if (followers.length===0) {
        return res.status(200).json({ message: "You don't have followers." });
    }

    res.status(200).json({
        message: "Followers Fetched successfully.",
        followers
    });
}

async function acceptFollowRequestController(req, res) {

    const follower = req.params.username;
    const followee = req.user.username;

    const followerExists = await userModel.findOne({
        username: follower
    });

    if (!followerExists) {
        return res.status(404).json({ message: `username ${follower} does not exists.` });
    }

    const updated = await followModel.findOneAndUpdate(
        { follower, followee, status: "pending" },
        { $set: { status: "accepted" } },
        { returnDocument: 'after', runValidators: true }   
    );

    if (!updated) {
        return res.status(404).json({ message: "No pending follow request found." });
    }

    return res.status(200).json({
        message: "Follow request accepted.",
        follow: updated
    });
}

async function rejectFollowRequestController(req, res) {

    const follower = req.params.username;
    const followee = req.user.username;

    const followerExists = await userModel.findOne({
        username: follower
    });

    if (!followerExists) {
        return res.status(404).json({ message: `username ${follower} does not exists.` });
    }

    const updated = await followModel.findOneAndUpdate(
        { follower, followee, status: "pending" },
        { $set: { status: "rejected" } },
        { returnDocument: 'after', runValidators: true }
    );

    if (!updated) {
        return res.status(404).json({ message: "No pending follow request found." });
    }

    return res.status(200).json({
        message: "Follow request rejected.",
        follow: updated
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
    getAllFollowRequestsController,
    getAllFollowingsController,
    getAllFollowersController,
    acceptFollowRequestController,
    rejectFollowRequestController
}