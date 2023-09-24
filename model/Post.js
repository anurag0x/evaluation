const mongoose =require("mongoose")
const postschema=mongoose.Schema({
title:String,
content:String,
email:String
})
const Postmodel=new mongoose.model("post",postschema)
module.exports=Postmodel