const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId =mongoose.ObjectId;
// mongoose.connect("mongodb+srv://admin:987654321@cluster0.drqfagc.mongodb.net/courserapp");
//const courseSchema = Schema({///})
const user = new Schema({
     email :{type :String ,unique :true},
     password : String,
     Firstname : String,
     Lastname : String 
})

const admin = new Schema({
    email :{type : String,unique :true},
     password : String,
     Firstname : String,
     Lastname : String 

    
})

const course = new Schema({

    title : String ,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
    
})


const purchase = new Schema({
    courseId: ObjectId,
    userId : ObjectId
    
})

const UserModel = mongoose.model("user",user);
const AdminModel = mongoose.model("admin",admin);
const CourseModel = mongoose.model("course",course);
const PurchaseModel = mongoose.model("purchase",purchase);

module.exports={
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel

}    