const jwt = require("jsonwebtoken");
const jwt_user_mid= process.env.JWT1;


function usermiddleware(req,res,next){
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ msg: "Token not provided" });
    }
    // console.log(token);
    try{
        // console.log("hi");
        const decode = jwt.verify(token,process.env.JWT1);
        // console.log(decode);
        if(decode){
            req.userId =decode.id;
            next();
        }
        // console.log("Token decoded:", decode);

        // if (decode && decode.id) {
        //     req.userId = decode.id;
        //     next();
        // }
        
    }catch(e){
        res.status(401).json({
            msg : "Unauthorized User!"
        })
    }
    
}

module.exports=({
    usermiddleware
})