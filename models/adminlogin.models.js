const mongoose = require('mongoose');

const adminloginSchema = new mongoose.Schema({
  name:{type:String,text:true},
  email:{type:String,text:true},
  password:{type:String,text:true},
  role_id:{type:Number,default:1},
  role: { type: String, default: "Admin" },
  status:{type:Boolean,default:true}
},{timestamps:true})

module.exports = mongoose.model("adminlogin",adminloginSchema)