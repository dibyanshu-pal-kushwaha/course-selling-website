const jwt = require("jsonwebtoken");
const jwt_user_mid= process.env.JWT1;


 async function usermiddleware(req,res,next){
    const token = req.headers.token;
    try{
        const decode = await jwt.verify(token,jwt_user_mid);
        if(decode){
            req.userId =decode.id;
            next()
        }
    }catch(e){
        res.status(401).json({
            msg : "Unauthorized User!"
        })
        return
    }
    
}

module.exports=({
    usermiddleware
})