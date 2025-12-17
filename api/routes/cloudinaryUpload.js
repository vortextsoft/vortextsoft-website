const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, resourceType, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType, // 'image' or 'video'
                folder: folder,
                chunk_size: 6000000 // 6MB chunks for large files
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(buffer);
    });
};

// Upload video endpoint
router.post('/video', upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file uploaded' });
        }

        // Check if Cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            return res.status(500).json({
                error: 'Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.'
            });
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, 'video', 'vortextsoft/videos');

        res.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            duration: result.duration,
            size: result.bytes
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({
            error: 'Failed to upload video',
            details: error.message
        });
    }
});

// Upload image endpoint
router.post('/image', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        // Check if Cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            return res.status(500).json({
                error: 'Cloudinary not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.'
            });
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, 'image', 'vortextsoft/images');

        res.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
            size: result.bytes
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({
            error: 'Failed to upload image',
            details: error.message
        });
    }
});

// Error handling middleware
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size too large. Maximum size is 100MB.' });
        }
        return res.status(400).json({ error: error.message });
    } else if (error) {
        return res.status(500).json({ error: error.message || 'Upload failed' });
    }
    next();
});

module.exports = router;
