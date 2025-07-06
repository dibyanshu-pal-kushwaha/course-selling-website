const { Router } =require("express");
const { z } = require("zod");
const  userRouter =Router();
const { UserModel }= require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {usermiddleware}= require("../middlewares/user");
const jwt_secret = process.env.JWT1;
const { PurchaseModel }= require("./db");

const Schema = z.object({
    email : z.string().min(3).max(100).email(),
    password : z.string().min(3).max(100),
    Firstname : z.string().min(3).max(100),
    Lastname : z.string().min(3).max(100)
})

userRouter.post("/signup",async function(req,res){
   
    const parsedData = Schema.safeParse(req.body);
    if(parsedData.success){
        const hashed_password= await bcrypt.hash(parsedData.data.password,5);
        await UserModel.create({
            email : parsedData.data.email,
            password: hashed_password,
            Firstname: parsedData.data.Firstname,
            Lastname : parsedData.data.Lastname
        })

        res.json({
        msg : "signed up successfully!"
    })

    }else{
        res.status(403).json({
            msg : "Incorrect",
            error: parsedData.error
        })
        
    }
    

})

userRouter.post("/login",async function(req,res){
    const {email,password} = req.body;
    try{
        const User_email =await UserModel.findOne({email});
        if(!User_email){
            res.status(400).json({
                msg : "Invalid creds!"
            })
            return;
        }

        try {
             const unhashed_pass= await bcrypt.compare(password,User_email.password);
             if(!unhashed_pass){
               res.status(403).json({
                msg: "Invalid Passwords!"
               })
               return 
             }
             const token = jwt.sign( { id: User_email._id },jwt_secret);
                res.json( {msg : "logged up successfully!"
                , token}
                )
            
        }catch(e){
            res.status(403).json({
            msg : "Invalid Passwords!"
        })
        }
       
    
    }catch(e){
        res.json({
            msg : "invalid creds"
        })
    }
    

})

userRouter.get("/",usermiddleware,async function(req,res){
    const token = req.headers.token;
    const  pass = jwt.verify(token,jwt_secret);
    const user = await UserModel.findById(pass.id);
    console.log({user});
    res.json({
        msg : "signed up successfully!",
        user
    })
})

userRouter.get("/purchases",usermiddleware,async function(req,res){
    const userId = req.AdminId;

    try{
        const course = await PurchaseModel.find({
        userId
        }).lean();
        //adding the payment gateway here:
        res.json({
            userId,
            msg : "Successfull Purchase!"
        })
    }catch(e){
        res.status(500).json({
            msg : "Server Issues!"
        })
    }
})




module.exports ={
    userRouter: userRouter
}