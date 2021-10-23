const admin = require('../config/firebase-config');
class Middleware{
  async decodeToken(req, res){
    const token = req.body.headers.authorization.split(' ')[1];
    try{
      const decodeValue = await admin.auth().verifyIdToken(token);
      console.log(decodeValue);
      if(decodeValue){
        return decodeValue;
      }
      return res.json({message: "Un authorize"});
    }catch(e){
      return res.json({messag:'internal Error'});
    }
  }
}

module.exports = new Middleware();