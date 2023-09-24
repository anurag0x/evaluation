const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const router=express.Router()
const Usermodel=require("../model/User")
const Blacklist = require("../model/Blacklist")
const password = require("../middleware/passchecker")
router.post("/register",password, async(req,res)=>{
    const {email,pass}=req.body
    try {
        const already=await Usermodel.findOne({email})
        if(already){
          return  res.status(201).send("User already exists")
        }
        const hash=bcrypt.hashSync(pass,6)
        const user=new Usermodel({...req.body,pass:hash})
      
        await user.save()
      return  res.status(200).send( {"msg":"The new user has been registered", "registeredUser":user})
        
    } catch (error) {
        console.log(error)
      return  res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})

router.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    try {
        const user=await Usermodel.findOne({email})
        if(user){
            const veriify=bcrypt.compareSync(pass,user.pass)
            if(!veriify){
                return res.status(401).send("Wrong password or email")
            }
            token=jwt.sign({email:user.email},"masai",{expiresIn:7000})
          return  res.status(200).send( {"msg":"Login successful!", "Token":token})
        }else{
          return  res.status(400).send( {"msg":"User Not Found"})
        }
    } catch (error) {
        console.log(error)
      return  res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
router.get("/logout",async(req,res)=>{
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
module.exports=router