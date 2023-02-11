
const jwt = require("jsonwebtoken");
const User = require("../schemas/user")

const authorizationValidation = (req,res,next)=>{
const {authorization} = req.headers;
// console.log(authorization)
if(!authorization){
    return res.status(401).json({
        status:"Failed",
        message: "you  must be loggedin"
    })
}
const token = authorization
// console.log(token)
jwt.verify(token,process.env.SECRETKEY,async(error,payload)=>{
    if(error){
        return res.status(401).json({
            status:"Failed",
            error: error.message
        })
    }
    // console.log(error,payload)

    const {_id} = payload;
    
    const user = await User.findById(_id);
    // console.log(user)
    // console.log(_id)
    req.token = token;
    req.user = user;
    next();
})
}

module.exports = authorizationValidation;


