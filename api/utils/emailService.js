const nodemailer = require('nodemailer');

// Email configuration
// You'll need to configure this with your email service credentials
const createTransporter = () => {
    // For Gmail (you'll need to enable "Less secure app access" or use App Password)
    // Or use any other email service like SendGrid, Mailgun, etc.

    return nodemailer.createTransport({
        service: 'gmail', // or 'smtp.gmail.com'
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASSWORD || 'your-app-password'
        }
    });
};

const sendEmail = async ({ to, subject, text, html }) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to,
            subject,
            text,
            html: html || text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { sendEmail };
