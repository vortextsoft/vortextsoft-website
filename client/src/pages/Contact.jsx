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
    CheckCircle,
    ArrowRight
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
            setTimeout(() => setStatus(null), 5000);
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
            setTimeout(() => {
                setMeetingStatus(null);
                setShowModal(false);
            }, 3000);
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
                                <span className="highlight-gradient">Operations</span>
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
                            <div className="response-card-box">
                                <img
                                    src="/corporate-team-formal.png"
                                    alt="Vortextsoft Command Center"
                                    className="contact-hero-img"
                                    loading="lazy"
                                />
                                <div className="contact-img-overlay"></div>
                                <div className="floating-response-badge">
                                    <div className="response-icon-circle">
                                        <Rocket size={24} color="#00C8CC" />
                                    </div>
                                    <div className="response-text-group">
                                        <span className="response-label">RESPONSE TIME</span>
                                        <span className="response-time">&lt; 4 HOURS</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Contact Grid (Form + Details) ── */}
                <section className="contact-grid-section" aria-label="Send a Message & Directory">
                    <div className="contact-grid-container">
                        <div className="grid-2col-layout">

                            {/* Left Form Side */}
                            <div className="form-column-card">
                                <h2 className="column-title-new">Send a Message</h2>
                                <form onSubmit={handleSubmit} className="contact-form-elements">
                                    <div className="form-row-2col">
                                        <div className="form-group-item">
                                            <label>FULL NAME</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group-item">
                                            <label>EMAIL ADDRESS</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@enterprise.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row-2col">
                                        <div className="form-group-item">
                                            <label>PHONE NUMBER</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group-item">
                                            <label>COMPANY</label>
                                            <input
                                                type="text"
                                                name="company"
                                                placeholder="Global Corp"
                                                value={formData.company}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group-item">
                                        <label>MESSAGE</label>
                                        <textarea
                                            name="message"
                                            rows="5"
                                            placeholder="Tell us about your requirements..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    {status === 'success' && (
                                        <div className="form-status-alert success">
                                            ✅ Message transmitted successfully! Our team will reach out within 4 hours.
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <div className="form-status-alert error">
                                            ⚠️ Transmission error. Please try again or email us directly at hello@vortextsoft.com.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn-initiate-connection"
                                        disabled={status === 'sending'}
                                    >
                                        <span>{status === 'sending' ? 'TRANSMITTING...' : 'INITIATE CONNECTION'}</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </form>
                            </div>

                            {/* Right Details Side */}
                            <div className="details-column-side">
                                <div className="details-top-box">
                                    <h3 className="details-heading-new">Headquarters</h3>
                                    <div className="headquarters-card-item">
                                        <div className="detail-icon-circle">
                                            <MapPin size={24} color="#00C8CC" />
                                        </div>
                                        <div>
                                            <h4 className="location-name">Colombo, Sri Lanka</h4>
                                            <p className="location-address">
                                                Level 32, West Tower, Echelon Square,<br />
                                                Colombo 01, 00100
                                            </p>
                                        </div>
                                    </div>

                                    <div className="contact-methods-grid">
                                        <div className="contact-method-card">
                                            <div className="detail-icon-circle">
                                                <Mail size={22} color="#00C8CC" />
                                            </div>
                                            <div>
                                                <div className="method-label">EMAIL US</div>
                                                <a href="mailto:hello@vortextsoft.com" className="method-value">
                                                    hello@vortextsoft.com
                                                </a>
                                            </div>
                                        </div>

                                        <div className="contact-method-card">
                                            <div className="detail-icon-circle">
                                                <Phone size={22} color="#00C8CC" />
                                            </div>
                                            <div>
                                                <div className="method-label">CALL US</div>
                                                <a href="tel:+94112345678" className="method-value">
                                                    +94 (11) 234 5678
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="regional-hubs-box">
                                    <div className="hubs-label">REGIONAL HUBS</div>
                                    <div className="hubs-pills-row">
                                        <span className="hub-pill">London, UK</span>
                                        <span className="hub-pill">Singapore</span>
                                        <span className="hub-pill">New York, USA</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ── 3. Digital Command Center Map Section ── */}
                <section className="command-map-section" aria-label="Digital Command Center Map">
                    <div className="command-map-frame">
                        <div className="map-badge-pill">
                            <Compass size={18} color="#00C8CC" />
                            <span>OUR DIGITAL COMMAND CENTER</span>
                        </div>
                    </div>
                </section>

                {/* ── 4. Technical Documentation CTA Section ── */}
                <section className="doc-cta-section" aria-labelledby="doc-cta-heading">
                    <div className="doc-cta-container">
                        <h2 id="doc-cta-heading" className="doc-cta-title">
                            Seeking Instant Technical Documentation?
                        </h2>
                        <p className="doc-cta-subtitle">
                            Access our knowledge base or developer portal for immediate specifications and integration guides.
                        </p>
                        <div className="doc-cta-buttons">
                            <a href="#docs" className="btn-doc-link">
                                <FileText size={18} /> Documentation
                            </a>
                            <a href="#portal" className="btn-doc-link">
                                <Code size={18} /> Developer Portal
                            </a>
                        </div>
                    </div>
                </section>

                {/* Consultation Schedule Modal */}
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Schedule an Enterprise Consultation</h3>
                                <button className="modal-close" onClick={() => setShowModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            {meetingStatus === 'success' ? (
                                <div className="form-status-alert success" style={{ margin: '1.5rem 0' }}>
                                    ✅ Consultation scheduled successfully! Check your inbox for calendar invites.
                                </div>
                            ) : (
                                <form onSubmit={handleMeetingSubmit} className="modal-form">
                                    <div className="form-group-item">
                                        <label>FULL NAME</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Jane Doe"
                                            value={meetingData.name}
                                            onChange={handleMeetingChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-item">
                                        <label>WORK EMAIL</label>
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
                                        <div className="form-group-item">
                                            <label>PREFERRED DATE</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={meetingData.date}
                                                onChange={handleMeetingChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group-item">
                                            <label>TIME SLOT</label>
                                            <input
                                                type="time"
                                                name="time"
                                                value={meetingData.time}
                                                onChange={handleMeetingChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group-item">
                                        <label>CONSULTATION TOPIC</label>
                                        <select
                                            name="topic"
                                            value={meetingData.topic}
                                            onChange={handleMeetingChange}
                                            required
                                        >
                                            <option value="">Select Primary Domain...</option>
                                            <option value="Enterprise Architecture">Enterprise Architecture</option>
                                            <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                                            <option value="Cloud & DevOps">Cloud &amp; DevOps Migration</option>
                                            <option value="Custom Engineering">Custom Software Engineering</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-initiate-connection" disabled={meetingStatus === 'sending'}>
                                        <span>{meetingStatus === 'sending' ? 'BOOKING...' : 'CONFIRM STRATEGY CALL'}</span>
                                        <ArrowUpRight size={18} />
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
