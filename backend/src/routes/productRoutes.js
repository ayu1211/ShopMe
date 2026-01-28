import express from "express";
const router = express.Router();
import multer from "multer";
import {protect , admin } from "../middleware/authMiddleware.js";

import {getProducts, getProductById,createProduct,updateProduct,deleteProduct}from "../controllers/productController.js"

const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'src/uploads/'),
    filename:(req,file,cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g,'-'))

});
const upload = multer({storage});
router.get('/',getProducts);
router.get('/:id',getProductById);

router.post('/',protect,admin,upload.array('images',6),createProduct);
router.put('/:id',protect,admin,upload.array('images',0),updateProduct);
router.delete('/:id',protect,admin,deleteProduct);

export default router ;