const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const authMiddleware=require('../middleware/authMiddleware');
const userController=require('../controller/userController');

router.get("/getall",userController.getAllUser );

router.post("/add", userController.adUser);

router.get("/me",authMiddleware, userController.getUser);



router.get('/test',async(req,res)=>{
  const user=await User.find({_id:"61fa868c52654301cc46bb68"})
  res.json(user);
})

router.get('/getbyid/:id',async (req,res)=>{
  const user =await User.findById(req.params.id);

  res.json(user);
})

router.delete("/delete/:id", async (req, res,next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/update/:id", async (req, res,next) => {

  if (req.body.hasOwnProperty('password')) {
    req.body.password=await bcrypt.hash(req.body.password,10);
  }


  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //new güncel değeri döndürür
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login",async(req,res,next)=>{
  try {
    const user=await User.login(req.body.email,req.body.password);

    const token=await user.generateToken();

    res.json({
      user,
      token
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router;
