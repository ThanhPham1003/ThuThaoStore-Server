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
  age:{
    type: String,
    required: true,
  },
  color:{
      type: String,
      required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  url:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('products', ProductSchema);