const express = require('express');
const router = express.Router();
const db = require('../utils/sql');

// GET all messages (Admin)
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// POST (Send Message)
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ error: 'Email and message are required' });
        }

        // 1. Send Email (Keep existing logic)
        try {
            const { sendEmail } = require('../utils/emailService');
            await sendEmail({
                to: process.env.EMAIL_USER,
                subject: `New Contact Form: ${subject || 'No Subject'}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                html: `
                    <h3>New Contact Message</h3>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr/>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                `
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue to save to DB anyway
        }

        // 2. Save to Postgres DB
        const query = `
            INSERT INTO messages (name, email, subject, message)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [name, email, subject, message];
        const result = await db.query(query, values);

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// DELETE message
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM messages WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Mark as Read/Replied (Partial Update)
router.patch('/:id/replied', async (req, res) => {
    try {
        const query = `
            UPDATE messages 
            SET read = $1
            WHERE id = $2
            RETURNING *
        `;
        // Assuming this endpoint toggles read status or sets it to true
        const values = [true, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
    }
});

module.exports = router;
