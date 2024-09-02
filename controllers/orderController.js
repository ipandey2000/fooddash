import { Order } from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { logOrderDetails } from '../utils/logger.js';
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

export const createOrder = catchAsyncError(async (req, res) => {

        const order = { id: 123, userId: req.user.id, status: 'Pending', ...req.body };

        logOrderDetails(order);

        res.status(201).json(order);
});


export const placeOrder = catchAsyncError(async(req, res, next)=>{
    const { userId, restaurantId, items } = req.body;
    if (!userId || !restaurantId || !items) {
        return next (new ErrorHandler('Missing required fields', 400 ));
    }
    const newOrder = {userId, restaurantId, items, status: 'received'}
    const orderId = await Order.save(newOrder);
    res.status(201).json({
        success: true,
        message:"Order Placed Successfully",
        orderId
    })
})


export const updateOrderStatus = catchAsyncError(async(req, res, next)=>{
    const { orderId, status } = req.body;
    const order = await Order.updateStatus(orderId, status); 
    if (!order) {
        return next(new ErrorHandler('Order not found', 404 ));
    }
    res.status(201).json({
        success:true,
        message:"Order status updated",
        order
    })
})

export const getOrderStatus = catchAsyncError(async(req, res, next)=>{
    const { orderId } = req.query;
    const order = await Order.findById(orderId);
    if (!order) {
        return next(new ErrorHandler('Order not found', 404));
    }
    res.status(200).json({
        success: true,
        status: order.status
    })
})