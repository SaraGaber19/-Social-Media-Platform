const mongoose=require("mongoose");
const user_schema = require("../Schema/user.schema");
const user=mongoose.model("user",user_schema);
module.exports=user