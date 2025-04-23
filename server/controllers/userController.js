import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary" 

// Get user data
export const getUserData = async (req, res) => {
    try {
        const user = req.user;
        console.log("Getting user data for userId:", user._id);

        res.json({ success: true, user })
    } catch (error) {
        console.log("Error in getUserData:", error.message);
        res.json({ success: false, message: error.message })
    }
}

// Apply for a job
export const applyForJob = async (req, res) => {
    const { jobId } = req.body
    const userId = req.user._id

    try {
        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: "Already Applied" })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: "Job not found" })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: "Applied Successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.user._id

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: "No job Applications Found for this user." })
        }

        return res.json({ success: true, applications })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.user._id
        const resumeFile = req.file

        if (!resumeFile) {
            return res.json({ 
                success: false, 
                message: "No file uploaded or invalid file format. Please upload a PDF or DOCX file." 
            });
        }

        const userData = await User.findById(userId)

        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }

        try {
            // Set resource_type to auto to allow Cloudinary to detect file type
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
                resource_type: 'auto',
                folder: 'resumes',
                format: 'pdf' // Force pdf output format for consistency
            });
            
            userData.resume = resumeUpload.secure_url;
            await userData.save();
            
            return res.json({ 
                success: true, 
                message: "Resume Updated Successfully" 
            });
        } catch (cloudinaryError) {
            console.error("Cloudinary upload error:", cloudinaryError);
            return res.json({ 
                success: false, 
                message: "Failed to upload resume. Please try a different file or format." 
            });
        }
    } catch (error) {
        console.error("Resume update error:", error);
        res.json({ 
            success: false, 
            message: error.message || "An error occurred while updating your resume" 
        });
    }
}

// Update user professional profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { 
            title, bio, skills, languages, phone, location, website,
            linkedin, github, twitter, jobPreferences
        } = req.body;

        const userData = await User.findById(userId);

        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Update fields if provided
        if (title) userData.title = title;
        if (bio) userData.bio = bio;
        if (skills) userData.skills = skills;
        if (languages) userData.languages = languages;
        if (phone) userData.phone = phone;
        if (location) userData.location = location;
        if (website) userData.website = website;
        if (linkedin) userData.linkedin = linkedin;
        if (github) userData.github = github;
        if (twitter) userData.twitter = twitter;
        
        // Update job preferences if provided
        if (jobPreferences) {
            userData.jobPreferences = {
                ...userData.jobPreferences || {},
                ...jobPreferences
            };
        }

        await userData.save();

        return res.json({ 
            success: true, 
            message: "Professional profile updated successfully",
            user: userData
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.json({ 
            success: false, 
            message: error.message || "An error occurred while updating your profile" 
        });
    }
}

// Add education entry
export const addEducation = async (req, res) => {
    try {
        const userId = req.user._id;
        const educationData = req.body;
        
        // Validate required fields
        if (!educationData.institution || !educationData.degree || !educationData.fieldOfStudy || !educationData.startDate) {
            return res.json({
                success: false,
                message: "Please provide all required education fields"
            });
        }
        
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        // Add new education entry
        userData.education.push(educationData);
        await userData.save();
        
        return res.json({
            success: true,
            message: "Education added successfully",
            education: userData.education
        });
    } catch (error) {
        console.error("Add education error:", error);
        res.json({
            success: false,
            message: error.message || "An error occurred while adding education"
        });
    }
}

// Update education entry
export const updateEducation = async (req, res) => {
    try {
        const userId = req.user._id;
        const { educationId } = req.params;
        const educationData = req.body;
        
        // Find user
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        // Find education entry
        const educationEntry = userData.education.id(educationId);
        
        if (!educationEntry) {
            return res.json({
                success: false,
                message: "Education entry not found"
            });
        }
        
        // Update education fields
        Object.keys(educationData).forEach(key => {
            educationEntry[key] = educationData[key];
        });
        
        await userData.save();
        
        return res.json({
            success: true,
            message: "Education updated successfully",
            education: userData.education
        });
    } catch (error) {
        console.error("Update education error:", error);
        res.json({
            success: false,
            message: error.message || "An error occurred while updating education"
        });
    }
}

// Delete education entry
export const deleteEducation = async (req, res) => {
    try {
        const userId = req.user._id;
        const { educationId } = req.params;
        
        // Find user and remove education entry
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        userData.education.id(educationId).remove();
        await userData.save();
        
        return res.json({
            success: true,
            message: "Education entry removed successfully",
            education: userData.education
        });
    } catch (error) {
        console.error("Delete education error:", error);
        res.json({
            success: false,
            message: error.message || "An error occurred while deleting education entry"
        });
    }
}

// Add experience entry
export const addExperience = async (req, res) => {
    try {
        const userId = req.user._id;
        const experienceData = req.body;
        
        // Validate required fields
        if (!experienceData.company || !experienceData.position || !experienceData.startDate) {
            return res.json({
                success: false,
                message: "Please provide all required experience fields"
            });
        }
        
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        // Add new experience entry
        userData.experience.push(experienceData);
        await userData.save();
        
        return res.json({
            success: true,
            message: "Experience added successfully",
            experience: userData.experience
        });
    } catch (error) {
        console.error("Add experience error:", error);
        res.json({
            success: false,
            message: error.message || "An error occurred while adding experience"
        });
    }
}

// Update experience entry
export const updateExperience = async (req, res) => {
    try {
        const userId = req.user._id;
        const { experienceId } = req.params;
        const experienceData = req.body;
        
        // Find user
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        // Find experience entry
        const experienceEntry = userData.experience.id(experienceId);
        
        if (!experienceEntry) {
            return res.json({
                success: false,
                message: "Experience entry not found"
            });
        }
        
        // Update experience fields
        Object.keys(experienceData).forEach(key => {
            experienceEntry[key] = experienceData[key];
        });
        
        await userData.save();
        
        return res.json({
            success: true,
            message: "Experience updated successfully",
            experience: userData.experience
        });
    } catch (error) {
        console.error("Update experience error:", error);
        res.json({
            success: false,
            message: error.message || "An error occurred while updating experience"
        });
    }
}

// Delete experience entry
export const deleteExperience = async (req, res) => {
    try {
        const userId = req.user._id;
        const { experienceId } = req.params;
        
        // Find user and remove experience entry
        const userData = await User.findById(userId);
        
        if (!userData) {
            return res.json({ 
                success: false, 
                message: "User not found" 
            });
        }
        
        userData.experience.id(experienceId).remove();
        await userData.save();
        
        return res.json({
            success: true,
            message: "Experience entry removed successfully",
            experience: userData.experience
        });
    } catch (error) {
        console.error("Delete experience error:", error);
        res.json({
            success: false,
            message: error.message || "An error occurred while deleting experience entry"
        });
    }
}