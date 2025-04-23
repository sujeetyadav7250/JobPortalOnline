import multer from "multer";
import path from "path";

const storage = multer.diskStorage({})

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  // Allowed file extensions
  const allowedFileTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.webp', ];
  
  // Get the file extension
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

export default upload;