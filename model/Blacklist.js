const mongoose =require("mongoose")
const blacklist=mongoose.Schema({
token:String
})
const Blacklist=new mongoose.model("blacklist",blacklist)
module.exports=Blacklist