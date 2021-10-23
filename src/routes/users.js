const express = require('express');
const router = express.Router();
const User = require('../Objects/User');
//const index = require('../middleware/index');
const middleware = require('../middleware');
const admin = require('../config/firebase-config');
router.get('/', async (req, res) =>{
  // try{
  //   console.log("We are on Users");
  //   const users = await User.find();
  //   res.json(users);
  // }catch(err){
  //   res.json({message: err});
  // }
  // const decodeValue = await middleware.decodeToken(req,res);
  // console.log("33333", decodeValue);
  res.send('We are in user');
})

router.post('/', async (req, res) => {

    //console.log(req);
    const decodeUser = await middleware.decodeToken(req,res);
    console.log("11111", decodeUser)
    const user = new User({
      email: decodeUser.email,
      uid: decodeUser.uid,
    });
    console.log("2222 ",user);

  //   const user = new User({
  //     email: req.body.email,
  //     uid: req.body.uid,
  //   });
  try{
    const saveUser = await user.save();
    res.json(saveUser);
  }catch(err){
    res.json({message: err});
  }
})

module.exports = router;