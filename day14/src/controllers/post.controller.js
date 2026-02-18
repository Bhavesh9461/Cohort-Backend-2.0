const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const createPostController = async (req,res)=>{
    const {caption} = req.body

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Invalid token or token required... Unautorized access."
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: "user not authorized."
        })
    }
    


    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: req.file.originalname,
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfull.",
        post
    })
}

const getPostController = async (req,res)=>{
    
    let token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Invalid token or token required!"
        })
    }

    let decoded = null;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: "user not authorized."
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    if(!posts){
        return res.status(404).json({
            message: "post not found."
        })
    }

    if(posts.length === 0){
        return res.status(404).json({
            message: "There is no post uploaded yet."
        })
    }

    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
}

const getPostDetailsController = async (req,res)=>{
    try{
        const token = req.cookies.token

        if(!token){
            return res.status(401).json({
                message: "Invalid token or token required."
            })
        }

        let decoded = null;

        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch(err){
            return res.status(401).json({
                message: "unauhorized access!"
            })
        }

        const userId = decoded.id
        const postId = req.params.postId

        const post = await postModel.findById(postId)

        if(!post){
            return res.status(404).json({
                message: "post not found."
            })
        }

        const isValidUser = post.user.toString() === userId

        if(!isValidUser){
            return res.status(403).json({
                message: "Forbidden Content"
            })
        }

        res.status(200).json({
            message: "Post fetched successfully.",
            post
        })

    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}