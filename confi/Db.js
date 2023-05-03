const mongoose=require("mongoose")
const connection=()=>mongoose.connect(process.env.mongoConnection).then((result)=>{
    // console.log(result)
}).catch((error)=>{
    console.log(error)
})
module.exports= connection;