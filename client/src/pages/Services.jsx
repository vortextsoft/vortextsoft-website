import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowUpRight,
    Terminal,
    Cpu,
    Box,
    Cloud,
    Wifi,
    Layout,
    Layers,
    ShieldCheck,
    Download,
    Calendar,
    Quote
} from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Services.css';

const DEFAULT_SERVICES = [
    {
        id: 1,
        title: "Custom Software",
        iconName: "Terminal",
        description: "Bespoke architecture designed to solve unique organizational bottlenecks with absolute code efficiency."
    },
    {
        id: 2,
        title: "AI & Data Science",
        iconName: "Cpu",
        description: "Predictive modeling and neural network integration to transform raw data into executable intelligence."
    },
    {
        id: 3,
        title: "AR/VR Solutions",
        iconName: "Box",
        description: "Immersive enterprise training and visualization tools built on high-fidelity spatial computing frameworks."
    },
    {
        id: 4,
        title: "DevOps & Cloud",
        iconName: "Cloud",
        description: "Auto-scaling infrastructure and CI/CD pipelines that guarantee 99.9% availability across global regions."
    },
    {
        id: 5,
        title: "IoT & Embedded",
        iconName: "Wifi",
        description: "Real-time edge computing and sensor integration for industrial automation and smart logistics."
    },
    {
        id: 6,
        title: "Web & Mobile",
        iconName: "Layout",
        description: "Progressive cross-platform applications with fluid UI/UX and zero-latency backend synchronization."
    },
    {
        id: 7,
        title: "Enterprise ERP",
        iconName: "Layers",
        description: "Consolidated resource planning modules that unify finance, supply chain, and HR operations."
    },
    {
        id: 8,
        title: "QA & Testing",
        iconName: "ShieldCheck",
        description: "Rigorous automated testing and security auditing ensuring military-grade software stability."
    }
];

const renderIcon = (name) => {
    switch (name) {
        case 'Cpu': return <Cpu size={22} color="#00C8CC" />;
        case 'Box': return <Box size={22} color="#00C8CC" />;
        case 'Cloud': return <Cloud size={22} color="#00C8CC" />;
        case 'Wifi': return <Wifi size={22} color="#00C8CC" />;
        case 'Layout': return <Layout size={22} color="#00C8CC" />;
        case 'Layers': return <Layers size={22} color="#00C8CC" />;
        case 'ShieldCheck': return <ShieldCheck size={22} color="#00C8CC" />;
        default: return <Terminal size={22} color="#00C8CC" />;
    }
};

const Services = () => {
    const [services, setServices] = useState(DEFAULT_SERVICES);

    useEffect(() => {
        api.getServices()
            .then(data => {
                if (data && data.length > 0) {
                    setServices(data);
                }
            })
            .catch(err => {
                console.log("Database fetch offline, using default services data:", err);
            });
    }, []);

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Comprehensive Tech Solutions"
                description="Explore Vortextsoft Pentra (Pvt) Ltd's precision-engineered software services: Custom Software, AI & Data Science, AR/VR, DevOps, IoT, ERP, and QA Testing."
                path="/services"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Page Wrapper ─────────────────────────────────────────────────── */}
            <main id="main-content" className="services-page-new">

                {/* ── 1. Services Hero Section ── */}
                <section className="services-hero-new" aria-label="Services — Comprehensive Tech Solutions">
                    <div className="services-hero-container">
                        <div className="services-hero-badge">
                            <span className="badge-dot"></span>
                            ENTERPRISE GRADE INFRASTRUCTURE
                        </div>
                        <h1 className="services-hero-title">
                            Comprehensive <span className="title-italic-cyan">Tech Solutions</span>
                        </h1>
                        <p className="services-hero-subtitle">
                            We build precision-engineered software ecosystems designed for high-performance operations. From deep-learning integration to global cloud orchestration, Vortextsoft is your silent partner in technological dominance.
                        </p>
                        <div className="services-hero-buttons">
                            <a href="#core-services" className="btn-services-primary">
                                EXPLORE ECOSYSTEMS <ArrowUpRight size={18} />
                            </a>
                            <Link to="/case-studies" className="btn-services-secondary">
                                VIEW CASE STUDIES
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ── 2. Core 8 Services Grid ── */}
                <section id="core-services" className="services-grid-section" aria-label="Core Engineering Services">
                    <div className="services-grid-container">
                        {services.map((item) => (
                            <div key={item.id} className="service-card-new">
                                <div className="service-card-icon-box">
                                    {renderIcon(item.iconName || item.icon)}
                                </div>
                                <h3 className="service-card-title">{item.title}</h3>
                                <p className="service-card-desc">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 3. Performance Audit Section ("Precision by the Numbers") ── */}
                <section className="audit-section-new" aria-labelledby="audit-heading">
                    <div className="audit-container-new">
                        <div className="audit-header-content">
                            <div className="section-tag-new">PERFORMANCE AUDIT</div>
                            <h2 id="audit-heading" className="section-title-new">Precision by the Numbers</h2>
                        </div>

                        <div className="audit-stats-grid">
                            {/* Audit Item 1 */}
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">99%</div>
                                <div className="audit-stat-label">PLATFORM UPTIME</div>
                            </div>
                            {/* Audit Item 2 */}
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">12k+</div>
                                <div className="audit-stat-label">GLOBAL DEPLOYMENTS</div>
                            </div>
                            {/* Audit Item 3 */}
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">
                                    45<span className="unit-ms">MS</span>
                                </div>
                                <div className="audit-stat-label">AVG LATENCY</div>
                            </div>
                            {/* Audit Item 4 */}
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">14x</div>
                                <div className="audit-stat-label">ROI MULTIPLIER</div>
                            </div>
                        </div>

                        {/* Radar Background Visual */}
                        <div className="radar-circles-backdrop" aria-hidden="true">
                            <div className="radar-ring ring-a"></div>
                            <div className="radar-ring ring-b"></div>
                            <div className="radar-ring ring-c"></div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Client Testimonial / Executive Quote ── */}
                <section className="testimonial-section-new" aria-label="Executive Testimonial">
                    <div className="testimonial-container-new">
                        <div className="testimonial-card-new">
                            <div className="testimonial-image-col">
                                <img
                                    src="/corporate-team-formal.png"
                                    alt="Client Executive Leader"
                                    loading="lazy"
                                />
                            </div>
                            <div className="testimonial-content-col">
                                <Quote size={40} className="quote-mark-icon" />
                                <blockquote className="testimonial-quote-text">
                                    "Vortextsoft re-architected our legacy data pipelines within 60 days. Our system throughput quadrupled while server overhead fell by 40%. Their engineering rigor is unmatched."
                                </blockquote>
                                <div className="testimonial-author-box">
                                    <div className="author-name">Director of Engineering</div>
                                    <div className="author-company">GLOBAL LOGISTICS CORP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. Enterprise CTA Banner Section ── */}
                <section className="services-cta-section-new" aria-labelledby="services-cta-heading">
                    <div className="services-cta-container">
                        <h2 id="services-cta-heading" className="services-cta-title">
                            Ready to synchronize your enterprise operations?
                        </h2>
                        <p className="services-cta-subtitle">
                            Connect with our principal architects for a technical discovery session. We build systems that define markets.
                        </p>
                        <div className="services-cta-buttons">
                            <Link to="/contact" className="btn-services-cta-primary" id="services-cta-consultation">
                                SCHEDULE A CONSULTATION
                            </Link>
                            <a href="#core-services" className="btn-services-cta-secondary" id="services-cta-tech-stack">
                                <Download size={16} /> DOWNLOAD TECH STACK
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Services;
