const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id)=> jwt.sign({id}, process.env.JWT_SECRET || 'secretkey', {expiresIn:'7d'});

exports.register = async (req,res)=>{
  try{
    const {name,email,password,isArtisan} = req.body;
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({message:'Email already in use'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({name,email,password:hash,isArtisan});
    res.json({user:{id:user._id,name:user.name,email:user.email,isArtisan:user.isArtisan}, token: generateToken(user._id)});
  }catch(e){res.status(500).json({message:e.message});}
};

exports.login = async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({message:'Invalid credentials'});
    res.json({user:{id:user._id,name:user.name,email:user.email,isArtisan:user.isArtisan}, token: generateToken(user._id)});
  }catch(e){res.status(500).json({message:e.message});}
};

exports.profile = async (req,res)=>{
  res.json(req.user);
};
