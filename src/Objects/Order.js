const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productname:{
        type: String,
        required:true,
    },
    productid:{
        type: String,
        required:true,
    },
    clientname:{
        type: String,
        required:true,
    },
    phone:{
        type: String,
        required:true,
    },
    type:{
        type: String,
        required:true,
    },
    amount:{
        type: Number,
        required: true,
    },
    dayordered:{
        type: String,
        required:true,
    }
});

module.exports = mongoose.model('orders', OrderSchema);