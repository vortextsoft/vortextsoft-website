const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

const TABLE = 'messages';

router.get('/', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db[TABLE] || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // 1. Validation
        if (!email || !message) {
            return res.status(400).json({ error: 'Email and message are required' });
        }

        // 2. Send Email Directly to Admin (No DB Save)
        // We use the email service we saw earlier
        const { sendEmail } = require('../utils/emailService');

        await sendEmail({
            to: process.env.EMAIL_USER, // Send to the business owner
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

        // 3. Return success (Client thinks it saved)
        const newItem = {
            id: uuidv4(),
            ...req.body,
            createdAt: new Date().toISOString(),
            status: 'sent_via_email' // Marker
        };

        res.status(201).json(newItem);

    } catch (error) {
        console.error('Contact form error:', error);
        // Even if email fails, we don't want to crash the frontend, but ideally we should alert user.
        // For now, return error so frontend shows "Try again"
        res.status(500).json({ error: 'Failed to send message' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();
        if (!db[TABLE]) db[TABLE] = [];
        const newItems = db[TABLE].filter(s => s.id !== req.params.id);
        if (newItems.length === db[TABLE].length) {
            return res.status(404).json({ error: 'Item not found' });
        }
        db[TABLE] = newItems;
        await writeDb(db);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

// Mark message as replied
router.patch('/:id/replied', async (req, res) => {
    try {
        const db = await readDb();
        if (!db[TABLE]) db[TABLE] = [];

        const message = db[TABLE].find(m => m.id === req.params.id);

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        message.replied = true;
        message.repliedAt = new Date().toISOString();

        await writeDb(db);
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message' });
    }
});

module.exports = router;
