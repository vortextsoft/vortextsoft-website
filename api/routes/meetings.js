const express = require('express');
const router = express.Router();
const Meeting = require('../models/Meeting');
const { sendEmail } = require('../utils/emailService');
const { createEmailTemplate } = require('../utils/emailTemplate');

// Get all meetings
router.get('/', async (req, res) => {
    try {
        const meetings = await Meeting.find().sort({ createdAt: -1 });
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Create new meeting
router.post('/', async (req, res) => {
    try {
        const newMeeting = new Meeting({
            ...req.body,
            status: 'pending',
            isRead: false
        });
        const savedMeeting = await newMeeting.save();
        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// Update meeting status (confirm/cancel)
router.patch('/:id/status', async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Item not found' });

        const { status, meetingLink, cancellationReason } = req.body;

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
        meeting.status = status;
        if (meetingLink) meeting.meetingLink = meetingLink;
        if (cancellationReason) meeting.cancellationReason = cancellationReason;
        meeting.isRead = true;

        await meeting.save();
        res.json(meeting);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Mark meeting as read (for notification clearing)
router.patch('/:id/read', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!meeting) return res.status(404).json({ error: 'Item not found' });
        res.json(meeting);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// Delete meeting
router.delete('/:id', async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
