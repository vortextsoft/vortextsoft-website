const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user in MongoDB
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            // In a real app, sign a JWT here. 
            // Note: Password usually hashed (bcrypt), but keeping as-is for migration parity
            const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');

            // Return user without password
            const userObj = user.toObject();
            delete userObj.password;

            res.json({ user: userObj, token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
