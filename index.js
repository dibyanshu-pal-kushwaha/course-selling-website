const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwt_secret= "dibyanshu";
const {courseRouter}= require("./routes/course");
const {userRouter}= require("./routes/user");
const {adminRouter}= require("./routes/admin");
require("dotenv").config();


const app =express();
app.use(express.json());


// const final = process.env.MONGO_URL;

app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/course",courseRouter);
// console.log("MongoDB URI: ", process.env.MONGO_URL);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main();

