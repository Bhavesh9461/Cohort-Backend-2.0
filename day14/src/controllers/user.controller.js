const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

const followUserController = async (req,res)=>{
    try{
        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        if(followerUsername === followeeUsername){
            return res.status(400).json({
                message: "you can't follow yourself."
            })
        }

        const isFolloweeExists = await userModel.findOne({
            username: followeeUsername
        })

        if(!isFolloweeExists){
            return res.status(404).json({
                message: `User not exists with this name '${followeeUsername}' `
            })
        }

        const isAlreadyFollowing = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if(isAlreadyFollowing){
            return res.status(200).json({
                message: `You are already following ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

        const followRecord = await followModel.create({
            follower: followerUsername,
            followee: followeeUsername
        })

        res.status(201).json({
            message: `Follow request send to ${followeeUsername}`,
            follow: followRecord 
        })
    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

const unfollowUserController = async (req,res)=>{
    try{
        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        if(followerUsername === followeeUsername){
            return res.status(200).json({
                message: "You can't unfollow yourself."
            })
        }

        const isUserFollowing = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if(!isUserFollowing){
            return res.status(200).json({
                message: `You are not following ${followeeUsername}`
            })
        }

        await followModel.findByIdAndDelete(isUserFollowing._id)

        res.status(200).json({
            message: `You have unfollowed ${followeeUsername}`
        })

    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
} 

const updateFollowStatusController = async (req,res)=>{
    try{
        const followerUsername = req.params.username
        const followeeUsername = req.user.username
        const {status} = req.body

        if(!["accepted", "rejected"].includes(status)){
            return res.status(400).json({
                message: "Status must be accepted or rejected."
            })
        }

        if(followerUsername === followeeUsername){
            return res.status(200).json({
                message: "You can't accept or reject your request..bcz you are searching your id."
            })
        }

        const followRequest = await followModel.findOne({
            follower: followerUsername,
            followee: followeeUsername
        })

        if(!followRequest){
            return res.status(404).json({
                message: "Follow request not found!"
            })
        }

        if(followRequest.followee !== followeeUsername){
            return res.status(403).json({
                message: "You are not allowed to update this request or unauthorized."
            })
        }

        if(followRequest.status !== "pending"){
            return res.status(400).json({
                message: "Request already processed."
            })
        }

        followRequest.status = status
        await followRequest.save()

        res.status(200).json({
            message: `Follow request ${status}`,
            follow: followRequest
        })

    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    followUserController,
    unfollowUserController,
    updateFollowStatusController
}