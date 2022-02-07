const router = require("express").Router();
const Sticker = require("../models/stickerModel");






router.post('/add',async(req,res)=>{

    const sticker=new Sticker(req.body);

    const result=await sticker.save();
    res.json(result);

})

router.get('/getstickerofuser/:id',async(req,res)=>{
    
    const stickers=await Sticker.find({userId:req.params.id});
    res.json(stickers);
})

module.exports=router;