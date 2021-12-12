const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  uid: {
    type: String,
    require: true,
  },
  name:{
    type: String,
    required:true,
  },
  cost:{
    type: Number,
    required: true,
  },
  sell:{
    type: Number,
    required: true,
  },
  code:{
    type: String,
    required:true,
  },
  orderquantity:{
    type: String,
    required:true,
  },
  daysubmitted:{
    type: String,
    required:true,
  },
  status:{
    type: String,
    required:true,
  },
  url:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('products', ProductSchema);