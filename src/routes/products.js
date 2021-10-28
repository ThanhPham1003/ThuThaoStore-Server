const express = require('express');
const router = express.Router();
const Product = require('../Objects/Product');
const admin = require('../config/firebase-config');
router.get('/', async (req, res) =>{
  try{
      const products = await Product.find();
      res.json(products);
  }
  catch(err){
      res.json({ message: err});
  }
})

router.post('/', async (req, res) => {
    const product = new Product({
        uid : req.body.uid,
        name: req.body.name,
        age: req.body.age,
        color: req.body.color,
        price: req.body.price,
        url: req.body.url,
    });

  try{
    const saveProduct = await product.save();
    res.json(saveProduct);
  }catch(err){
    res.json({message: err});
  }
})

router.get('/:productID', async (req, res) => {
    try{
        const product = await Product.findById(req.params.productID);
        console.log('Connect to product')
        res.json(product);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;