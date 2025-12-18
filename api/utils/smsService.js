const twilio = require('twilio');

class SMSService {
    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID;
        this.authToken = process.env.TWILIO_AUTH_TOKEN;
        this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;

        if (this.accountSid && this.authToken) {
            this.client = twilio(this.accountSid, this.authToken);
        }
    }

    // Generate 6-digit OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Send OTP via SMS
    async sendOTP(phoneNumbers, otp) {
        if (!this.client) {
            console.error('Twilio not configured. OTP:', otp);
            return { success: false, error: 'SMS service not configured' };
        }

        try {
            const phoneList = Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers];
            const promises = phoneList.map(phone => {
                // Format phone number (add +94 for Sri Lankan numbers)
                const formattedPhone = phone.startsWith('+') ? phone : `+94${phone.substring(1)}`;

                return this.client.messages.create({
                    body: `Your VortextSoft admin login OTP is: ${otp}. Valid for 5 minutes.`,
                    from: this.phoneNumber,
                    to: formattedPhone
                });
            });

            const results = await Promise.all(promises);
            console.log('OTP sent to', phoneList.length, 'numbers');
            return { success: true, messagesSent: results.length };
        } catch (error) {
            console.error('SMS sending failed:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = new SMSService();
