const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/emailService');
const { createEmailTemplate } = require('../utils/emailTemplate');

// Send email endpoint
router.post('/send', async (req, res) => {
    try {
        const { to, subject, message, recipientName } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create HTML email with template
        const htmlContent = createEmailTemplate(recipientName || 'Valued Customer', message);

        // Send the email
        const result = await sendEmail({
            to,
            subject,
            text: message, // Plain text fallback
            html: htmlContent // Beautiful HTML email
        });

        res.json({ success: true, message: 'Email sent successfully', messageId: result.messageId });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

module.exports = router;
