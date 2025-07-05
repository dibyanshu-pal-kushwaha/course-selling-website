const { Router }= require("express");
const adminRouter =Router();
const { z } = require("zod");
const { AdminModel }= require("./db");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Adminmiddleware }= require("../middlewares/admin");

const jwt_secret = process.env.JWT_SECRET_admin;

const Schema = z.object({
    email : z.string().min(3).max(100).email(),
    password : z.string().min(3).max(100),
    Firstname : z.string().min(3).max(100),
    Lastname : z.string().min(3).max(100)
})

adminRouter.post("/signup",async function(req,res){
    const parsedData = Schema.safeParse(req.body);
    if(parsedData.success){
        const hashed_password= await bcrypt.hash(parsedData.data.password,5);
        await AdminModel.create({
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
            error: parsedData.errors
        })
        
    }
    

})

adminRouter.post("/login",async function(req,res){
    const {email,password} = req.body;
    try{
        const Admin_email =await AdminModel.findOne({email});
        if(!Admin_email){
            res.status(400).json({
                msg : "Invalid creds1!"
            })
            return
        }

        try {
             const unhashed_pass= await bcrypt.compare(password,Admin_email.password);
             console.log(unhashed_pass);
             if(!unhashed_pass){
               res.status(403).json({
                msg: "Invalid Passwords2!"
               })
               return 
             }
             const token = jwt.sign( { id: Admin_email._id },jwt_secret);
             console.log("token"+token);
                res.json( {msg : "logged up successfully!"
                , token}
                )
            
        }catch(e){
            res.status(403).json({
            msg : "Invalid Passwords!!!!!!"
        })
        }
       
    
    }catch(e){
        res.json({
            msg : "invalid creds"
        })
    }
    

    
})


adminRouter.get("/courses",Adminmiddleware,async function(req,res){
    const token = req.headers.token;
    const  pass = jwt.verify(token,jwt_secret);
    const user = await AdminModel.findById(pass.id);
    console.log({user});
    res.json({
        msg : "signed up successfully!",
        user
    })
})


adminRouter.post("/courses/creation",Adminmiddleware,async function(req,res){
    const userId = req.id;
    try
    {const course = await course.create({
        title,
        description,
        price,
        imageUrl,
        creatorId : userId
    })

    res.json({
        msg: "created successfully!",
        courseId : course._id
    })}
    catch(e){
        res.status(403).json({
            msg : "Creation of course failed!"
        })
    }
})


    



adminRouter.put("/courses",async function(req,res){

    res.json({
        msg : "signed up successfully!"
    })
})

module.exports={
    adminRouter : adminRouter
}