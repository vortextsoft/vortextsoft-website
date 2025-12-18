class EmailOTPService {
    // Generate 6-digit OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Send OTP via Email
    async sendOTP(email, otp) {
        try {
            const { sendEmail } = require('./emailService');

            await sendEmail({
                to: email,
                subject: 'VortextSoft Admin Login - OTP Code',
                text: `Your VortextSoft admin login OTP is: ${otp}\n\nThis code is valid for 5 minutes.\n\nIf you didn't request this, please ignore this email.`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #00C8CC 0%, #0099CC 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0;">VortextSoft</h1>
                        </div>
                        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                            <h2 style="color: #333; margin-top: 0;">Admin Login OTP</h2>
                            <p style="color: #666; font-size: 16px;">Your one-time password for admin login:</p>
                            <div style="background: white; border: 2px solid #00C8CC; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                                <h1 style="color: #00C8CC; font-size: 48px; letter-spacing: 8px; margin: 0; font-family: monospace;">${otp}</h1>
                            </div>
                            <p style="color: #999; font-size: 14px;">⏱️ Valid for 5 minutes</p>
                            <p style="color: #999; font-size: 14px;">❌ If you didn't request this, please ignore this email.</p>
                        </div>
                        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
                            <p>© 2024 VortextSoft. All rights reserved.</p>
                        </div>
                    </div>
                `
            });

            console.log('OTP email sent to:', email);
            return { success: true };
        } catch (error) {
            console.error('Email OTP sending failed:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new EmailOTPService();
