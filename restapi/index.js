const express = require("express");
require('./db/dbConnection')
const errorMiddleware=require('./middleware/errorMiddleware');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const stickerRouter=require('./routes/stickerRouter')



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const userRouter=require('./routes/userRouter');

app.use('/sticker',stickerRouter);
app.use('/user',userRouter);



app.get('/',(req,res)=>{
    res.status(200).json({
        message:'home page'
    })
})



app.use(errorMiddleware);//catch içindeki errorlaarı direk buraya döndürür

app.listen(3000,'10.0.79.22',()=>{
    console.log('running on port 3000');
});
