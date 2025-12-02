const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message:'No token'});
  const token = authHeader.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = await User.findById(payload.id).select('-password');
    next();
  }catch(e){
    return res.status(401).json({message:'Token invalid'});
  }
};
module.exports = auth;
