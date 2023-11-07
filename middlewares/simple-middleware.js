const midOne = async (req,res,next)=>{
    console.log("midle ware run")
    next();
}
module.exports={
    midOne
}