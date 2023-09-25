const express=require("express")
const cors=require("cors")
const db = require("./db")
const userrouter = require("./routes/user")
const bodyParser=require("body-parser")
const postrouter = require("./routes/post")
const app=express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.use("/users",userrouter)
app.use("/posts",postrouter)
app.use(express.json())
app.listen(5000,async()=>{
    try {
        await db
        console.log("Server is running")
    } catch (error) {
        console.log(error)
    }
})