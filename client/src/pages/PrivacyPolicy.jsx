import React from 'react';
import '../styles/About.css'; // Reusing hero styles for consistency

const PrivacyPolicy = () => {
    return (
        <div className="page-container">
            {/* Hero Section */}
            <section className="about-hero" style={{ minHeight: '40vh' }}>
                <div className="container hero-container">
                    <div className="hero-content" style={{ maxWidth: '100%' }}>
                        <h1>Privacy Policy</h1>
                        <p className="lead">
                            We are committed to protecting your personal data and respecting your privacy.
                        </p>
                        <p style={{ marginTop: '1rem', color: '#8b949e' }}>Last updated: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="section" style={{ paddingTop: '2rem', backgroundColor: '#fff' }}>
                <div className="container">
                    <div className="policy-content" style={{ maxWidth: '800px', margin: '0 auto', color: '#1a202c', lineHeight: '1.8' }}>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>1. Introduction</h3>
                            <p>Welcome to Vortextsoft. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>2. Information We Collect</h3>
                            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem', listStyleType: 'disc', color: '#1a202c' }}>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                <li style={{ marginBottom: '0.5rem' }}><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                            </ul>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>3. How We Use Your Personal Data</h3>
                            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem', listStyleType: 'disc', color: '#1a202c' }}>
                                <li style={{ marginBottom: '0.5rem' }}>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                <li style={{ marginBottom: '0.5rem' }}>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                <li style={{ marginBottom: '0.5rem' }}>Where we need to comply with a legal obligation.</li>
                            </ul>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>4. Data Security</h3>
                            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>5. Contact Details</h3>
                            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:vortextsoft.info@gmail.com" style={{ color: '#00C8CC', textDecoration: 'none', fontWeight: 'bold' }}>vortextsoft.info@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
