
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  // employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'stock', required: true },
  addBy: { type: String, text:true },
  name: { type: String, required: true, text: true },
  category: { type: String, text: true },
  packages: { type: Number, text: true },
  total_reel: { type: Number, text: true },
  total_qty:{type:Number,text:true},
  used_qty: { type: Number, text: true},
  status: { type: Boolean, default: true },
  
    updateHistory: [
    {
      updatedBy: String,
      updatedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("stock", stockSchema);
