const express = require('express');
const router = express.Router();
const Product = require('../Objects/Product');
const admin = require('../config/firebase-config');
const multer = require ('multer');
const path = require('path');
const middleware = require('../middleware');

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
})
const upload = multer({storage: storage});
router.use(middleware.decodeToken);
router.get('', async (req, res) => {
  console.log(req);
  res.send('Verified');
  console.log(" Home send request here");
})
router.get('/allproducts', async (req, res) =>{
  try{
      const products = await Product.find({status: '1'});
      res.json(products);
  }
  catch(err){
      res.json({ message: err});
  }
})

router.get('/histories', async (req,res) =>{
  try{
    const histories = await Product.find({status: '0'});
    res.json(histories);
  }catch(err){
    res.json({message: err});
  }
})

router.post('/allproducts',async (req, res) => {
  const product = new Product({
        uid : req.body.uid,
        tenSP: req.body.tenSP,
        code: req.body.code,
        giaNhap: req.body.giaNhap,
        giaBanLe: req.body.giaBanLe,
        giaCTV: req.body.giaCTV,
        soluongNhap: req.body.soluongNhap,
        soluongBanLe: req.body.soluongBanLe,
        soluongBanCTV: req.body.soluongBanCTV,
        noiNhap: req.body.noiNhap,
        ngayDang: req.body.ngayDang,
        status: req.body.status,
        url:req.body.url,
    });

  try{
    const saveProduct = await product.save();
    res.send("Successfully");
  }catch(err){
    console.log('555555555', err);
    res.send("Error with post product");
  }
})

// router.get("/image", async (req, res) => {
//   console.log('aaaaa', path.join(__dirname, "./uploads/Cho-Ngao.jpg"));
//   res.sendFile(path.join(__dirname, "../../uploads/Cho-Ngao.jpg"));
// });

router.get('/:productID', async (req, res) => {
    try{
        const product = await Product.findById(req.params.productID);
        console.log('Connect to product')
        res.json(product);
    }catch(err){
       res.json({message: err});
    }
})

router.delete('/:productID', async (req,res) => {
  try{
    const removeProduct = await Product.deleteOne({_id: req.params.productID});
    res.send("Delete successfully")
  } catch(err){
    res.send("Error with Delete Product");
  }
});

router.patch('/:productID', async (req, res) =>{
  try{
    const updateProduct = await Product.updateMany(
      {_id: req.params.productID},
      { $set:{
        name: req.body.name,
        // orderquantity: req.body.orderquantity,
        // code: req.body.code,
        // daysubmitted: req.body.daysubmitted,
        // cost: parseInt(req.body.cost),
        // sell: parseInt(req.body.sell),
        // ctvprice: parseInt(req.body.ctvprice),
        tenSP: req.body.tenSP,
        code: req.body.code,
        giaNhap: req.body.giaNhap,
        giaBanLe: req.body.giaBanLe,
        giaCTV: req.body.giaCTV,
        soluongNhap: req.body.soluongNhap,
        soluongBanLe: req.body.soluongBanLe,
        soluongBanCTV: req.body.soluongBanCTV,
        noiNhap: req.body.noiNhap,
        ngayDang: req.body.ngayDang,
      }}

    );
    res.send('Update successfully')
  }catch(err){
    res.send("Error with update product");
  }
});

  router.patch('/status/:productID', async (req, res) => {
    try{
      const soldOut = await Product.updateOne(
        {_id: req.params.productID},
        {$set:{status: req.body.status}})
      res.send('Sold Out');
    }catch(err){
      res.send("Error with sold out");
    }
  })



module.exports = router;