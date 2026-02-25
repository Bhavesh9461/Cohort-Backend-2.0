const express = require("express")
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()


/**
 * @route POST /api/posts [protected]
 * @description upload {caption, image-file}
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

/**
 * @route GET /api/posts [protected]
 * @description fetch all posts
 */
postRouter.get("/", identifyUser, postController.getPostController)

/**
 * @route GET /api/posts/details/:postId [protected]
 * @description fetch specific post with postId
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

/**
 * @route POST /api/posts/likes/:postId [protected]
 * @description like a post
 */
postRouter.get("/likes/:postId", identifyUser, postController.createLikeController)

module.exports = postRouter