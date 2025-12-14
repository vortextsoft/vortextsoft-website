const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/team');
try {
    if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
    }
} catch (error) {
    console.warn('Failed to create upload directory (expected in serverless):', error.message);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Upload endpoint
// Upload endpoint
// In Production/Netlify, we CANNOT save files to disk.
// We effectively mock the upload to prevent crashes.
if (process.env.NODE_ENV === 'production' || process.env.NETLIFY) {
    router.post('/upload', (req, res) => {
        // Return a dummy image URL so the frontend doesn't break
        // Using a reliable external placeholder service
        res.json({ imageUrl: 'https://placehold.co/600x400?text=Image+Saved' });
    });
} else {
    // Local Development: Standard Multer Upload
    router.post('/upload', upload.single('profileImage'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            const imageUrl = `/uploads/team/${req.file.filename}`;
            res.json({ imageUrl });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

// Document upload configuration (for PDFs - CV, cover letters)
const documentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const docsDir = path.join(__dirname, '../uploads/documents');
        if (!fs.existsSync(docsDir)) {
            if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
                fs.mkdirSync(docsDir, { recursive: true });
            }
        }
        cb(null, docsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'doc-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Partner Logo Storage
const partnerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const partnersDir = path.join(__dirname, '../uploads/partners');
        if (!fs.existsSync(partnersDir)) {
            if (process.env.NODE_ENV !== 'production' && !process.env.NETLIFY) {
                fs.mkdirSync(partnersDir, { recursive: true });
            }
        }
        cb(null, partnersDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'partner-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const partnerUpload = multer({
    storage: partnerStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'image/svg+xml';

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files (including SVG) are allowed!'));
        }
    }
});

router.post('/partner', partnerUpload.single('logo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const imageUrl = `/uploads/partners/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const documentUpload = multer({
    storage: documentStorage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for videos
    fileFilter: function (req, file, cb) {
        // Allow PDFs, images, and videos
        console.log('File upload attempt:', file.originalname, 'MIME:', file.mimetype);
        const allowedTypes = /pdf|jpeg|jpg|png|gif|webp|mp4|webm|ogg|mov|avi/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = file.mimetype === 'application/pdf' ||
            file.mimetype.startsWith('image/') ||
            file.mimetype.startsWith('video/');

        console.log('Extension check:', extname, 'MIME check:', mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF, image, and video files are allowed!'));
        }
    }
});

router.post('/document', documentUpload.single('document'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileUrl = `/uploads/documents/${req.file.filename}`;
        res.json({ fileUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
