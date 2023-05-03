const { boolean } = require("joi");
const {Schema}= require("mongoose");
const comments_schema=new Schema({
    content:String,
    createdBy:{type:Schema.Types.ObjectId,ref:"user"},
},{
    timestamps:true
})
const React_schema=new Schema({
    content: {type: String,
    enum : ['like','love',"care","sad"]},
    createdBy:{type:Schema.Types.ObjectId,ref:"user"},
},{
    timestamps:true
})

const posts_schema=new Schema({
    title:String,
    desc:String,
    comments:[comments_schema],
    react:[ React_schema],
    createdBy:{type:Schema.Types.ObjectId,ref:"user"},
    blocked:{type:Boolean,default:false},
},{
    timestamps:true
})
module.exports=posts_schema;