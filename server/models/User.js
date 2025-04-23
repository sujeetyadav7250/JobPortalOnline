import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String }
}, { _id: true });

const experienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String }
}, { _id: true });

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resume: { type: String },
    image: { type: String, required: true, default: 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg' },
    
    // Professional profile fields
    title: { type: String }, // e.g., "Full Stack Developer", "Data Scientist"
    bio: { type: String },
    skills: [{ type: String }],
    languages: [{ type: String }],
    
    // Contact information
    phone: { type: String },
    location: { type: String },
    website: { type: String },
    
    // Social profiles
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    
    // Education and experience
    education: [educationSchema],
    experience: [experienceSchema],
    
    // Job preferences
    jobPreferences: {
        desiredSalary: { type: Number },
        desiredLocation: { type: String },
        jobType: { type: String }, // "Full-time", "Part-time", "Contract", etc.
        remoteWork: { type: Boolean, default: false },
        relocationWilling: { type: Boolean, default: false }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;    