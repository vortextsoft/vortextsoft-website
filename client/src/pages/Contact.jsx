import React, { useState } from 'react';
import {
    ArrowUpRight,
    MapPin,
    Mail,
    Phone,
    Rocket,
    Compass,
    FileText,
    Code,
    X,
    Calendar,
    Clock
} from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', message: ''
    });
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
    const [showModal, setShowModal] = useState(false);
    const [meetingData, setMeetingData] = useState({
        name: '', email: '', date: '', time: '', topic: ''
    });
    const [meetingStatus, setMeetingStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMeetingChange = (e) => {
        setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.sendContactMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    const handleMeetingSubmit = async (e) => {
        e.preventDefault();
        setMeetingStatus('sending');
        try {
            await api.scheduleMeeting(meetingData);
            setMeetingStatus('success');
            setMeetingData({ name: '', email: '', date: '', time: '', topic: '' });
        } catch (error) {
            setMeetingStatus('error');
        }
    };

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Connect with Precision — Contact Us"
                description="Elevate your operations with Vortextsoft Pentra (Pvt) Ltd. Reach out to our engineering teams for enterprise software solutions, consulting, or technical support."
                path="/contact"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Main Page Content ────────────────────────────────────────────── */}
            <main id="main-content" className="contact-page-new">

                {/* ── 1. Hero Section ── */}
                <section className="contact-hero-new" aria-label="Connect with Precision">
                    <div className="contact-hero-container">
                        <div className="contact-hero-left">
                            <div className="contact-badge">
                                <span className="badge-dot"></span>
                                CONNECT WITH PRECISION
                            </div>
                            <h1 className="contact-headline">
                                Elevate Your<br />
                                <span className="highlight-cyan">Operations</span>
                            </h1>
                            <p className="contact-subtitle">
                                Reach out to our specialist teams for bespoke enterprise solutions, strategic consulting, or technical support. Our engineers are ready to architect your next leap forward.
                            </p>
                            <button
                                className="btn-schedule-hero"
                                onClick={() => setShowModal(true)}
                                id="contact-schedule-meeting-btn"
                            >
                                <Calendar size={16} /> SCHEDULE A CONSULTATION
                            </button>
                        </div>

                        {/* Right Floating Response Time Card Visual */}
                        <div className="contact-hero-right" aria-hidden="true">
                            <div className="response-time-card">
                                <div className="card-mockup-header">
                                    <span className="card-mockup-dot"></span>
                                    <span className="card-mockup-title">Direct Engineer Pipeline</span>
                                </div>
                                <div className="card-mockup-body">
                                    <div className="mockup-line line-wide"></div>
                                    <div className="mockup-line line-mid"></div>
                                    <div className="mockup-line line-short"></div>
                                </div>
                                <div className="response-time-badge">
                                    <div className="response-icon">
                                        <Rocket size={18} color="#010409" />
                                    </div>
                                    <div className="response-text">
                                        <span className="response-label">RESPONSE TIME</span>
                                        <span className="response-value">&lt; 4 HOURS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Form & Headquarters Grid Section ── */}
                <section className="contact-grid-section" aria-label="Send a Message or Locate Headquarters">
                    <div className="contact-grid-container">

                        {/* Left Column: Form */}
                        <div className="contact-form-card">
                            <h2 className="form-card-title">Send a Message</h2>
                            {status === 'success' && (
                                <div className="form-status-alert success">
                                    ✅ Message sent successfully! Our engineers will respond within 4 hours.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="form-status-alert error">
                                    ❌ Failed to send message. Please try again or email us directly.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form-new">
                                <div className="form-row-2col">
                                    <div className="form-field">
                                        <label htmlFor="name">FULL NAME</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">EMAIL ADDRESS</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="john@enterprise.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row-2col">
                                    <div className="form-field">
                                        <label htmlFor="phone">PHONE NUMBER</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="company">COMPANY</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder="Global Corp"
                                            value={formData.company}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="message">MESSAGE</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Tell us about your requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-submit-connection"
                                    disabled={status === 'sending'}
                                    id="contact-form-submit-btn"
                                >
                                    {status === 'sending' ? 'SENDING...' : 'INITIATE CONNECTION'} <ArrowUpRight size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Right Column: Headquarters */}
                        <div className="headquarters-column">
                            <h2 className="headquarters-title">Headquarters</h2>

                            {/* Location */}
                            <div className="hq-info-item">
                                <div className="hq-icon-box">
                                    <MapPin size={22} color="#00C8CC" />
                                </div>
                                <div className="hq-info-text">
                                    <h3>Colombo, Sri Lanka</h3>
                                    <p>Level 32, West Tower, Echelon Square, Colombo 01, 00100</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="hq-info-item">
                                <div className="hq-icon-box">
                                    <Mail size={22} color="#00C8CC" />
                                </div>
                                <div className="hq-info-text">
                                    <span className="hq-label">EMAIL US</span>
                                    <a href="mailto:vortextsoft.info@gmail.com" className="hq-value">
                                        vortextsoft.info@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="hq-info-item">
                                <div className="hq-icon-box">
                                    <Phone size={22} color="#00C8CC" />
                                </div>
                                <div className="hq-info-text">
                                    <span className="hq-label">CALL US</span>
                                    <a href="tel:0787620583" className="hq-value">
                                        +94 (78) 762 0583
                                    </a>
                                </div>
                            </div>

                            {/* Regional Hubs */}
                            <div className="regional-hubs-box">
                                <div className="hubs-label">REGIONAL HUBS</div>
                                <div className="hubs-badges">
                                    <span className="hub-badge">London, UK</span>
                                    <span className="hub-badge">Singapore</span>
                                    <span className="hub-badge">New York, USA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Digital Command Center Map Section ── */}
                <section className="command-center-section" aria-label="Digital Command Center Location">
                    <div className="command-center-container">
                        <div className="map-frame">
                            <iframe
                                title="Vortextsoft Headquarters Map"
                                src="https://maps.google.com/maps?q=Colombo,%20Sri%20Lanka&t=m&z=12&output=embed&iwloc=near"
                                width="100%"
                                height="340"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                            <div className="map-overlay-badge">
                                <Compass size={16} color="#00C8CC" />
                                <span>OUR DIGITAL COMMAND CENTER</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Instant Technical Documentation CTA Section ── */}
                <section className="docs-cta-section" aria-labelledby="docs-cta-heading">
                    <div className="docs-cta-container">
                        <h2 id="docs-cta-heading" className="docs-cta-title">
                            Seeking Instant Technical Documentation?
                        </h2>
                        <p className="docs-cta-subtitle">
                            Access our knowledge base or developer portal for immediate specifications and integration guides.
                        </p>
                        <div className="docs-cta-buttons">
                            <a href="#docs" className="btn-docs-secondary">
                                <FileText size={16} /> Documentation
                            </a>
                            <a href="#portal" className="btn-docs-secondary">
                                <Code size={16} /> Developer Portal
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Schedule Meeting Modal ── */}
                {showModal && (
                    <div className="meeting-modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="meeting-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Schedule a Consultation Meeting</h3>
                                <button className="btn-close-modal" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            {meetingStatus === 'success' ? (
                                <div className="form-status-alert success">
                                    ✅ Consultation scheduled! We will send an invite to your email shortly.
                                </div>
                            ) : (
                                <form onSubmit={handleMeetingSubmit} className="modal-body-form">
                                    <div className="form-group">
                                        <label>Your Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Jane Doe"
                                            value={meetingData.name}
                                            onChange={handleMeetingChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="jane@company.com"
                                            value={meetingData.email}
                                            onChange={handleMeetingChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-row-2col">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={meetingData.date}
                                                onChange={handleMeetingChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Time</label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={meetingData.time}
                                                onChange={handleMeetingChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Topic / Requirements</label>
                                        <textarea
                                            name="topic"
                                            rows="3"
                                            placeholder="Briefly describe what you'd like to discuss..."
                                            value={meetingData.topic}
                                            onChange={handleMeetingChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-submit-connection"
                                        disabled={meetingStatus === 'sending'}
                                    >
                                        {meetingStatus === 'sending' ? 'CONFIRMING...' : 'CONFIRM CONSULTATION'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

            </main>
        </>
    );
};

export default Contact;
