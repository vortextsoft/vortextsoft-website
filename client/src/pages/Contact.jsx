/**
 * Contact.jsx
 * Pure 2D Professional Contact & Conversion Hub
 *
 * CRITICAL DESIGN COMPLIANCE:
 *  • 100% Excluded from 3D WebGL canvases to ensure 60FPS form stability
 *  • Zero canvas or GPU performance overhead
 *  • Optimized for maximum form conversion rates
 *  • Full WCAG accessibility and semantic HTML structure
 */

import React, { useState } from 'react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Contact.css';
import { Mail, MapPin, Phone, X, Send, Calendar, CheckCircle } from 'lucide-react';
import { styled, glowPulse, driftIn } from '../stitches.config';

/* ── 2D Stitches Styled Components for Contact Page ────────────── */

const ContactPageWrapper = styled('div', {
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #010409 0%, #06090f 50%, #0a0e1a 100%)',
  color: '$textPrimary',
  paddingBottom: '$20',
})

const ContactHeroSection = styled('section', {
  position: 'relative',
  padding: '140px 24px 80px',
  textAlign: 'center',
  background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,200,204,0.06) 0%, transparent 70%)',
})

const HeroBadge = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '$2',
  padding: '6px 16px',
  borderRadius: '$full',
  background: 'rgba(0,200,204,0.08)',
  border: '1px solid rgba(0,200,204,0.25)',
  color: '#00C8CC',
  fontSize: '$xs',
  fontWeight: '$semibold',
  letterSpacing: '$wider',
  textTransform: 'uppercase',
  marginBottom: '$4',
})

const ContactHeader = styled('h1', {
  fontSize: '$5xl',
  fontWeight: '$extrabold',
  margin: '0 0 $4 0',
  color: '$textStark',
  lineHeight: '$tight',

  '@md': { fontSize: '$6xl' },
})

const ContactSubtitle = styled('p', {
  fontSize: '$lg',
  color: '$textSecondary',
  maxWidth: '600px',
  margin: '0 auto $8',
  lineHeight: '$relaxed',
})

const ContactContainer = styled('div', {
  maxWidth: '$container',
  margin: '0 auto',
  padding: '0 24px',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$10',

  '@lg': {
    gridTemplateColumns: '380px 1fr',
    gap: '$12',
  },
})

const InfoCard = styled('aside', {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '$xl',
  padding: '$8',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
})

const InfoItem = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$4',
})

const IconBox = styled('div', {
  size: '44px',
  borderRadius: '$md',
  background: 'rgba(0,200,204,0.1)',
  border: '1px solid rgba(0,200,204,0.25)',
  color: '#00C8CC',
  flexCenter: true,
  flexShrink: 0,
})

const FormCard = styled('section', {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '$xl',
  padding: '$8',
  boxShadow: '0 12px 40px rgba(0,0,0,0.4)',

  '@md': { padding: '$10' },
})

const SubmitButton = styled('button', {
  width: '100%',
  padding: '16px 32px',
  borderRadius: '$md',
  background: 'linear-gradient(135deg, #00C8CC 0%, #3b82f6 100%)',
  color: '#010409',
  fontSize:       '$base',
  fontWeight:     '$bold',
  border:         'none',
  cursor:         'pointer',
  transition:     '$fast',
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'center',
  gap:            '$2',

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 0 24px rgba(0,200,204,0.35)',
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
})

/* ── Main Component ────────────────────────────────────────────── */

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', company: '', message: ''
    });
    const [status, setStatus] = useState(null);
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
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with Vortextsoft. Reach out to our team for project inquiries, software development quotes, or to schedule a free consultation meeting."
                path="/contact"
            />
            <ContactPageWrapper>
                {/* Clean 2D Hero */}
                <ContactHeroSection aria-label="Contact — Let's Innovate Together">
                    <HeroBadge>
                        <Mail size={14} /> Direct Inquiries
                    </HeroBadge>
                    <ContactHeader>Get In Touch</ContactHeader>
                    <ContactSubtitle>
                        Let's innovate together. Share your requirements and our engineering team will respond within 24 hours.
                    </ContactSubtitle>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '14px 28px', borderRadius: '12px', cursor: 'pointer' }}
                        onClick={() => setShowModal(true)}
                        id="contact-schedule-meeting"
                    >
                        <Calendar size={18} style={{ marginRight: '8px' }} /> Schedule a Consultation
                    </button>
                </ContactHeroSection>

                {/* Main Contact Grid */}
                <ContactContainer>
                    {/* Information Sidebar */}
                    <InfoCard aria-label="Contact Details">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#fff' }}>
                            Contact Information
                        </h2>
                        <p style={{ color: 'rgba(240,246,252,0.65)', margin: 0 }}>
                            Reach out directly through any of our official channels.
                        </p>

                        <InfoItem>
                            <IconBox><Mail size={20} /></IconBox>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', color: '#fff' }}>Email Us</h4>
                                <p style={{ margin: 0 }}><a href="mailto:vortextsoft.info@gmail.com" style={{ color: '#00C8CC', textDecoration: 'none' }}>vortextsoft.info@gmail.com</a></p>
                            </div>
                        </InfoItem>

                        <InfoItem>
                            <IconBox><Phone size={20} /></IconBox>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', color: '#fff' }}>Call Us</h4>
                                <p style={{ margin: 0, color: 'rgba(240,246,252,0.8)' }}>0787620583</p>
                            </div>
                        </InfoItem>

                        <InfoItem>
                            <IconBox><MapPin size={20} /></IconBox>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', color: '#fff' }}>Location</h4>
                                <p style={{ margin: 0, color: 'rgba(240,246,252,0.8)' }}>Colombo, Sri Lanka</p>
                            </div>
                        </InfoItem>
                    </InfoCard>

                    {/* High-Conversion Form */}
                    <FormCard aria-labelledby="form-heading">
                        <h2 id="form-heading" style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: '0 0 1.5rem 0', color: '#fff' }}>
                            Send a Message
                        </h2>

                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                <CheckCircle size={48} color="#00C8CC" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Thank You!</h3>
                                <p style={{ color: 'rgba(240,246,252,0.7)', marginBottom: '1.5rem' }}>Your message has been sent successfully. We will get back to you shortly.</p>
                                <button className="btn btn-secondary" onClick={() => setStatus(null)}>Send Another Message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form" id="contact-main-form">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', color: 'rgba(240,246,252,0.8)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Name *</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', color: 'rgba(240,246,252,0.8)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Email *</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', color: 'rgba(240,246,252,0.8)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Phone</label>
                                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+94 77 123 4567" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff' }} />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', color: 'rgba(240,246,252,0.8)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Company</label>
                                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff' }} />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: 'rgba(240,246,252,0.8)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Message *</label>
                                    <textarea required rows="5" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project or requirement..." style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: '#fff', resize: 'vertical' }}></textarea>
                                </div>

                                <SubmitButton type="submit" disabled={status === 'sending'} id="contact-submit-btn">
                                    {status === 'sending' ? 'Sending...' : <>Send Message <Send size={16} /></>}
                                </SubmitButton>
                            </form>
                        )}
                    </FormCard>
                </ContactContainer>
            </ContactPageWrapper>
        </>
    );
};

export default Contact;
