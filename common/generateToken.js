const jwt = require("jsonwebtoken");

 const generateToken=(userid)=>{

    var token = jwt.sign({id:userid}, process.env.secretKey,);
    return token
   
}
module.exports=generateToken
 // { expiresIn: 3600 }