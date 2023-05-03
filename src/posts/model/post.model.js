const mongoose=require("mongoose");
const { post } = require("../schema/posts.schema");
const posts_schema = require("../schema/posts.schema")
const posts=mongoose.model("posts",posts_schema);
module.exports=posts