import express from 'express';
import { getUserData, getUserJobApplications } from '../controllers/userController';
import { get } from 'mongoose';
import upload from '../config/multer';


const router = express.Router();

// Get user Data
router.get('/user',getUserData)

//Apply for a job
router.post('/apply', applyForJob)

//Get applied jobs data
router.get('/applications', getUserJobApplications)

//update usre profile (resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;



//7:24