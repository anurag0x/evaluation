const mongoose=require("mongoose")

const userschema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String
})
const UserModel=new mongoose.model("users",userschema)
module.exports=UserModel