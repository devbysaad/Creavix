// storage/multer.js
import multer from 'multer';

// Memory storage - files stored in memory as Buffer
const storage = multer.memoryStorage();

// Image filter
const imageFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, and PNG images are allowed'), false);
    }
};

// Text filter
const textFilter = (req, file, cb) => {
    const isTextFile = file.mimetype === 'text/plain' || 
                       file.originalname.toLowerCase().endsWith('.txt');
    
    if (isTextFile) {
        cb(null, true);
    } else {
        cb(new Error('Only .txt files are allowed'), false);
    }
};

// Upload configurations
export const uploadImage = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: imageFilter
});

export const uploadText = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: textFilter
});

export default uploadImage;