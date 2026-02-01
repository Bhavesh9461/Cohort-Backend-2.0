const express = require("express")
const noteModel = require("./models/note-model")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())


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

module.exports = app