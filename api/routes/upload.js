const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Configure multer for MEMORY storage (Serverless friendly)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for videos
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf|mp4|webm|ogg|mov/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        // Simple mime check
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images, PDFs, and videos are allowed!'));
        }
    }
});

// Helper to convert buffer to base64 data URL
const toBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
};

// Generic Upload Route
router.post('/upload', upload.single('profileImage'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const imageUrl = toBase64(req.file);
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/partner', upload.single('logo'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const imageUrl = toBase64(req.file);
        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/document', upload.single('document'), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
        const fileUrl = toBase64(req.file);
        res.json({ fileUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware for multer errors
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        // Multer-specific errors
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size too large. Maximum size is 100MB.' });
        }
        return res.status(400).json({ error: error.message });
    } else if (error) {
        // Other errors
        return res.status(500).json({ error: error.message || 'Upload failed' });
    }
    next();
});

module.exports = router;
