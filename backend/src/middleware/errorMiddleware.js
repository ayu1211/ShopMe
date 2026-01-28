export default function(err,req,res,next)  {
    console.error(err.stack);
    res.status(err.status || 500).json({messsage:err.message || "Server error"})
}