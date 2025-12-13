const createEmailTemplate = (recipientName, messageBody) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vortextsoft</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 20px 0;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header with Logo -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2D3247 0%, #3A4159 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">
                                Vortextsoft<span style="color: #00C8CC;">.</span>
                            </h1>
                            <p style="margin: 8px 0 0 0; color: #00E89F; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
                                Technology Solutions
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 20px 0; color: #2D3247; font-size: 16px; line-height: 1.6;">
                                Hi <strong>${recipientName}</strong>,
                            </p>
                            
                            <div style="color: #555; font-size: 15px; line-height: 1.8;">
                                ${messageBody.replace(/\n/g, '<br>')}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Signature -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="border-top: 2px solid #00C8CC; padding-top: 25px;">
                                        <p style="margin: 0 0 20px 0; color: #2D3247; font-size: 16px; line-height: 1.6;">
                                            Thank you for contacting us. We look forward to serving you.
                                        </p>
                                        <p style="margin: 0 0 8px 0; color: #2D3247; font-size: 16px; font-weight: 600;">
                                            Best regards,
                                        </p>
                                        <p style="margin: 0 0 4px 0; color: #2D3247; font-size: 18px; font-weight: 700;">
                                            Vortextsoft (Pvt) Ltd
                                        </p>
                                        <p style="margin: 0 0 15px 0; color: #00C8CC; font-size: 13px; font-style: italic;">
                                            Empowering Your Business with Technology
                                        </p>
                                        
                                        <!-- Contact Info -->
                                        <table cellpadding="0" cellspacing="0" style="margin-top: 15px;">
                                            <tr>
                                                <td style="padding: 4px 0;">
                                                    <span style="color: #666; font-size: 13px;">
                                                        📧 <a href="mailto:vortextsoft.info@gmail.com" style="color: #0094FF; text-decoration: none;">vortextsoft.info@gmail.com</a>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 4px 0;">
                                                    <span style="color: #666; font-size: 13px;">
                                                        📱 <a href="tel:+94786620583" style="color: #0094FF; text-decoration: none;">+94 78 662 0583</a>
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Social Links -->
                                        <table cellpadding="0" cellspacing="0" style="margin-top: 20px;">
                                            <tr>
                                                <td style="padding-right: 15px;">
                                                    <a href="https://www.linkedin.com/company/vortextsoft/" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #0077B5; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                                        LinkedIn
                                                    </a>
                                                </td>
                                                <td style="padding-right: 15px;">
                                                    <a href="https://github.com/vortextsoft" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #333; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                                        GitHub
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="https://www.facebook.com/share/17uVV5Kuf1/" target="_blank" style="display: inline-block; padding: 8px 12px; background-color: #1877F2; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 12px; font-weight: 600;">
                                                        Facebook
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
                            <p style="margin: 0; color: #999; font-size: 12px; line-height: 1.6;">
                                © ${new Date().getFullYear()} Vortextsoft (Pvt) Ltd. All rights reserved.<br>
                                This email was sent from Vortextsoft Admin Panel.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

module.exports = { createEmailTemplate };
