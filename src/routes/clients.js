const express = require('express');
const router = express.Router();
const Client = require('../Objects/Client');
const admin = require('../config/firebase-config');
const multer = require ('multer');
const path = require('path');
const middleware = require('../middleware');

router.use(middleware.decodeToken);
router.get('', async (req,res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    }catch(err){
       res.json({message: err});
    }
})
router.get('/:phone', async (req,res) => {
    try{
        const client = await Client.findOne({"phone" : req.params.phone});
        console.log('Connect to client')
        res.json(client);
    }catch(err){
       res.json({message: err});
    }
})
router.post('', async (req,res) => {
    const client = new Client({
        uid: req.body.uid,
        name: req.body.name,
        address: req.body.address,
        link: req.body.link,
        phone: req.body.phone,
    });
    
    try{
        const saveClient = await client.save();
        res.send("succesfully");
    }catch(err) {
        res.send({message: err});
    }
});
router.delete('/:clientID', async (req,res) => {
    try{
      const removeClient = await Client.deleteOne({_id: req.params.clientID});
      res.send("Deleted.")
    } catch(err){
      res.send({message: err});
    }
});
router.patch('/:clientID', async (req, res) =>{
    try{
      const updateClient = await Client.updateMany(
        {_id: req.params.clientID},
        { $set:{
          name: req.body.name,
          address: req.body.address,
          link: req.body.link,
          phone: req.body.phone,
        }}
  
      );
      res.send("Updated")
    }catch(err){
      res.send({message: err});
    }
});
module.exports = router;