const jwt = require("jsonwebtoken");
const jwt_user_mid= process.env.JWT1;


function usermiddleware(req,res,next){
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ msg: "Token not provided" });
    }
    // console.log(token);
    try{
        const decode = jwt.verify(token,jwt_user_mid);
        // console.log(decode);
        // if(decode){
        //     req.userId =decode.id;
        //     next();
        // }
        console.log("Token decoded:", decode);

        if (decode && decode.id) {
            req.userId = decode.id;
            next();
        }
        else {
            res.status(401).json({ msg: "Invalid token payload" });
        }
    }catch(e){
        res.status(401).json({
            msg : "Unauthorized User!"
        })
    }
    
}

module.exports=({
    usermiddleware
})