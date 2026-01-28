import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
connectDB();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true , 
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    
}));


app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use('/api/auth',authRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/products',productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))