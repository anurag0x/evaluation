const express=require("express")
const UserModel = require("../model/User")
const userrouter=express.Router()
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
const Blacklist = require("../model/Blacklist")

userrouter.post("/register", async(req, res) =>{
    // console.log(req.body)
    const {password, email} = req.body;
    try {
        const existingUser = await UserModel.find({email});
        if(existingUser.length){
            return res.status(400).send({"msg" : "User already exists"});
        }else{
            bcrypt.hash(password, 5, async(err, hash)=>{
                const user = new UserModel({...req.body,password : hash});
                await user.save();
                return res.status(200).send({"msg": "User registerd successfully"});
            })
        }
    } catch (error) {
        res.status(400).send({"error" : error});
    }
})

userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            const veriify=bcrypt.compareSync(password,user.password)
            if(!veriify){
                return res.status(401).send("Wrong password or email")
            }
            token=jwt.sign({email:user.email},"masai")
          return  res.status(200).send( {"msg":"Login successful!", "Token":token})
        }else{
          return  res.status(400).send( {"msg":"User Not Found"})
        }
    } catch (error) {
        console.log(error)
      return  res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
userrouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization

    try {
        const data=new Blacklist({token})
        await data.save()
      return  res.status(200).send( {"msg":"User has been logged out"})
    } catch (error) {
        console.log(error)
      return  res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
module.exports=userrouter