// routes/userRoutes.js
import express from 'express';
import {register } from '../controllers/authController.js';



const router = express.Router();
router.get('/register-user', register);
router.post('/register-user', register);


export default router;
