import React, { useState } from 'react';
import { api } from '../api';
import '../styles/Contact.css';
import { Mail, MapPin, Phone, X } from 'lucide-react';

import ParticleBackground from '../components/ParticleBackground';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', message: ''
    });
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    return (
        <div className="page-container">
            {/* Contact Hero */}
            <section className="contact-hero">
                <ParticleBackground />
                <div className="container hero-content-center">
                    <h1>Get In Touch</h1>
                    <p>Let's innovate together. Share your requirements and our team will get back to you shortly.</p>
                    <button className="btn btn-primary btn-lg" onClick={() => setShowModal(true)}>
                        Schedule a Meeting
                    </button>
                </div>
            </section>

            <div className="container section contact-container">
                <div className="contact-info">
                    <h2>Contact Information</h2>
                    <p>Reach out to us through any of these channels.</p>

                    <div className="info-item">
                        <Mail className="info-icon" />
                        <div>
                            <h4>Email Us</h4>
                            <p><a href="mailto:vortextsoft.info@gmail.com">vortextsoft.info@gmail.com</a></p>
                        </div>
                    </div>

                    <div className="info-item">
                        <Phone className="info-icon" />
                        <div>
                            <h4>Call Us</h4>
                            <p>0786620583</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <MapPin className="info-icon" />
                        <div>
                            <h4>Location</h4>
                            <p>Colombo, Sri Lanka</p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <h2>Send a Message</h2>
                    {status === 'success' ? (
                        <div className="success-box">
                            <h3>Thank You!</h3>
                            <p>Your message has been sent successfully. We will contact you soon.</p>
                            <button className="btn btn-secondary" onClick={() => setStatus(null)}>Send Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange} />
                            </div>
                            <div className="form-group full-width">
                                <label>Message</label>
                                <textarea required name="message" rows="5" value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group full-width">
                                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                            {status === 'error' && <p className="error-text">Failed to send message. Please try again.</p>}
                        </form>
                    )}
                </div>
            </div>

            {/* Meeting Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                            <X size={24} />
                        </button>
                        <h2>Schedule a Meeting</h2>
                        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>Pick a time that works for you.</p>
                        <MeetingForm onSuccess={() => setTimeout(() => setShowModal(false), 2000)} />
                    </div>
                </div>
            )}
        </div>
    );
};

const MeetingForm = ({ onSuccess }) => {
    const [data, setData] = useState({ name: '', email: '', date: '', time: '', topic: 'General Inquiry', reason: '' });
    const [status, setStatus] = useState(null);
    const [wordCount, setWordCount] = useState(0);

    const handleReasonChange = (e) => {
        const text = e.target.value;
        const words = text.trim().split(/\s+/);
        // Handle empty string case where split returns [''] with length 1
        const count = text.trim() === '' ? 0 : words.length;

        if (count <= 200) {
            setData({ ...data, reason: text });
            setWordCount(count);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.scheduleMeeting(data);
            setStatus('success');
            setData({ name: '', email: '', date: '', time: '', topic: 'General Inquiry', reason: '' });
            setWordCount(0);
            if (onSuccess) onSuccess();
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="success-box" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3>Request Received!</h3>
                <p>We are reviewing your request at the moment. We will contact you via email.</p>
                <button className="btn btn-secondary" onClick={() => setStatus(null)}>Schedule Another</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="form-group">
                <label>Name</label>
                <input required type="text" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input required type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input required type="date" value={data.date} onChange={e => setData({ ...data, date: e.target.value })} />
            </div>
            <div className="form-group">
                <label>Time</label>
                <input required type="time" value={data.time} onChange={e => setData({ ...data, time: e.target.value })} />
            </div>
            <div className="form-group full-width">
                <label>Topic</label>
                <select value={data.topic} onChange={e => setData({ ...data, topic: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <option>General Inquiry</option>
                    <option>Project Discussion</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Career</option>
                </select>
            </div>
            <div className="form-group full-width">
                <label>Reason (Optional)</label>
                <textarea
                    rows="3"
                    value={data.reason}
                    onChange={handleReasonChange}
                    placeholder="Briefly describe the purpose of the meeting..."
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.8rem', color: wordCount >= 200 ? 'red' : '#666', marginTop: '0.2rem' }}>
                    {wordCount}/200 words
                </div>
            </div>
            <div className="form-group full-width" style={{ textAlign: 'center' }}>
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Scheduling...' : 'Request Meeting'}
                </button>
            </div>
            {status === 'error' && <p className="error-text">Failed to schedule. Please try again.</p>}
        </form>
    );
};

export default Contact;
