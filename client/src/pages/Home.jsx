import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Cpu, Globe, Layout, Layers, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import '../styles/Home.css';

const Home = () => {
    const [services, setServices] = useState([]);
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        // Fetch Services (max 8)
        api.getServices().then(data => setServices(data.slice(0, 8))).catch(err => console.log(err));
        // Fetch All Partners
        api.getPartners().then(data => setPartners(data)).catch(err => console.log(err));
    }, []);

    // Hardcoded icons for demo purposes matching the service names
    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('web')) return <Globe />;
        if (t.includes('ai') || t.includes('intelligence')) return <Cpu />;
        if (t.includes('app')) return <Layout />;
        if (t.includes('erp')) return <Layers />;
        if (t.includes('quality') || t.includes('test')) return <ShieldCheck />;
        return <Code />;
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1>Empower Your Business with Vortextsoft<span style={{ color: '#00C8CC' }}>.</span></h1>
                        <p className="hero-subtitle">
                            Delivering cutting-edge, scalable, and high-performance software solutions tailored to your business needs.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                            <Link to="/services" className="btn btn-secondary">Our Services</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="section services-preview-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Your Trusted Tech Partner</h2>
                        <p>
                            Vortextsoft is a cutting-edge technology company specializing in AI/ML, mobile, web, and enterprise solutions. We combine technical expertise with business acumen to deliver solutions that drive growth, efficiency, and innovation.
                        </p>
                    </div>

                    {/* Partners Marquee */}
                    {partners.length > 0 && (
                        <div className="partners-marquee-container">
                            <div className="partners-marquee">
                                <div className="marquee-content">
                                    {partners.map((partner, index) => (
                                        <div key={index} className="partner-logo-item">
                                            <img src={partner.logo} alt={partner.name} title={partner.name} />
                                        </div>
                                    ))}
                                    {/* Duplicate for infinite scroll effect */}
                                    {partners.map((partner, index) => (
                                        <div key={`dup-${index}`} className="partner-logo-item">
                                            <img src={partner.logo} alt={partner.name} title={partner.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Services Overview */}
            <section className="section services-preview-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Services</h2>
                        <p>Comprehensive technology solutions designed to transform your business</p>
                    </div>

                    <div className="services-grid">
                        {services.length > 0 ? (
                            services.map(s => (
                                <ServiceCard key={s.id} title={s.title} icon={getIcon(s.title)} description={s.description} />
                            ))
                        ) : (
                            <div className="no-data">
                                <p>No services found. Please add them from the Admin Panel.</p>
                            </div>
                        )}
                    </div>

                    <div className="center-btn">
                        <Link to="/services" className="btn btn-primary">View All Services <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>

            {/* Metrics / Highlights */}
            <section className="section stats-section">
                <div className="container stats-grid">
                    <div className="stat-card">
                        <h3>500+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div className="stat-card">
                        <h3>98%</h3>
                        <p>Client Satisfaction</p>
                    </div>
                    <div className="stat-card">
                        <h3>10+</h3>
                        <p>Years of Experience</p>
                    </div>
                    <div className="stat-card">
                        <h3>50+</h3>
                        <p>Expert Team Members</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container cta-content">
                    <h2>Ready to Start Your Project?</h2>
                    <p>Let's innovate together. Share your requirements and our team will get back to you shortly.</p>
                    <Link to="/contact" className="btn btn-primary btn-large">Get in Touch</Link>
                </div>
            </section>
        </div>
    );
};

const ServiceCard = ({ title, icon, description }) => (
    <div className="service-card">
        <div className="service-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default Home;
