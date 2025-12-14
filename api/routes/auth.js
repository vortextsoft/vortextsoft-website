const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/db');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await readDb();
        console.log('Login Attempt for:', email);
        console.log('REQ BODY KEYS:', Object.keys(req.body));
        console.log('Users in DB:', db.users ? db.users.length : 'No Users Array');

        const user = db.users.find(u => u.email === email && u.password === password);
        console.log('User Found:', !!user);

        if (user) {
            // In a real app, sign a JWT here
            const token = Buffer.from(`${user.email}:${Date.now()}`).toString('base64');
            const { password, ...userWithoutPass } = user;
            res.json({ user: userWithoutPass, token });
        } else {
            // DEBUGGING: Return why it failed
            res.status(401).json({
                error: 'Invalid credentials',
                debug: {
                    receivedEmail: email,
                    receivedPasswordLength: password ? password.length : 0,
                    dbUsersCount: db.users ? db.users.length : 'undefined',
                    firstUserEmail: db.users && db.users.length > 0 ? db.users[0].email : 'N/A',
                    firstUserPassLength: db.users && db.users.length > 0 ? db.users[0].password.length : 'N/A'
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
});

module.exports = router;
