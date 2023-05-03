const posts = require("../../posts/model/post.model")

const reported = require("../model/reported.model")

const addReportedPost=async(req,res)=>{
    const {postId,reportComment}=req.body
    try {
        
    const reportedPost= new reported({userId:req.user._id,postId,reportComment})
    const savedreported=await reportedPost.save()
    res.json({message:"reported",reportedId: savedreported._id})
    } catch (error) {
        res.json({message:"error",error})
    }
}
const ReviewReported=async(req,res)=>{
    const {repotedId}=req.body
    try {
        const findPost = await reported.findOne({ _id:repotedId})
   if(findPost){
const blockPost = await posts.findOneAndUpdate({ _id:findPost.postId},{blocked:true},{new:true})
if(blockPost){
res.json({message:"blocked",blocked_post: findPost.postId})
    }
    else{
        res.json({message:"not found "})
    }

   }
   else{
    res.json({message:"there is no repoted post found"})
   }

   


    } catch (error) {
        res.json({message:"error",error})
    }
}



module.exports={
    addReportedPost,
    ReviewReported
}