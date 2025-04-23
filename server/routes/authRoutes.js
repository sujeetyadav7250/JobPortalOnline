import express from 'express';
import { loginUser, registerUser, getUserProfile, updateProfile } from '../controllers/authController.js';
import { protectUser } from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

// Public routes
router.post('/register', upload.single('image'), registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/profile', protectUser, getUserProfile);
router.post('/update-profile', protectUser, updateProfile);

export default router; 