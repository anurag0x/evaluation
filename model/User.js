const mongoose =require("mongoose")
const userschrma=mongoose.Schema({
name:String,
pass:String,
email:String,
age:Number,
city:String,
})
const UserModel=new mongoose.model("user",userschrma)
module.exports=UserModel