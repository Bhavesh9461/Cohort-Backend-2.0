const app = require("./src/app")
const mongoose = require("mongoose")
require("dotenv").config()


const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connect to DB");
    })
}

connectDB()


app.listen(3000,()=>{
    console.log("server is running at port 3000.");
})