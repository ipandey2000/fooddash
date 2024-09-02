import { UUIDV4 } from "sequelize";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { id, name, email, password } = req.body;
  if (!id || !name || !email || !password)
    return next(new ErrorHandler("Please enter all the fields", 400));
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = UUIDV4();
  const newUser = { id: userId, name, email, password: hashedPassword };
  await User.save(newUser);
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export const updateUserProfile = catchAsyncError( async (req, res) => {
  const { userId, profileUpdates } = req.body;

  if (!userId || !profileUpdates || typeof profileUpdates !== "object") {
    return next(new ErrorHandler("Please enter all the fields", 400))
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const updatedUser = { ...user, ...profileUpdates };
    
    if (profileUpdates.password) {
        updatedUser.password = await bcrypt.hash(profileUpdates.password, 10);
    }
  await User.update(userId, user);
  res.status(201).json({
    success: true,
    message: "User Profile updated",
  });
});

export const getUserOrderHistory = catchAsyncError(async(req, res, next)=>{
    const {userId} = req.query;
    if (!userId) {
        return next(new ErrorHandler("User Id is missing", 400))
    }
    const user= await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    const orderHistory = await User.getOrderHistory(userId);
    res.status(201).json({
        success: true,
        orderHistory
    })
})
