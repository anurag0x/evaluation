const mongoose=require("mongoose")

const post=mongoose.Schema({
    title:String,
    body:String,
    device:{type:String ,enum:["Mobile","Pc","Tablet"]},
    email:String
})
const PostModel=new mongoose.model("posts",post)
module.exports=PostModel