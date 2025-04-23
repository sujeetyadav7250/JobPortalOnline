import express from 'express';
import { 
    applyForJob, 
    getUserData, 
    getUserJobApplications, 
    updateUserResume,
    updateUserProfile,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience
} from '../controllers/userController.js';
import upload from '../config/multer.js';
import { protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protectUser);

// Get current user data
router.get('/user', getUserData);

// Get applied jobs data
router.get('/applications', getUserJobApplications);

// Update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume);

// Apply for job
router.post('/apply', applyForJob);

// Professional profile routes
router.post('/profile', updateUserProfile);

// Education routes
router.post('/education', addEducation);
router.put('/education/:educationId', updateEducation);
router.delete('/education/:educationId', deleteEducation);

// Experience routes
router.post('/experience', addExperience);
router.put('/experience/:experienceId', updateExperience);
router.delete('/experience/:experienceId', deleteExperience);

export default router;



