import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import User from '../models/User.js';

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token

    if(!token){
        return res.json({ success:false, message:'Not authorized, Login Again'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.company = await Company.findById(decoded.id).select('-password')

        next()

    } catch(error){
        res.json({success:false, message: error.message})
    }
}

export const protectUser = async (req, res, next) => {
    let token;
    
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.json({ success: false, message: 'Not authorized, please login again' });
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log('Auth error:', error.message);
        res.json({ success: false, message: 'Session expired, please login again' });
    }
}

