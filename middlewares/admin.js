const jwt = require("jsonwebtoken");
const jwt_Admin_mid= process.env.JWT2;


 async function Adminmiddleware(req,res,next){
    const token = req.headers.token;
    try{
        const decode = await jwt.verify(token,jwt_Admin_mid);
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