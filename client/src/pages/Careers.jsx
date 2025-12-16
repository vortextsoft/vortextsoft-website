import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { API_URL } from '../config';
import { Cpu, Users, TrendingUp, Award } from 'lucide-react';
import '../styles/Careers.css';

const Careers = () => {
    const [jobs, setJobs] = useState([]);
    const [expandedJob, setExpandedJob] = useState(null);
    const [application, setApplication] = useState({
        name: '', email: '', phone: '', portfolio: '', message: '', cvLink: '', coverLetterLink: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [uploadingCV, setUploadingCV] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);

    // Hero Animation Logic
    const handleMouseMove = (e) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;

        // Hero Elements
        const heroImage = container.querySelector('.hero-main-image');
        const heroCircle = container.querySelector('.hero-circle-bg');
        const heroDecor1 = container.querySelector('.hero-decoration-1');
        const heroDecor2 = container.querySelector('.hero-decoration-2');

        if (heroImage) heroImage.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
        if (heroCircle) heroCircle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if (heroDecor1) heroDecor1.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        if (heroDecor2) heroDecor2.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px)`;
    };

    const handleMouseLeave = (e) => {
        const container = e.currentTarget;
        const elements = container.querySelectorAll('.hero-main-image, .hero-circle-bg, .hero-decoration-1, .hero-decoration-2');
        elements.forEach(el => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.5s ease-out';
        });
    };

    useEffect(() => {
        api.getJobs()
            .then(data => {
                // Filter out closed jobs (isOpen !== false allows undefined to be shown as open for legacy data)
                const openJobs = data.filter(job => job.isOpen !== false);
                setJobs(openJobs);
            })
            .catch(console.error);
    }, []);

    const toggleJob = (id) => {
        if (expandedJob === id) setExpandedJob(null);
        else setExpandedJob(id);
        setSuccessMsg(''); // Clear msg
    };

    const handleAppChange = (e) => {
        setApplication({ ...application, [e.target.name]: e.target.value });
    };

    const handleCVUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        setUploadingCV(true);
        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await fetch(`${API_URL}/upload/document`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.fileUrl) {
                setApplication({ ...application, cvLink: data.fileUrl });
            }
        } catch (error) {
            console.error('Error uploading CV:', error);
            alert('Failed to upload CV');
        } finally {
            setUploadingCV(false);
        }
    };

    const handleCoverLetterUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }

        setUploadingCover(true);
        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await fetch(`${API_URL}/upload/document`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.fileUrl) {
                setApplication({ ...application, coverLetterLink: data.fileUrl });
            }
        } catch (error) {
            console.error('Error uploading cover letter:', error);
            alert('Failed to upload cover letter');
        } finally {
            setUploadingCover(false);
        }
    };

    const submitApplication = async (e, job) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.submitApplication({
                ...application,
                position: job.title,
                jobId: job.id,
                status: 'New'
            });
            setSuccessMsg('Application submitted successfully!');
            setApplication({ name: '', email: '', phone: '', portfolio: '', message: '', cvLink: '', coverLetterLink: '' });
        } catch (error) {
            alert('Failed to submit application.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="page-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="careers-hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>VortextSoft Careers:<br />Where Passion Meets Purpose</h1>
                        <p>Our culture is powered by one simple value: treat people the way you want to be treated. Join us to build the future of technology.</p>
                        <button className="btn-hero" onClick={() => document.getElementById('jobs-section').scrollIntoView({ behavior: 'smooth' })}>
                            View Open Positions
                        </button>
                    </div>
                    <div className="hero-image-wrapper">
                        <div className="hero-circle-bg"></div>
                        <img src="/careers-hero-abstract.png" alt="Careers at VortextSoft" className="hero-main-image" />
                        <div className="hero-decoration-1"></div>
                        <div className="hero-decoration-2"></div>
                    </div>
                </div>
            </div>

            <div className="container section">
                <div className="careers-content">
                    {/* Who We Are Section */}
                    <div className="who-we-are-section">
                        <h2>Who We Are</h2>
                        <p>
                            VortextSoft is more than just a software development company; we are a collective of innovators, problem-solvers, and tech enthusiasts dedicated to transforming ideas into reality. Founded on the principles of excellence and integrity, we specialize in delivering high-impact digital solutions for businesses worldwide. Our team creates an environment where creativity thrives, and every member is empowered to make a difference.
                        </p>
                    </div>

                    {/* Why Join Section */}
                    {/* Why Join Section */}
                    <div className="why-join-section">
                        <div className="why-join-header">
                            <h3>Why Join Vortextsoft?</h3>
                            <p className="why-join-intro">
                                We offer more than just a job; we offer a pathway to excellence. Join a team where innovation is the standard and professional growth is guaranteed.
                            </p>
                        </div>

                        <div className="benefits-grid">
                            <div className="benefit-card">
                                <div className="benefit-icon"><Cpu size={32} /></div>
                                <h4>Cutting-Edge Tech</h4>
                                <p>Immerse yourself in projects involving AI, IoT, VR, and Cloud Computing. We stay ahead of the curve.</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon"><Users size={32} /></div>
                                <h4>Inclusive Culture</h4>
                                <p>Work in a collaborative environment where diverse perspectives are valued and every voice is heard.</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon"><TrendingUp size={32} /></div>
                                <h4>Growth Opportunities</h4>
                                <p>We invest in your future with mentorship programs, certifications, and clear career progression paths.</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon"><Award size={32} /></div>
                                <h4>Competitive Benefits</h4>
                                <p>Enjoy a comprehensive benefits package, performance bonuses, and work-life balance initiatives.</p>
                            </div>
                        </div>
                    </div>

                    <div className="jobs-list" id="jobs-section">
                        <h2>Open Positions</h2>
                        {jobs.length === 0 ? (
                            <div className="no-jobs">
                                <p>Currently, there are no open positions. Please check back later or send us your CV for future opportunities.</p>
                            </div>
                        ) : null}

                        {jobs.map(job => (
                            <div key={job.id} className={`job-card ${expandedJob === job.id ? 'expanded' : ''}`}>
                                <div className="job-header">
                                    <div>
                                        <h3>{job.title}</h3>
                                        <div className="job-meta">
                                            <span>{job.type || 'Full-time'}</span>
                                            <span className="separator">•</span>
                                            <span>{job.location || 'Remote'}</span>
                                        </div>
                                    </div>
                                    <button className="btn-toggle" onClick={() => toggleJob(job.id)}>
                                        {expandedJob === job.id ? 'Close' : 'View Details'}
                                    </button>
                                </div>

                                {expandedJob === job.id && (
                                    <div className="job-details">
                                        <div className="detail-section">
                                            <h4>About the Role</h4>
                                            <div dangerouslySetInnerHTML={{ __html: job.description }} />
                                        </div>
                                        <div className="detail-section">
                                            <h4>Responsibilities</h4>
                                            <div dangerouslySetInnerHTML={{ __html: job.responsibilities || "Standard responsibilities apply." }} />
                                        </div>
                                        <div className="detail-section">
                                            <h4>Requirements</h4>
                                            <div dangerouslySetInnerHTML={{ __html: job.requirements || "Standard requirements apply." }} />
                                        </div>

                                        <div className="application-form-container">
                                            <h4>Apply for this position</h4>
                                            {successMsg ? <div className="success-msg">{successMsg}</div> : (
                                                <form onSubmit={(e) => submitApplication(e, job)} className="app-form">
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label>Full Name *</label>
                                                            <input required type="text" name="name" placeholder="John Doe" value={application.name} onChange={handleAppChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Email Address *</label>
                                                            <input required type="email" name="email" placeholder="john@example.com" value={application.email} onChange={handleAppChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label>Phone Number *</label>
                                                            <input required type="tel" name="phone" placeholder="+94 77 123 4567" value={application.phone} onChange={handleAppChange} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>LinkedIn / Portfolio URL</label>
                                                            <input type="url" name="portfolio" placeholder="https://linkedin.com/in/yourprofile" value={application.portfolio} onChange={handleAppChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label>Upload CV/Resume (PDF) *</label>
                                                            <div className="file-upload-wrapper">
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    onChange={handleCVUpload}
                                                                    id="cv-upload"
                                                                    required={!application.cvLink}
                                                                />
                                                                {uploadingCV && <span className="upload-status">Uploading...</span>}
                                                                {application.cvLink && <span className="upload-status success">✓ Uploaded</span>}
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Upload Cover Letter (PDF)</label>
                                                            <div className="file-upload-wrapper">
                                                                <input
                                                                    type="file"
                                                                    accept=".pdf"
                                                                    onChange={handleCoverLetterUpload}
                                                                    id="cover-upload"
                                                                />
                                                                {uploadingCover && <span className="upload-status">Uploading...</span>}
                                                                {application.coverLetterLink && <span className="upload-status success">✓ Uploaded</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Additional Message</label>
                                                        <textarea name="message" placeholder="Tell us why you're a great fit for this role..." rows="4" value={application.message} onChange={handleAppChange}></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary" disabled={submitting || uploadingCV || uploadingCover}>
                                                        {submitting ? 'Submitting...' : 'Submit Application'}
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
