const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const Postmodel = require("../model/Post")
const auth = require("../middleware/auth")
const limiter = require("../middleware/limiter")
const router=express.Router()

router.use(auth)
router.post("/add",async(req,res)=>{

    try {
        const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const useremail=decoded.email
        const data=new Postmodel({...req.body,email:useremail})
        await data.save()
       return res.status(200).send({"msg":"Post added"})
    } catch (error) {
        console.log(error)
       return res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
router.get("/get",async(req,res)=>{
    const {title}=req.query
    try {
        if(title){
          let condition ={title:new RegExp(title)}
          const posts=await Postmodel.find(condition)
         return res.status(200).send({"Posts":posts})
        }else{
            const posts=await Postmodel.find()
           return res.status(200).send({"Posts":posts})  
        }
    } catch (error) {
        console.log(error)
       return res.status(400).send( {"msg":"Something went wrong",error:error})
    }
})
router.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const useremail=decoded.email
    const post=await Postmodel.findById(id)
    try {
        if(useremail==post.email){
            const posts=await Postmodel.findByIdAndUpdate(id,req.body)
            const data=await Postmodel.findById(id)
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
router.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    const useremail=decoded.email
    const post=await Postmodel.findById(id)
    try {
        if(useremail==post.email){
            await Postmodel.findByIdAndDelete(id)
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
module.exports=router