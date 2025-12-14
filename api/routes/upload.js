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
// Feature Flag: Depend on Env Vars now that we set them in netlify.toml
const isProduction = process.env.NODE_ENV === 'production' || process.env.NETLIFY === 'true';

if (isProduction) {
    router.post('/upload', (req, res) => {
        res.json({ imageUrl: '/uploads/team/placeholder.jpg' });
    });
} else {
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

// ... Document and Partner Logic mirrors this ...

if (isProduction) {
    router.post('/partner', (req, res) => {
        res.json({ imageUrl: '/uploads/partners/placeholder.jpg' });
    });
} else {
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
}

if (isProduction) {
    router.post('/document', (req, res) => {
        res.json({ fileUrl: '/uploads/documents/placeholder.pdf' });
    });
} else {
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
}

module.exports = router;
