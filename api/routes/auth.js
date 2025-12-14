const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/db');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await readDb();
        const user = db.users.find(u => u.email === email && u.password === password);

        if (user) {
            // In a real app, sign a JWT here
            const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
            const { password, ...userWithoutPass } = user;
            res.json({ user: userWithoutPass, token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
