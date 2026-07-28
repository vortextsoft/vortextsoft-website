import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Terminal,
    Brain,
    Box,
    Cloud,
    Cpu,
    Smartphone,
    Layers,
    ShieldCheck,
    Download,
    Quote
} from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Services.css';

const DEFAULT_SERVICES = [
    {
        id: 1,
        title: "Custom Software",
        iconType: "terminal",
        description: "Bespoke architecture designed to solve unique organizational bottlenecks with absolute code efficiency."
    },
    {
        id: 2,
        title: "AI & Data Science",
        iconType: "brain",
        description: "Predictive modeling and neural network integration to transform raw data into executable intelligence."
    },
    {
        id: 3,
        title: "AR/VR Solutions",
        iconType: "box",
        description: "Immersive enterprise training and visualization tools built on high-fidelity spatial computing frameworks."
    },
    {
        id: 4,
        title: "DevOps & Cloud",
        iconType: "cloud",
        description: "Auto-scaling infrastructure and CI/CD pipelines that guarantee 99.9% availability across global regions."
    },
    {
        id: 5,
        title: "IoT & Embedded",
        iconType: "cpu",
        description: "Real-time edge computing and sensor integration for industrial automation and smart logistics."
    },
    {
        id: 6,
        title: "Web & Mobile",
        iconType: "smartphone",
        description: "Progressive cross-platform applications with fluid UI/UX and zero-latency backend synchronization."
    },
    {
        id: 7,
        title: "Enterprise ERP",
        iconType: "layers",
        description: "Consolidated resource planning modules that unify finance, supply chain, and HR operations."
    },
    {
        id: 8,
        title: "QA & Testing",
        iconType: "shieldCheck",
        description: "Rigorous automated testing and security auditing ensuring military-grade software stability."
    }
];

const renderIcon = (type) => {
    switch (type) {
        case 'brain': return <Brain size={28} color="#00C8CC" />;
        case 'box': return <Box size={28} color="#00C8CC" />;
        case 'cloud': return <Cloud size={28} color="#00C8CC" />;
        case 'cpu': return <Cpu size={28} color="#00C8CC" />;
        case 'smartphone': return <Smartphone size={28} color="#00C8CC" />;
        case 'layers': return <Layers size={28} color="#00C8CC" />;
        case 'shieldCheck': return <ShieldCheck size={28} color="#00C8CC" />;
        default: return <Terminal size={28} color="#00C8CC" />;
    }
};

const Services = () => {
    const [services, setServices] = useState(DEFAULT_SERVICES);

    useEffect(() => {
        api.getServices()
            .then(data => {
                if (data && data.length > 0) {
                    const formatted = data.map((s, idx) => ({
                        id: s.id || idx,
                        title: s.title,
                        iconType: s.icon || DEFAULT_SERVICES[idx % DEFAULT_SERVICES.length].iconType,
                        description: s.description || s.short_description || DEFAULT_SERVICES[idx % DEFAULT_SERVICES.length].description
                    }));
                    setServices(formatted);
                }
            })
            .catch(err => {
                console.log("Database fetch offline, using default services data:", err);
            });
    }, []);

    const handleDownloadTechStack = () => {
        alert("Downloading Vortextsoft Technical Architecture Stack Specification (PDF)...");
    };

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Enterprise Services & Tech Solutions"
                description="Comprehensive tech solutions by Vortextsoft Pentra (Pvt) Ltd: Custom Software, AI & Data Science, AR/VR, Cloud DevOps, IoT, Web & Mobile, ERP, and Security QA."
                path="/services"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Page Content ─────────────────────────────────────────────────── */}
            <main id="main-content" className="services-page-new">

                {/* ── 1. Hero Section ── */}
                <section className="services-hero-new" aria-label="Enterprise Grade Infrastructure">
                    <div className="services-hero-container">
                        <div className="hero-left-content">
                            <div className="hero-badge-row">
                                <div className="cyan-line-indicator"></div>
                                <span className="hero-badge-text">ENTERPRISE GRADE INFRASTRUCTURE</span>
                            </div>
                            <h1 className="services-headline">
                                Comprehensive <span className="highlight-cyan-italic">Tech Solutions</span>
                            </h1>
                            <p className="services-subtitle">
                                We build precision-engineered software ecosystems designed for high-performance operations. From deep-learning integration to global cloud orchestration, Vortextsoft is your silent partner in technological dominance.
                            </p>
                            <div className="hero-cta-buttons">
                                <a href="#service-grid" className="btn-explore-ecosystems">
                                    EXPLORE ECOSYSTEMS <ArrowRight size={18} />
                                </a>
                                <Link to="/case-studies" className="btn-view-cases-glass">
                                    VIEW CASE STUDIES
                                </Link>
                            </div>
                        </div>

                        {/* Right Vertical Branding Ribbon */}
                        <div className="hero-right-vertical-ribbon">
                            <span>SYSTEM INTEGRITY • DIGITAL EXCELLENCE • PRECISION CORE</span>
                        </div>
                    </div>
                </section>

                {/* ── 2. Service Grid (8 Cards) ── */}
                <section id="service-grid" className="service-grid-section" aria-label="Our 8 Core Enterprise Services">
                    <div className="service-grid-container">
                        {services.map((svc) => (
                            <div key={svc.id} className="service-card-item">
                                <div className="service-icon-box">
                                    {renderIcon(svc.iconType)}
                                </div>
                                <h3 className="service-card-title">{svc.title}</h3>
                                <p className="service-card-desc">{svc.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 3. Precision by the Numbers Section ── */}
                <section className="numbers-audit-section" aria-labelledby="numbers-heading">
                    <div className="numbers-radar-backdrop" aria-hidden="true">
                        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
                            <circle cx="200" cy="200" r="180" stroke="#00C8CC" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.3" />
                            <circle cx="200" cy="200" r="140" stroke="#00C8CC" strokeWidth="0.5" opacity="0.2" />
                            <circle cx="200" cy="200" r="100" stroke="#00C8CC" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
                        </svg>
                    </div>

                    <div className="numbers-audit-container">
                        <div className="numbers-header">
                            <div>
                                <span className="numbers-tag-label">PERFORMANCE AUDIT</span>
                                <h2 id="numbers-heading" className="numbers-title">Precision by the Numbers</h2>
                            </div>
                            <div className="header-divider-line"></div>
                        </div>

                        <div className="numbers-stats-grid">
                            <div className="number-stat-card">
                                <div className="stat-value-text">99%</div>
                                <div className="stat-label-text">PLATFORM UPTIME</div>
                            </div>
                            <div className="number-stat-card">
                                <div className="stat-value-text">12k+</div>
                                <div className="stat-label-text">GLOBAL DEPLOYMENTS</div>
                            </div>
                            <div className="number-stat-card">
                                <div className="stat-value-text">45<span className="unit-ms">ms</span></div>
                                <div className="stat-label-text">AVG LATENCY</div>
                            </div>
                            <div className="number-stat-card">
                                <div className="stat-value-text">14x</div>
                                <div className="stat-label-text">ROI MULTIPLIER</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Executive Testimonial Section ── */}
                <section className="testimonial-section-new" aria-labelledby="testimonial-quote">
                    <div className="testimonial-container-new">
                        <div className="testimonial-card-new">
                            <div className="testimonial-grid-new">
                                {/* Left Executive Image Side */}
                                <div className="executive-img-frame">
                                    <img
                                        src="/corporate-team-formal.png"
                                        alt="Director of Engineering, Global Logistics Corp"
                                        loading="lazy"
                                    />
                                    <div className="img-overlay-gradient"></div>
                                </div>

                                {/* Right Quote Side */}
                                <div className="quote-content-side">
                                    <div className="quote-icon-box">
                                        <Quote size={48} color="#00C8CC" />
                                    </div>
                                    <blockquote id="testimonial-quote" className="quote-text">
                                        "Vortextsoft didn't just build a software platform; they engineered a competitive advantage. Their precision-first approach to our logistics network reduced operational overhead by 32% within the first quarter."
                                    </blockquote>
                                    <div className="quote-author-info">
                                        <div className="author-title">Director of Engineering</div>
                                        <div className="author-company">GLOBAL LOGISTICS CORP</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. Enterprise CTA Banner Section ── */}
                <section className="services-cta-section" aria-labelledby="services-cta-heading">
                    <div className="services-cta-container">
                        <h2 id="services-cta-heading" className="services-cta-title">
                            Ready to synchronize your enterprise operations?
                        </h2>
                        <p className="services-cta-subtitle">
                            Join the elite circle of global enterprises leveraging Vortextsoft's precision-engineered solutions. Let's build your future, bit by bit.
                        </p>
                        <div className="services-cta-buttons">
                            <Link to="/contact" className="btn-cta-consultation">
                                SCHEDULE A CONSULTATION
                            </Link>
                            <button
                                className="btn-cta-download"
                                onClick={handleDownloadTechStack}
                            >
                                <Download size={18} /> DOWNLOAD TECH STACK
                            </button>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Services;
