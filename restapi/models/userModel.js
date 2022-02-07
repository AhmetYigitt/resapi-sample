const mongoose = require("mongoose");
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const sticker=require('./stickerModel');

const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    stickers:{
      type:[ObjectId],
    },
    
  },
  { collection: "users", timestamps: true }
); //ilk kısım hangi isimle koloksiyon oluşturacağı veritbanaında ikincisi oluşturulma tarihi otomatik ekler




userSchema.statics.login=async function(email,password){
  const user = await User.findOne({email});
  if(!user){
    throw createError(400,'email or  password incoorect');
  }

  const isPasswordCorrect=await bcrypt.compare(password,user.password);

  if (!isPasswordCorrect) {
    throw createError(400,'email or  password incoorect');
  }

  return user;
}

userSchema.methods.generateToken=async function(){

  const user =this;
  const token=await jwt.sign({
    firstName:user.firstName,
    _id:user._id,
    email:user.email
  },'secretkey',{expiresIn:'1h'})


  return token;
}




const User = mongoose.model("User", userSchema);

module.exports = User;
