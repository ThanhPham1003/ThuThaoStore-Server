const express = require('express');
const router = express.Router();
const Order = require('../Objects/Order');
const admin = require('../config/firebase-config');
const multer = require('multer');
const path = require('path');
const middleware = require('../middleware');

router.use(middleware.decodeToken);
router.get('', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.json({ message: err });
    }
})
router.get('/:clientid', async (req, res) => {
    try {
        const orders = await Order.find({ "clientid": req.params.clientid })
        res.json(orders);
    } catch (err) {
        res.json({ message: err });
    }

})
router.get('/products/:productID', async (req, res) => {
    try {
        console.log("Connect to orders")
        const orders = await Order.find({ "productid": req.params.productID })
        res.json(orders);
    } catch (err) {
        res.json({ message: err });
    }

})
router.post('', async (req, res) => {
    const order = new Order({
        productname: req.body.productname,
        productid: req.body.productid,
        clientid: req.body.clientid,
        type: req.body.type,
        amount: req.body.amount,
        deposit: req.body.deposit,
        costs: req.body.costs,
        sells: req.body.sells,
        dayordered: req.body.dayordered,
    });
    res.send("Succesfully");
    try {
        const saveOrder = await order.save();

    } catch (err) {
        res.send("Error with post order");
    }
});
router.delete('/:orderID', async (req, res) => {
    try {
        const removeOrder = await Order.deleteOne({ _id: req.params.orderID });
        res.send("Delete successfully")
    } catch (err) {
        res.send("Error with delete order");
    }
});
router.patch('/:orderID', async (req, res) => {
    try {
        const updateOrder = await Order.updateMany(
            { _id: req.params.orderID },
            {
                $set: {
                    type: req.body.type,
                    amount: req.body.amount,
                    dayordered: req.body.dayordered,
                    deposit: req.body.deposit,
                }
            }
        );
        res.send("Update successfully")
    } catch (err) {
        res.send("Error with update order");
        console.log("55555", err);
    }
});
module.exports = router;