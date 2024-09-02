
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Restaurant } from "../models/restaurantModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getMenu = catchAsyncError(async(req, res, next)=>{
    const {restaurantId} = req.query;
    if(!restaurantId)
        return next(new ErrorHandler("Restaurant ID is missing", 400));
    const restaurant = await Restaurant.findById(restaurantId);
    if(!restaurant)
        return next(new ErrorHandler("Restaurant not found", 404));
    const menu = JSON.parse(restaurant.menu);
    const categorizeMenu = {
        appetizers: menu.filter(item => item.category === 'appetizer'),
        mainCourses: menu.filter(item => item.category === 'main course'),
        desserts: menu.filter(item => item.category === "dessert")
    };
    res.status(201).json({
        success: true,
        data: categorizeMenu
    })
});

export const updateMenu = catchAsyncError(async(req, res, next)=>{
    const { restaurantId, newMenu } = req.body; 
    if (!restaurantId || !newMenu || !Array.isArray(newMenu)) {
        return next (new ErrorHandler('Invalid menu data or missing restaurant ID', 400 ));
    }
    const updatedRestaurant = await Restaurant.updateMenu(restaurantId, newMenu);
    if (!updatedRestaurant) {
        return next (new ErrorHandler('Restaurant Not Found', 404 ));
    }
    res.status(201).json({
        success: true,
        message: 'Menu updated successfully!',
        menu: JSON.parse(updatedRestaurant.menu) 
    })
})