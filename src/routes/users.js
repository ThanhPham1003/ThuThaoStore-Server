const express = require('express');
const router = express.Router();
const User = require('../Objects/User');
//const index = require('../middleware/index');
const middleware = require('../middleware');
const admin = require('../config/firebase-config');
const multer = require ('multer');
const path = require('path');
const schedule = require('node-schedule');
const date = new Date('2021-12-14T13:23:00.000+7:00');
const rule = new schedule.RecurrenceRule();
rule.date = 1;
rule.tz = 'Etc/GMT+7'

const job = schedule.scheduleJob(rule, async function() {
  console.log("In Schedule")
  try{
    const updateUser = (await User.find()).forEach(async(doc) =>{
      const previousSells = doc.currentsells;
      const updateCells =await User.updateOne({_id: doc._id},
        {$set:{
          lastsells : previousSells,
          currentsells : 0,
        }}
        )
    })
    console.log("Updated sells");
  }catch(err){
    console.log("77777", err);
  }
})


const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './uploadUsers/');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
})

const uploadUsers = multer({storage: storage});
router.use(middleware.decodeToken);
router.get('/', async (req, res) =>{
  res.send('Successfully');
})

router.get('/:uid', async (req,res) => {
  try{
    const user = await User.findById(req.params.uid);
    res.json(user);
  }catch(err){
   res.json({message: err});
}
})

router.post('/',  uploadUsers.single('userImage'),async (req, res) => {
    const user = new User({
      _id: req.body.uid,
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
      url: req.file.path,
      lastsells: 0,
      currentsells: 0
    });
    res.send("Successfully");
  try{
    const saveUser = await user.save();
    res.json(saveUser);
  }catch(err){
   res.json({message: err});
  }
})
router.patch('/updatesells/:uid',async (req, res) => {
  try{
    const updateUser = await User.updateOne(
      {_id: req.params.uid},
      { $set:{
        currentsells: req.body.currentsells
      }}

    );
    res.send("Update Successfully");
  }catch(err){
    res.send(err);
  }
})
router.post('/:uid', uploadUsers.single('userImage'), async (req, res) =>{
  try{
    const updateUser = await User.updateMany(
      {_id: req.params.uid},
      { $set:{
        name: req.body.name,
        age: req.body.age,
        url: req.file.path,
      }}

    );
    res.send("Update Successfully");
  }catch(err){
    res.send(err);
  }
});
router.patch('/photo/:uid', uploadUsers.single('userImage'), async (req, res) => {
  console.log("44444", req);
  try{
    const updateUser = await User.updateOne(
      {_id: req.params.uid},
      { $set:{
        url: req.file.path,

      }}
    )
    res.send("Update Photo Successfully");
  }catch(err){
    console.log("3333", err);
    res.send(err);
  }
})
module.exports = router;