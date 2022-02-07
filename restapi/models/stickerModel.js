const mongoose = require('mongoose');


const Schema=mongoose.Schema;

const ObjectId=Schema.ObjectId;


stickerSchema= new Schema(
    {
    name:{
        type:String
    },
    description:{
      type:String  
    },

    price:{
        type:Number
    },
    userId:{
        type:ObjectId
    }
},{collection:'stickers',timestamps:true})


const Sticker = mongoose.model("Sticker", stickerSchema);

module.exports=Sticker;
