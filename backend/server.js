import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT
app.use(express.json());


app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/orders",  orderRoutes)
app.use("/api/users", userRoutes)

app.use(cors({
    origin: ["https://boltit.netlify.app", "http://localhost:5173"], // Allow both Netlify and Localhost
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
    
})