const { Router }= require("express");
const courseRouter = Router();
const { CourseModel }= require("./db");
const { PurchaseModel }= require("./db");






courseRouter.get("/preview",async function(req,res){
    

    res.json({
        msg : "signed up successfully!"
    })
})


courseRouter.post("/purchase",async function(req,res){
  // yahan hm payment ka seen daal skte hain // usko sikhna shuru kro maharaj
    res.json({
        msg : "You have purchased the course!"
    })
})


module.exports = {
    courseRouter : courseRouter
}

