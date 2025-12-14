const express = require('express');
const router = express.Router();
const { readDb, writeDb } = require('../utils/db');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/emailService');
const { createEmailTemplate } = require('../utils/emailTemplate');

const TABLE = 'meetings';

// Get all meetings
router.get('/', async (req, res) => {
    try {
        const db = await readDb();
        res.json(db[TABLE] || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Create new meeting
router.post('/', async (req, res) => {
    try {
        const db = await readDb();
        const newItem = {
            id: uuidv4(),
            ...req.body,
            reason: req.body.reason || '', // Ensure reason key exists
            status: 'pending', // pending, confirmed, cancelled
            isRead: false,
            createdAt: new Date().toISOString()
        };
        if (!db[TABLE]) db[TABLE] = [];
        db[TABLE].push(newItem);
        await writeDb(db);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// Update meeting status (confirm/cancel)
// Update meeting status (confirm/cancel)
router.patch('/:id/status', async (req, res) => {
    try {
        const db = await readDb();
        if (!db[TABLE]) db[TABLE] = [];
        const index = db[TABLE].findIndex(s => s.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Item not found' });

        const { status, meetingLink, cancellationReason } = req.body;
        const meeting = db[TABLE][index];

        // Send Email if Confirmed
        if (status === 'confirmed' && meetingLink) {
            const message = `
                Your meeting request for <strong>${meeting.topic}</strong> has been confirmed.
                <br><br>
                <strong>Date:</strong> ${meeting.date}<br>
                <strong>Time:</strong> ${meeting.time}
                <br><br>
                Please kindly join the meeting on time using the link below:
                <br><br>
                <a href="${meetingLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Join Google Meet</a>
                <br><br>
                Link: ${meetingLink}
            `;

            try {
                const htmlContent = createEmailTemplate(meeting.name, message);
                await sendEmail({
                    to: meeting.email,
                    subject: 'Meeting Confirmation - Vortextsoft',
                    text: `Your meeting is confirmed. Join here: ${meetingLink}`,
                    html: htmlContent
                });
                console.log(`Confirmation email sent to ${meeting.email}`);
            } catch (emailErr) {
                console.error("Failed to send confirmation email:", emailErr);
            }
        }

        // Send Email if Cancelled
        if (status === 'cancelled' && cancellationReason) {
            const message = `
                Your meeting request for <strong>${meeting.topic}</strong> has been cancelled.
                <br><br>
                <strong>Reason:</strong> ${cancellationReason}
                <br><br>
                If you have any questions or would like to reschedule, please contact us.
            `;

            try {
                const htmlContent = createEmailTemplate(meeting.name, message);
                await sendEmail({
                    to: meeting.email,
                    subject: 'Meeting Update - Vortextsoft',
                    text: `Your meeting request has been cancelled. Reason: ${cancellationReason}`,
                    html: htmlContent
                });
                console.log(`Cancellation email sent to ${meeting.email}`);
            } catch (emailErr) {
                console.error("Failed to send cancellation email:", emailErr);
            }
        }

        // Update status and mark as read
        db[TABLE][index] = {
            ...meeting,
            status: status,
            meetingLink: meetingLink || meeting.meetingLink,
            cancellationReason: cancellationReason || meeting.cancellationReason,
            isRead: true
        };

        await writeDb(db);
        res.json(db[TABLE][index]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Mark meeting as read (for notification clearing)
router.patch('/:id/read', async (req, res) => {
    try {
        const db = await readDb();
        if (!db[TABLE]) db[TABLE] = [];
        const index = db[TABLE].findIndex(s => s.id === req.params.id);
        if (index === -1) return res.status(404).json({ error: 'Item not found' });

        db[TABLE][index] = { ...db[TABLE][index], isRead: true };
        await writeDb(db);
        res.json(db[TABLE][index]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Delete meeting
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

module.exports = router;
