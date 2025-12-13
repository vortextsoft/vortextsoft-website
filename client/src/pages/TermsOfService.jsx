import React from 'react';
import '../styles/About.css'; // Reusing hero styles for consistency

const TermsOfService = () => {
    return (
        <div className="page-container">
            {/* Hero Section */}
            <section className="about-hero" style={{ minHeight: '40vh' }}>
                <div className="container hero-container">
                    <div className="hero-content" style={{ maxWidth: '100%' }}>
                        <h1>Terms of Service</h1>
                        <p className="lead">
                            Please read these terms and conditions carefully before using our service.
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
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>1. Agreement to Terms</h3>
                            <p>By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>2. Intellectual Property Rights</h3>
                            <p>Unless otherwise indicated, the Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Vortextsoft, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>3. User Representations</h3>
                            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>4. Limitations of Liability</h3>
                            <p>In no event shall Vortextsoft or its directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>5. Governing Law</h3>
                            <p>These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ color: '#002D62', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>6. Contact Us</h3>
                            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: <a href="mailto:vortextsoft.info@gmail.com" style={{ color: '#00C8CC', textDecoration: 'none', fontWeight: 'bold' }}>vortextsoft.info@gmail.com</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
