import express from 'express';
const router = express.Router();
import {protect,admin} from "../middleware/authMiddleware.js";
import {createOrder,getOrderById,payOrder,getOrders} from "../controllers/orderController.js"


router.post('/',protect,createOrder);
router.get('/:id',protect,getOrderById);
router.put('/:id/pay',protect,admin,payOrder);
router.get('/',protect,admin,getOrders);

export default router ;
 