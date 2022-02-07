

const errorCatch=function(err,req,res,next){
    res.status(200).json({
        message:err.message
    })
}
module.exports=errorCatch;