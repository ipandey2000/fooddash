import express from 'express';
import rateLimiter from './middlewares/rateLimiter.js';
import orderRoutes from './routes/orderRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/users', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 8000;
app.listen(()=>{
    console.log(`Server is running on port: ${PORT}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message,
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

export default app;
