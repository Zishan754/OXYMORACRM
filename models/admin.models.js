
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  id:{type:Number,text:true},
  name:{type:String,text:true},
  email:{type:String,text:true},
  password:{type:String,text:true},
  designation:{type:String,text:true},
  project:{type:String,text:true},
  profileImage:{type:String,text:true},
  dob:{type:String,text:true},
  contact:{type:String,text:true},
  alternate:{type:String,text:true},
  address:{type:String,text:true},
  gender:{type:String, text:true},
  role: { type: String, enum: ["Employee", "Employee TL"], default: "Employee"},
  industry: { type: String, enum: ["Software", "Firmware/Embedded", "Hardware", "HR", "BA", "Sales & Marketing"], default: "Employee"},

  showStockOption: { type: Boolean, default: false, },
  


  // ✅ Add these fields for leave tracking
  // casualLeaves: { type: Number, default: 7 },
  // sickLeaves: { type: Number, default: 7 },


  status:{type:Boolean,default:true}
},{timestamps:true})

module.exports = mongoose.model("employee",adminSchema)