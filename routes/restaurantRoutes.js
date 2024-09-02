import express from 'express';
import { getMenu, updateMenu } from '../controllers/restaurantController.js';

const router = express.Router();

router.get('/menu', getMenu);

router.put('/menu', updateMenu);

export default router;
