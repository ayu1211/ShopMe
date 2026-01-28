import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req,res,next) => {
    try{
        const {orderItems,shippingAddress,paymentMethod} = req.body;
        if(!orderItems || orderItems.length === 0 )return res.status(400).json({message:"No Items"});
        let itemsPrice = 0;
        for (const it of orderItems)
        {
            const p = await Product.findById(it.product);
            if(!p) return res.status(400).json({message: `Insufficient stock for ${p.name}`})
                itemsPrice += p.price * it.qty;
        }
        const taxPrice = +(itemsPrice * 0.1).toFixed(2);
        const shippingPrice =  itemsPrice > 100 ? 0 : 10;
        const totalPrice = +(itemsPrice + taxPrice + shippingPrice).toFixed(2);
        const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice , taxPrice, shippingPrice, totalPrice 
        });
        for(const it of  orderItems) {
               const p = await Product.findById(it.product);
               p.countInStock = Math.max(0,p.countInStock - it.qty);
               await p.save();

        }
        res.status(201).json(order);

    } catch(err) { 
        next(err); }
}

export const getOrderById = async (req,res,next) => {
    try{
     const order = await Order.findById(req.params.id).populate('user',"name email ");
     if(!order) return res.status(400).json({message: "Not found"});
     if(order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) return res.status(403).json({messsage: "Forbidden"});
     res.json(order);
    }
    catch(err){
        next(err)
    }
};
export const payOrder = async (req,res,next) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order) return res.status(404).json({message:"NOT FOUND"});
        order.isPaid= true;
        order.paidAt = new Date();
        order.paymentResult = req.body.paymentResult || {id:'stub',status: "COMPLETED"}
        await order.save();
        res.json(order);

    } catch(err) {
        next(err);
    }
}
export const getOrders = async (req,res,next) => {
    try{
        const orders= await Order.find({}).populate("user","name email").sort({createdAt: -1});
        res.json(orders);
   
    }
    catch(err) { next(err)}

    
}