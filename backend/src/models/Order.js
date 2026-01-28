import mongoose, { Schema } from "mongoose";
const orderItemSchema = new mongoose.Schema({
    product: {type:mongoose.Schema.Types.ObjectId ,ref:"Product",required:true},
    name:String,
    qty: {type:Number,required: true},
    price:{type:Number,required:true},
})
const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    orderItems:[orderItemSchema],
    shippingAddress:  {
        address:String, city: String , postalCode: String, country:String
    },

    paymentMethod : String,
    paymentResult: Object,
    itemsPrice: Number,
    taxPrice:Number,
    shippingPrice:Number,
    totalPrice:Number,
    isPaid:{type:Boolean,defauult:false},
    paidAt: Date,
    isDelivered: {type:Boolean,default:false},
    deliverAt: Date

}, {timestamps: true})

export default mongoose.model("Order",orderSchema)