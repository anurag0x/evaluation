const express=require("express")
const jwt=require("jsonwebtoken")
const PostModel = require("../model/Post")
const auth = require("../middleware/auth")
const postrouter=express.Router()
postrouter.use(auth)

postrouter.post("/add",async(req,res)=>{
    console.log(req.body)
    const token =req.headers.authorization
    const decode=jwt.verify(token,"masai")
    const usermail=decode.email
    try {
        const newpost=new PostModel({...req.body,email:usermail})
        await newpost.save()
        return res.send("Post added Successfully")
    } catch (error) {
        console.log(error)
    }
})
postrouter.get("/",async(req,res)=>{
    const {device,device1,device3,device2}=req.query
    const devices=[]
    if(device) devices.push(device)
    if(device1) devices.push(device1)
    if(device2) devices.push(device2)
    if(device3) devices.push(device3)
    const token =req.headers.authorization
    const decode=jwt.verify(token,"masai")
    const usermail=decode.email
    try {
        if(devices.length===0){

       
        const newpost= await PostModel.find({email:usermail})
       
        return res.send(newpost) 
    }else{
        const newpost= await PostModel.find({email:usermail,device:{$in:devices}})
       
        return res.send(newpost) 
    }
    } catch (error) {
        console.log(error)
    }
})
postrouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const useremail=decoded.email
    const post=await PostModel.findById(id)
    try {
        if(useremail==post.email){
            const posts=await PostModel.findByIdAndUpdate(id,req.body)
            const data=await PostModel.findById(id)
           return res.status(200).send({"Post":data})  
        }
        else{
           return res.status(400).send("You Are Not Authorized")
        }
       
       
    } catch (error) {
        console.log(error)
       return res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
postrouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const useremail=decoded.email
    const post=await PostModel.findById(id)
    try {
        if(useremail==post.email){
            await PostModel.findByIdAndDelete(id)
           return res.status(200).send({"message":"post deleted"})  
        }
        else{
           return res.status(400).send("You Are Not Authorized")
        }
       
       
    } catch (error) {
        console.log(error)
       return res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
module.exports=postrouter