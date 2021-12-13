const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true,
  },
  email:{
    type: String,
    required: true,
  },
  
  name:{
    type: String,
    required:true,
  },
  age:{
    type: String,
    required: true,
  },
  url:{
    type: String,
    required: true,
  },
  lastsells:{
    type: String,
    required: true,
  },
  currentsells:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('users', UserSchema);