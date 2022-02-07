const User=require('../models/userModel');
const bcrypt=require('bcrypt');



const getUser=async function(req, res,next) {

  const user=await User.findById(req.user._id);
    res.json(user);
  }


  const getAllUser=async (req, res) => {
    const users = await User.find({});
  
    res.status(200).json(users);
  }

  const adUser=async (req, res,next) => {
    try {
      const user = new User(req.body);
      user.password=await bcrypt.hash(user.password,10);
      const result = await user.save();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }


  module.exports={
      getUser,
      getAllUser,
      adUser
  } 