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
        name: req.body.name,
        address: req.body.address,
        link: req.body.link,
        phone: req.body.phone,
        deposit: req.body.deposit,
    });
    res.send("succesfully");
    try{
        const saveClient = await client.save();
        res.json(saveClient);
    }catch(err) {
        res.json({message: err});
    }
});
module.exports = router;