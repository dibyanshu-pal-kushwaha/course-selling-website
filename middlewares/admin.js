const jwt = require("jsonwebtoken");
const jwt_Admin_mid= process.env.JWT2;
  

 async function Adminmiddleware(req,res,next){
    const token = req.headers.token;
    console.log(token);
    try{
        
        const decode = await jwt.verify(token,jwt_Admin_mid);
        console.log(decode);
        if(decode){
            req.AdminId =decode.id;
            next() 
        }
    }catch(e){
        res.status(401).json({
            msg : "Unauthorized Admin!"
        })
        return
    }
    
}

module.exports=({
    Adminmiddleware
})