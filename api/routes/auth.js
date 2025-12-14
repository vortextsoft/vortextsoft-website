const express = require('express');
const router = express.Router();
const db = require('../utils/sql'); // Switched to Postgres

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Query the database directly
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        // Check password (In real world, use bcrypt.compare here)
        if (user && user.password === password) {
            // In a real app, sign a JWT here
            const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
            const { password, ...userWithoutPass } = user;
            res.json({ user: userWithoutPass, token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login SQL Error:', error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

module.exports = router;
