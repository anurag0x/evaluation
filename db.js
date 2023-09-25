const mongoose=require("mongoose")
require("dotenv").config()
const db=mongoose.connect(process.env.Url)
module.exports=db