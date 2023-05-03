const bcrypt = require('bcrypt');
const req = require('express/lib/request');
const {Schema}= require("mongoose");

var CryptoJS = require("crypto-js");

const user_schema=new Schema({
    name:String,
    email:String,
    password:String,
    phone:String,
    location:String,
    role:{type:String,default:"user"},
    blocked:{type:Boolean,default:false},
    deactivated:{type:Boolean,default:false},
    confirmed:{type:Boolean,default:false},
    resetPasswordToken: String,
  resetPasswordExpires:Number

},{
    timestamps:true
})

user_schema.pre('save', async function(next) {
   this.password= await bcrypt.hash(this.password,4)
 this.phone = CryptoJS.AES.encrypt( this.phone, process.env.keyOfEncry);
 
next();
  });

  
  // user_schema.pre('updateOne', async function(next) {
  //   this.password= await bcrypt.hash(this.password,4)
  //  next();
  // });

//  user_schema.pre('updateOne', async function(next) {
//     console.log(this)
//     // doc.password= await bcrypt.hash(doc.password,4) // we will come again

// next();
//   });



module.exports=user_schema;