// routes/orderRoutes.js
import express from 'express';
import { placeOrder, updateOrderStatus, getOrderStatus, createOrder } from '../controllers/orderController.js';
import { validateOrder } from '../middlewares/validateOrder.js';

const router = express.Router();

router.post('/create', createOrder);

router.post('/place', validateOrder, placeOrder);

router.put('/update-status', updateOrderStatus);

router.get('/status', getOrderStatus);

export default router;
