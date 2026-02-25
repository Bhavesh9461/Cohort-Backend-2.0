const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerController = async (req,res)=>{
    try{
        const {username,email,bio,password,profileImage} = req.body

        const isUserExists = await userModel.findOne({
            $or: [
                {email: email},
                {username: username}
            ]
        })

        if(isUserExists){
            return res.status(409).json({
                message: "user already exists" + (isUserExists.email === email ? "-email exists" : "-username exists")
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            bio,
            profileImage
        })

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )

        res.cookie("token", token)

        res.status(201).json({
            message: "user registered successfully.",
            user:{
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const loginController = async (req,res)=>{
    try{
        const {email,password,username} = req.body

        const user = await userModel.findOne(
            {
                $or:[
                    {
                        email: email
                    },
                    {
                        username: username
                    }
                ]
            }
        )

        if(!user){
            return res.status(401).json({
                message: "user do not exist."
            })
        }

        const isPassMatch = await bcrypt.compare(password, user.password)

        if(!isPassMatch){
            return res.status(401).json({
                message: "Invalid Password."
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.cookie("token", token)

        res.status(200).json({
            message: "user loggedIn successful.",
            user:{
                username: user.username,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        })

    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getMeController = async (req,res)=>{
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}