import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
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

    // Dynamic icon lookup
    const getIcon = (iconName, title) => {
        if (iconName) {
            const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
            const IconComponent = LucideIcons[formattedName] || LucideIcons[iconName];
            if (IconComponent) return <IconComponent />;
        }

        const t = title.toLowerCase();
        if (t.includes('web')) return <LucideIcons.Globe />;
        if (t.includes('ai') || t.includes('intelligence')) return <LucideIcons.Cpu />;
        if (t.includes('app')) return <LucideIcons.Layout />;
        if (t.includes('erp')) return <LucideIcons.Layers />;
        if (t.includes('quality') || t.includes('test')) return <LucideIcons.ShieldCheck />;
        return <LucideIcons.Code />;
    };

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Innovative Software Solutions"
                description="Vortextsoft delivers cutting-edge AI/ML, web, mobile, ERP and IoT software solutions. Empowering businesses with scalable, high-performance technology."
                path="/"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Page Content ──────────────────────────────────────────────────── */}
            <main id="main-content" className="home-page">

                {/* ── Hero Section ── */}
                <section className="hero-section" aria-label="Hero — Welcome to Vortextsoft">
                    <div className="container">
                        <div className="hero-content">
                            {/* ✅ Single H1 per page — primary SEO signal */}
                            <h1>Empower Your Business with Vortextsoft<span style={{ color: '#00C8CC' }}>.</span></h1>
                            <p className="hero-subtitle">
                                Delivering cutting-edge, scalable, and high-performance software solutions tailored to your business needs.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/contact" className="btn btn-primary" id="hero-cta-contact">Contact Us</Link>
                                <Link to="/services" className="btn btn-secondary" id="hero-cta-services">Our Services</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Trusted Partner / Partners Marquee ── */}
                <section className="section services-preview-section" aria-labelledby="trusted-partner-heading">
                    <div className="container">
                        <div className="section-header">
                            {/* ✅ H2 — secondary heading under the H1 */}
                            <h2 id="trusted-partner-heading">Your Trusted Tech Partner</h2>
                            <p>
                                Vortextsoft is a cutting-edge technology company specializing in AI/ML, mobile, web, and enterprise solutions. We combine technical expertise with business acumen to deliver solutions that drive growth, efficiency, and innovation.
                            </p>
                        </div>

                        {/* Partners Marquee */}
                        {partners.length > 0 && (
                            <div className="partners-marquee-container" aria-label="Our trusted partners">
                                <div className="partners-marquee">
                                    <div className="marquee-content">
                                        {partners.map((partner, index) => (
                                            <div key={index} className="partner-logo-item">
                                                <img
                                                    src={partner.logo}
                                                    alt={`${partner.name} — Vortextsoft partner`}
                                                    title={partner.name}
                                                    loading="lazy"
                                                    width="120"
                                                    height="48"
                                                />
                                            </div>
                                        ))}
                                        {/* Duplicate for infinite scroll effect */}
                                        {partners.map((partner, index) => (
                                            <div key={`dup-${index}`} className="partner-logo-item" aria-hidden="true">
                                                <img
                                                    src={partner.logo}
                                                    alt=""
                                                    title={partner.name}
                                                    loading="lazy"
                                                    width="120"
                                                    height="48"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Services Overview ── */}
                <section className="section services-preview-section" aria-labelledby="services-heading">
                    <div className="container">
                        <div className="section-header">
                            <h2 id="services-heading">Our Services</h2>
                            <p>Comprehensive technology solutions designed to transform your business</p>
                        </div>

                        <div className="services-grid">
                            {services.length === 0 ? (
                                <>
                                    <ServiceCard title="Custom Software Solutions"          icon={<LucideIcons.Code />}        description="Tailor-made software development to meet your unique business requirements and workflows." />
                                    <ServiceCard title="Web & Mobile Application Development" icon={<LucideIcons.Layout />}      description="Create responsive, user-friendly websites and powerful cross-platform mobile applications." />
                                    <ServiceCard title="AI, Machine Learning & Data Science" icon={<LucideIcons.Cpu />}          description="Intelligent AI and ML-driven solutions to automate processes and extract valuable insights from your data." />
                                    <ServiceCard title="Consulting & Virtual Reality Solutions" icon={<LucideIcons.Globe />}     description="Immersive AR/VR experiences that revolutionize training, marketing, and user engagement." />
                                    <ServiceCard title="IoT & Embedded Systems"              icon={<LucideIcons.Layers />}       description="Connect and automate devices and systems for real-time monitoring, control, and efficiency." />
                                    <ServiceCard title="Enterprise Resource Planning (ERP) Systems" icon={<LucideIcons.Layers />} description="Integrated ERP solutions to streamline and automate all your business operations." />
                                    <ServiceCard title="Quality Assurance & Testing"         icon={<LucideIcons.ShieldCheck />}  description="Ensure your software is secure, reliable, and performs flawlessly with our comprehensive QA services." />
                                    <ServiceCard title="DevOps, Deployment & Optimization"   icon={<LucideIcons.Code />}         description="Achieve optimized deployment, CI/CD automation, and infrastructure management for peak performance." />
                                </>
                            ) : (
                                services.map(s => (
                                    <ServiceCard key={s.id} title={s.title} icon={getIcon(s.icon, s.title)} description={s.description} />
                                ))
                            )}
                        </div>

                        <div className="center-btn">
                            <Link to="/services" className="btn btn-primary" id="home-view-all-services">View All Services <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </section>

                {/* ── Key Metrics ── */}
                <section className="section stats-section" aria-labelledby="stats-heading">
                    <h2 id="stats-heading" className="sr-only">Vortextsoft by the Numbers</h2>
                    <div className="container stats-grid">
                        <div className="stat-card">
                            <strong aria-label="15 or more projects completed">
                                <h3>15+</h3>
                            </strong>
                            <p>Projects Completed</p>
                        </div>
                        <div className="stat-card">
                            <strong aria-label="98 percent client satisfaction">
                                <h3>98%</h3>
                            </strong>
                            <p>Client Satisfaction</p>
                        </div>
                        <div className="stat-card">
                            <strong aria-label="2 or more years of experience">
                                <h3>2+</h3>
                            </strong>
                            <p>Years of Experience</p>
                        </div>
                        <div className="stat-card">
                            <strong aria-label="10 or more expert team members">
                                <h3>10+</h3>
                            </strong>
                            <p>Expert Team Members</p>
                        </div>
                    </div>
                </section>

                {/* ── CTA Section ── */}
                <section className="section cta-section" aria-labelledby="cta-heading">
                    <div className="container cta-content">
                        <h2 id="cta-heading">Ready to Start Your Project?</h2>
                        <p>Let's innovate together. Share your requirements and our team will get back to you shortly.</p>
                        <Link to="/contact" className="btn btn-primary btn-large" id="home-cta-get-in-touch">Get in Touch</Link>
                    </div>
                </section>

            </main>
        </>
    );
};

// ── Service Card Sub-component ────────────────────────────────────────────────
const ServiceCard = ({ title, icon, description }) => (
    <article className="service-card">
        <div className="service-icon" aria-hidden="true">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
    </article>
);

export default Home;
