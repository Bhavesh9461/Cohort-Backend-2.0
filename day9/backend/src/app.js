const express = require("express")
const noteModel = require("./models/note-model")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


app.get("/",(req,res)=>{
    res.send("welcome to day-9 topics")
})

app.post("/api/notes", async (req,res)=>{
    const {title, description} = req.body

    const note = await noteModel.create({
        title,
        description
    })

    res.status(201).json({
        message: "note created successfully.",
        note
    })
})

app.get("/api/notes", async (req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetched successfully.",
        notes
    })
})


app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const note = await noteModel.findById(id)

    if(!note){
        return res.status(409).json({
            message: "note does not exists!!"
        })
    }

    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully."
    })
})

app.patch("/api/notes/:id", async (req,res)=>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note's description updated successfully."
    })
})

console.log(__dirname);

app.use("*name", (req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app