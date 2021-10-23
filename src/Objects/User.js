const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
  },
  uid: {
    type: String,
    require: true,
  },
  date:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('users', UserSchema);