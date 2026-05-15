const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res) {

    const followeeUsername = req.params.username;
    const followerId = req.user.id;

    const followee = await userModel.findOne({
        username: followeeUsername
    });

    if (!followee) {
        return res.status(404).json({
            message: `user ${followeeUsername} you trying to follow, does not exist.`
        });
    }

    if (followerId === followee._id.toString()) {
        return res.status(400).json({
            message: "You can't follow yourself."
        });
    }

    const alreadyFollow = await followModel.findOne({
        follower: followerId,
        followee: followee._id
    });

    if (alreadyFollow) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}.`
        });
    }

    const followRecord = await followModel.create({
        follower: followerId,
        followee: followee._id
    });

    res.status(201).json({
        message: "Follow request sent successfully.",
        follow: followRecord
    });
}

async function unfollowUserController(req, res) {

    const followeeUsername = req.params.username;
    const followerId = req.user.id;

    const followee = await userModel.findOne({
        username: followeeUsername
    });

    if (!followee) {
        return res.status(404).json({
            message: `user ${followeeUsername} you trying to unfollow, does not exist.`
        });
    }

    if (followerId === followee._id.toString()) {
        return res.status(400).json({
            message: "You can't unfollow yourself."
        });
    }

    const isUserFollowing = await followModel.findOne({
        follower: followerId,
        followee: followee._id
    });

    if (!isUserFollowing) {
        return res.status(400).json({
            message: `You are not following ${followeeUsername}`
        });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `Now you unfollowed ${followeeUsername}`
    });
}

async function getAllFollowRequestsController(req, res) {

    const userId = req.user.id;

    const followRequests = await followModel
        .find({
            followee: userId,
            status: "pending"
        })
        .populate('follower', 'username profileImage');

    if (followRequests.length === 0) {
        return res.status(200).json({
            message: "No Follow Requests Found",
            followRequests: []
        });
    }

    res.status(200).json({
        message: "Follow Requests fetched successfully.",
        followRequests
    });
}

async function getAllFollowingsController(req, res) {

    const userId = req.user.id;

    const followings = await followModel
        .find({
            follower: userId,
            status: "accepted"
        })
        .populate('followee', 'username profileImage');

    if (followings.length === 0) {
        return res.status(200).json({
            message: "You don't follow anyone.",
            followings: []
        });
    }

    res.status(200).json({
        message: "Followings fetched successfully.",
        followings
    });
}

async function getAllFollowersController(req, res) {

    const userId = req.user.id;

    const followers = await followModel
        .find({
            followee: userId,
            status: "accepted"
        })
        .populate('follower', 'username profileImage');

    if (followers.length === 0) {
        return res.status(200).json({
            message: "You don't have followers.",
            followers: []
        });
    }

    res.status(200).json({
        message: "Followers fetched successfully.",
        followers
    });
}

async function getPendingFollowRequestsController(req, res) {

    const userId = req.user.id;

    const pendingRequests = await followModel
        .find({
            follower: userId,
            status: "pending"
        })
        .populate('followee', 'username profileImage');

    if (pendingRequests.length === 0) {
        return res.status(200).json({
            message: "No pending follow requests.",
            pendingRequests: []
        });
    }

    res.status(200).json({
        message: "Pending follow requests fetched successfully.",
        pendingRequests
    });
}

async function acceptFollowRequestController(req, res) {

    const followerUsername = req.params.username;
    const followeeId = req.user.id;

    const follower = await userModel.findOne({
        username: followerUsername
    });

    if (!follower) {
        return res.status(404).json({
            message: `username ${followerUsername} does not exist.`
        });
    }

    const updated = await followModel.findOneAndUpdate(
        {
            follower: follower._id,
            followee: followeeId,
            status: "pending"
        },
        {
            $set: { status: "accepted" }
        },
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
    .populate('follower', 'username profileImage')
    .populate('followee', 'username profileImage');

    if (!updated) {
        return res.status(404).json({
            message: "No pending follow request found."
        });
    }

    return res.status(200).json({
        message: "Follow request accepted.",
        follow: updated
    });
}

async function rejectFollowRequestController(req, res) {

    const followerUsername = req.params.username;
    const followeeId = req.user.id;

    const follower = await userModel.findOne({
        username: followerUsername
    });

    if (!follower) {
        return res.status(404).json({
            message: `username ${followerUsername} does not exist.`
        });
    }

    const updated = await followModel.findOneAndUpdate(
        {
            follower: follower._id,
            followee: followeeId,
            status: "pending"
        },
        {
            $set: { status: "rejected" }
        },
        {
            returnDocument: 'after',
            runValidators: true
        }
    )
    .populate('follower', 'username profileImage')
    .populate('followee', 'username profileImage');

    if (!updated) {
        return res.status(404).json({
            message: "No pending follow request found."
        });
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
    getPendingFollowRequestsController,
    getAllFollowingsController,
    getAllFollowersController,
    acceptFollowRequestController,
    rejectFollowRequestController
};