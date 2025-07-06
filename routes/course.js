const { Router }= require("express");
const courseRouter = Router();
const { CourseModel }= require("./db");
const { PurchaseModel }= require("./db");
const {usermiddleware} =require("../middlewares/user");

courseRouter.get("/preview",async function(req,res){
    try{
        const courses = await CourseModel.find().lean();
        
        console.log(courses);
        
        res.json({
        msg : "All courses!",
        courses
    })

    }
    catch(e){
            res.status(500).json({
                msg : " Server Error!"
            })
        }

})


courseRouter.post("/purchase",usermiddleware,async function(req,res){
    const courseId = req.body.courseId;
    const userId = req.userId;

    try{
         await PurchaseModel.create({
            userId,
            courseId
        })
        //adding the payment gateway here:
        res.json({
            msg : "Successfull Purchase!"
        })
    }catch(e){
        res.status(500).json({
            msg : "Server Issues!"
        })
    }
    

})


module.exports = {
    courseRouter : courseRouter
}

