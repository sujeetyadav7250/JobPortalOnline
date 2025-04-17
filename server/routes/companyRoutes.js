import express from 'express';
import { changeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register Company
router.post('/register', upload.single('image'), registerCompany);

// Login Company
router.post('/login', loginCompany);

//Get company data
router.get('/company', protectCompany, getCompanyData);

//Post a job
router.post('/post-job', protectCompany , postJob);

//Get Applicants Data of Company
router.get('/applicants', protectCompany, getCompanyJobApplicants);

//Get Company Job List
router.get('/list-jobs',protectCompany, getCompanyPostedJobs);

//Change Applications Status
router.get('change-status',protectCompany, changeJobApplicationsStatus);

//Change Applications Visiblity
router.get('/change-visiblity', protectCompany, changeVisiblity);


export default router

