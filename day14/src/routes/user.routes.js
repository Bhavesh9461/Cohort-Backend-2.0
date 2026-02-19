const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/** 
 * @route POST /api/users/follow/:username
 * @description Follow a user
 * @access Private */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/** 
 * @route POST /api/users/unfollow/:username
 * @description Unfollow a user
 * @access Private */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

/** 
 * @route PATCH /api/users/follow/:username/status
 * @description accept or reject a follow request
 * @access Private */
userRouter.patch("/follow/:username/status", identifyUser, userController.updateFollowStatusController)

module.exports = userRouter