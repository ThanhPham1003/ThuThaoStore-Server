const express = require('express');
const router = express.Router();
const Order = require('../Objects/Order');
const admin = require('../config/firebase-config');
const multer = require ('multer');
const path = require('path');
const middleware = require('../middleware');

router.use(middleware.decodeToken);
router.get('', async (req,res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    }catch(err){
        res.json({message: err});
    }
})
router.get('/:clientPhone', async (req,res) => {
    try{
        const orders = await Order.find({"phone": req.params.clientPhone})
        res.json(orders);
    }catch(err){
        res.json({message: err});
    }

})
router.get('/products/:productID', async (req,res) => {
    try{
        console.log("Connect to orders")
        const orders = await Order.find({"productid": req.params.productID})
        res.json(orders);
    }catch(err){
        res.json({message: err});
    }

})
router.post('', async (req,res) => {
    console.log('22222', req.body);
    const order = new Order({
        productname: req.body.productname,
        productid: req.body.productid,
        phone: req.body.phone,
        clientname: req.body.clientname,
        type: req.body.type,
        amount: req.body.amount,
        dayordered: req.body.dayordered,
    });
    res.send("succesfully");
    try{
        const saveOrder = await order.save();
        res.json(saveOrder);
    }catch(err) {
        res.json({message: err});
        console.log("33333", err);
    }
});
module.exports = router;