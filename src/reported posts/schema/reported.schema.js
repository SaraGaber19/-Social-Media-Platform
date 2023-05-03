const {Schema}=require("mongoose")
const reprted_schema= new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"user"},
    postId:{type:Schema.Types.ObjectId,ref:"posts"},
    reportComment:String
},{
    timestamps:true
})

module.exports=reprted_schema