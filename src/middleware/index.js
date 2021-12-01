const admin = require('../config/firebase-config');
class Middleware{
  async decodeToken(req, res, next){
    
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decodeValue = await admin.auth().verifyIdToken(token);
      if(decodeValue){
        req.user=decodeValue;
        return next();
      }
      return res.json({message: "Un authorize"});
    }catch(e){
      return res.json({messag:'internal Error'});
    }

  }

}


module.exports = new Middleware();