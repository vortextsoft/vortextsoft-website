const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/emailService');
const { createEmailTemplate } = require('../utils/emailTemplate');

// Get all meetings
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM meetings ORDER BY created_at DESC');
        // Map snake_case database columns to camelCase for frontend compatibility if needed
        // Or frontend can handle snake_case. 
        // For minimal breakage, let's map keys manually or adjust query alias.
        // Actually, let's keep it simple: mapped manually.
        const items = result.rows.map(row => ({
            id: row.id,
            name: row.name,
            email: row.email,
            date: row.date,
            time: row.time,
            topic: row.topic,
            reason: row.reason,
            status: row.status,
            isRead: row.is_read,
            meetingLink: row.meeting_link,
            cancellationReason: row.cancellation_reason,
            createdAt: row.created_at
        }));
        res.json(items);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Create new meeting
router.post('/', async (req, res) => {
    try {
        const { name, email, date, time, topic, reason } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO meetings (id, name, email, date, time, topic, reason, status, is_read)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [id, name, email, date, time, topic, reason || '', 'pending', false];

        const result = await db.query(query, values);
        // Map back to camelCase
        const row = result.rows[0];
        const newItem = {
            id: row.id,
            name: row.name,
            email: row.email,
            date: row.date,
            time: row.time,
            topic: row.topic,
            reason: row.reason,
            status: row.status,
            isRead: row.is_read,
            createdAt: row.created_at
        };

        res.status(201).json(newItem);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// Update meeting status (confirm/cancel)
router.patch('/:id/status', async (req, res) => {
    try {
        const { status, meetingLink, cancellationReason } = req.body;

        // Fetch current meeting details for email
        const currentResult = await db.query('SELECT * FROM meetings WHERE id = $1', [req.params.id]);
        if (currentResult.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        const meeting = currentResult.rows[0];

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
            } catch (emailErr) {
                console.error("Failed to send cancellation email:", emailErr);
            }
        }

        // Update DB
        const query = `
            UPDATE meetings 
            SET status = $1, meeting_link = $2, cancellation_reason = $3, is_read = $4
            WHERE id = $5
            RETURNING *
        `;
        const values = [status, meetingLink || meeting.meeting_link, cancellationReason || meeting.cancellation_reason, true, req.params.id];

        const result = await db.query(query, values);
        const row = result.rows[0];

        // Map back
        const updatedItem = {
            id: row.id,
            name: row.name,
            email: row.email,
            date: row.date,
            time: row.time,
            topic: row.topic,
            reason: row.reason,
            status: row.status,
            isRead: row.is_read,
            meetingLink: row.meeting_link,
            cancellationReason: row.cancellation_reason,
            createdAt: row.created_at
        };

        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Mark meeting as read
router.patch('/:id/read', async (req, res) => {
    try {
        const query = `UPDATE meetings SET is_read = true WHERE id = $1 RETURNING *`;
        const result = await db.query(query, [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        const row = result.rows[0];
        // Map back (minified for speed)
        res.json({ ...row, isRead: row.is_read });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Delete meeting
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM meetings WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
