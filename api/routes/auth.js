const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../utils/sql');
const smsService = require('../utils/smsService');

// Request OTP - Step 1 of login
router.post('/request-otp', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            // Don't reveal if user exists or not for security
            return res.json({ success: true, message: 'If email exists, OTP has been sent' });
        }

        // Generate OTP
        const otp = smsService.generateOTP();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Store OTP in database
        await db.query(
            'INSERT INTO otp_codes (email, otp_code, expires_at) VALUES ($1, $2, $3)',
            [email, otp, expiresAt]
        );

        // Send OTP to predefined admin phones
        const adminPhones = (process.env.ADMIN_PHONE_NUMBERS || '').split(',');

        if (adminPhones.length > 0 && adminPhones[0]) {
            const smsResult = await smsService.sendOTP(adminPhones, otp);
            console.log('SMS Result:', smsResult);
        } else {
            console.log('Development mode - OTP:', otp);
        }

        res.json({
            success: true,
            message: 'OTP sent to registered phone numbers',
            // FOR DEVELOPMENT ONLY - remove in production
            ...(process.env.NODE_ENV === 'development' && { otp })
        });

    } catch (error) {
        console.error('OTP Request Error:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

// Verify OTP - Step 2 of login
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Get OTP from database
        const otpResult = await db.query(
            'SELECT * FROM otp_codes WHERE email = $1 AND otp_code = $2 AND used = false ORDER BY created_at DESC LIMIT 1',
            [email, otp]
        );

        const otpRecord = otpResult.rows[0];

        if (!otpRecord) {
            return res.status(401).json({ error: 'Invalid OTP code' });
        }

        // Check if OTP expired
        if (new Date() > new Date(otpRecord.expires_at)) {
            return res.status(401).json({ error: 'OTP expired. Please request a new one.' });
        }

        // Mark OTP as used
        await db.query(
            'UPDATE otp_codes SET used = true WHERE id = $1',
            [otpRecord.id]
        );

        // Get user
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || 'your-default-secret-key-change-in-production',
            { expiresIn: process.env.JWT_EXPIRE || '1h' }
        );

        // Return user without password
        const { password, ...userWithoutPass } = user;

        res.json({
            success: true,
            user: userWithoutPass,
            token
        });

    } catch (error) {
        console.error('OTP Verification Error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
});

// Legacy login endpoint (kept for backward compatibility, can be removed later)
router.post('/login', async (req, res) => {
    res.status(400).json({
        error: 'Please use OTP login',
        message: 'This endpoint is deprecated. Use /auth/request-otp instead.'
    });
});

module.exports = router;
