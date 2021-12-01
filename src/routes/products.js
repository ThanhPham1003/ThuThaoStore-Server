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
      const products = await Product.find();
      res.json(products);
  }
  catch(err){
      res.json({ message: err});
  }
})

router.post('/allproducts', upload.single('productImage'),async (req, res) => {
  console.log("44444", req.file.path)  
  const product = new Product({
        uid : req.body.uid,
        name: req.body.name,
        age: req.body.age,
        color: req.body.color,
        price: req.body.price,
        // url: req.body.url,
        url:req.file.path
    });
    res.send("succesfull");
  try{
    const saveProduct = await product.save();
    res.json(saveProduct);
  }catch(err){
    res.json({message: err});
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
    console.log("Deleted.")
    res.json(removeProduct)
  } catch(err){
    res.json({message: err});
  }
});

router.patch('/:productID', async (req, res) =>{
  try{
    const updateProduct = await Product.updateMany(
      {_id: req.params.productID},
      { $set:{
        name: req.body.headers.name,
        age: req.body.headers.age,
        color: req.body.headers.color,
        price: parseInt(req.body.headers.price),
      }}

    );
    res.json("33333", updateProduct)
  }catch(err){
    res.json({message: err});
  }
});



module.exports = router;