const express=require("express")
const connection=require("./db")
const userrouter=require("./routes/user")
const postrouter=require("./routes/post")
const limiter = require("./middleware/limiter")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
// app.use(limiter)
app.use("/users",userrouter)
app.use("/posts",postrouter)
app.get("/",async(req,res)=>{
res.send("Homepage")
})

app.listen(8080,async()=>{
try {
    await connection
   console.log("server is running")
} catch (error) {
    console.log(error)
}
})