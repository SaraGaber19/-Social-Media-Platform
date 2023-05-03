const mongoose=require("mongoose")
const reprted_schema = require("../schema/reported.schema")
const reported =mongoose.model("reported",reprted_schema);
module.exports=reported