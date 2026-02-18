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

module.exports = {
    createPostController
}