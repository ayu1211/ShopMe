import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {type:String,required:true,trim:true},
    description: String,
    price: {type:Number,required:true,default:0},
    countInStock: {type:Number,default:0},
    images:[String]
},{
    timestamps:true
});

export default mongoose.model("Product",productSchema);
