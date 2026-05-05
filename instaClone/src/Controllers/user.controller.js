const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');

async function followUserController(req, res){

    const followeeUsername = req.params.username;
    const followerUsername = req.user.username;

    if(followerUsername === followeeUsername){
        return res.status(400).json({ message: "You Can't follow yourself." });
    }

    const followeeExists = await userModel.findOne({
        username: followeeUsername
    });

    if(!followeeExists){
        return res.status(404).json({ message: `user ${followeeUsername} you trying to follow, does not exist.` });
    }

    const alreadyFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if(alreadyFollow){
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

async function unfollowUserController(req, res){

    const followeeUsername = req.params.username;
    const followerUsername = req.user.username;

    if(followeeUsername === followerUsername){
        return res.status(400).json({ message: "You Can't unfollow yourself." });
    }

    const followeeExists = await userModel.findOne({
        username: followeeUsername
    });

    if(!followeeExists){
        return res.status(404).json({ message: `user ${followeeUsername} you trying to unfollow, does not exist.` });
    }

    const isUserFollowing = await followModel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    });

    if(!isUserFollowing){
        return res.status(400).json({ message: `You are not following ${followeeUsername}` });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message: `Now you unfollowed ${followeeUsername}`
    });
   
}

module.exports = {
    followUserController,
    unfollowUserController
}