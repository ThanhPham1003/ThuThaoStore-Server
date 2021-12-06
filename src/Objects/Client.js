const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    link:{
        type: String,
        required:true,
    },
    phone:{
        type: String,
        required:true,
    },
    deposit:{
        type: Number,
        required:true,
    },
});
module.exports = mongoose.model('clients', ClientSchema);