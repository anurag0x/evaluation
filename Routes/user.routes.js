const express = require("express");
const {UserModel} = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.get("/", async(req, res) =>{
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({"error" : error});
    }
})

userRouter.post("/register", async(req, res) =>{
    const {name, pass, email} = req.body;
    try {
        const existingUser = await UserModel.find({email});
        if(existingUser.length){
            return res.status(400).send({"msg" : "User already exists"});
        }else{
            bcrypt.hash(pass, 5, async(err, hash)=>{
                const user = new UserModel({name, pass : hash, email});
                await user.save();
                return res.status(200).send({"msg": "User registerd successfully"});
            })
        }
    } catch (error) {
        res.status(400).send({"error" : error});
    }
})

userRouter.post("/login", async(req, res) =>{
    const {email, pass} = req.body;
    try {
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            bcrypt.compare(pass, existingUser.pass, (err, result) =>{
                if(result){
                    const token = jwt.sign({userID : existingUser._id, username : existingUser.name}, "masai", {
                        expiresIn : 420
                    })
                    return res.status(200).send({"msg" : "Login Successful!", "token" : token});
                }else{
                    res.status(400).send({"msg" : "Login failed! Wrong password provided"});
                }
            })
        }
    } catch (error) {
        res.status(400).send({"error" : error});
    }
})

module.exports={
    userRouter
}