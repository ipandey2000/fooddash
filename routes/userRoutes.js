import express from 'express';
import { registerUser, updateUserProfile, getUserOrderHistory } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.put('/update-profile', updateUserProfile);

router.get('/order-history', getUserOrderHistory);

export default router;
