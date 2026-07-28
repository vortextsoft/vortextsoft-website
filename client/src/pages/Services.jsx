import React from 'react';
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
import SEO from '../components/SEO';
import '../styles/Services.css';

const SERVICES_DATA = [
    {
        id: 1,
        title: "Custom Software",
        icon: <Terminal size={22} color="#00C8CC" />,
        description: "Bespoke architecture designed to solve unique organizational bottlenecks with absolute code efficiency."
    },
    {
        id: 2,
        title: "AI & Data Science",
        icon: <Cpu size={22} color="#00C8CC" />,
        description: "Predictive modeling and neural network integration to transform raw data into executable intelligence."
    },
    {
        id: 3,
        title: "AR/VR Solutions",
        icon: <Box size={22} color="#00C8CC" />,
        description: "Immersive enterprise training and visualization tools built on high-fidelity spatial computing frameworks."
    },
    {
        id: 4,
        title: "DevOps & Cloud",
        icon: <Cloud size={22} color="#00C8CC" />,
        description: "Auto-scaling infrastructure and CI/CD pipelines that guarantee 99.9% availability across global regions."
    },
    {
        id: 5,
        title: "IoT & Embedded",
        icon: <Wifi size={22} color="#00C8CC" />,
        description: "Real-time edge computing and sensor integration for industrial automation and smart logistics."
    },
    {
        id: 6,
        title: "Web & Mobile",
        icon: <Layout size={22} color="#00C8CC" />,
        description: "Progressive cross-platform applications with fluid UI/UX and zero-latency backend synchronization."
    },
    {
        id: 7,
        title: "Enterprise ERP",
        icon: <Layers size={22} color="#00C8CC" />,
        description: "Consolidated resource planning modules that unify finance, supply chain, and HR operations."
    },
    {
        id: 8,
        title: "QA & Testing",
        icon: <ShieldCheck size={22} color="#00C8CC" />,
        description: "Rigorous automated testing and security auditing ensuring military-grade software stability."
    }
];

const Services = () => {
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
                <section className="services-grid-section" id="core-services" aria-label="Core Engineering Services">
                    <div className="services-grid-container">
                        {SERVICES_DATA.map((s) => (
                            <div key={s.id} className="service-card-new">
                                <div className="service-card-icon-box">
                                    {s.icon}
                                </div>
                                <h3 className="service-card-title">{s.title}</h3>
                                <p className="service-card-desc">{s.description}</p>
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
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">99%</div>
                                <div className="audit-stat-label">PLATFORM UPTIME</div>
                            </div>
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">12k+</div>
                                <div className="audit-stat-label">GLOBAL DEPLOYMENTS</div>
                            </div>
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">45<span className="unit-ms">MS</span></div>
                                <div className="audit-stat-label">AVG LATENCY</div>
                            </div>
                            <div className="audit-stat-item">
                                <div className="audit-stat-value">14x</div>
                                <div className="audit-stat-label">ROI MULTIPLIER</div>
                            </div>
                        </div>

                        {/* Concentric radar circle decoration */}
                        <div className="radar-circles-backdrop" aria-hidden="true">
                            <div className="radar-ring ring-a"></div>
                            <div className="radar-ring ring-b"></div>
                            <div className="radar-ring ring-c"></div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Client Testimonial / Executive Quote ── */}
                <section className="testimonial-section-new" aria-label="Client Testimonial">
                    <div className="testimonial-container-new">
                        <div className="testimonial-card-new">
                            {/* Left Executive Portrait */}
                            <div className="testimonial-image-col">
                                <img
                                    src="/corporate-team-formal.png"
                                    alt="Director of Engineering, Global Logistics Corp"
                                    loading="lazy"
                                />
                            </div>

                            {/* Right Quote Content */}
                            <div className="testimonial-content-col">
                                <Quote className="quote-mark-icon" size={48} />
                                <blockquote className="testimonial-quote-text">
                                    "Vortextsoft didn't just build a software platform; they engineered a competitive advantage. Their precision-first approach to our logistics network reduced operational overhead by 32% within the first quarter."
                                </blockquote>
                                <div className="testimonial-author-box">
                                    <div className="author-name">Director of Engineering</div>
                                    <div className="author-company">GLOBAL LOGISTICS CORP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. CTA Section ("Ready to synchronize your enterprise operations?") ── */}
                <section className="services-cta-section-new" aria-labelledby="services-cta-heading">
                    <div className="services-cta-container">
                        <h2 id="services-cta-heading" className="services-cta-title">
                            Ready to synchronize your enterprise operations?
                        </h2>
                        <p className="services-cta-subtitle">
                            Join the elite circle of global enterprises leveraging Vortextsoft's precision-engineered solutions. Let's build your future, bit by bit.
                        </p>
                        <div className="services-cta-buttons">
                            <Link to="/contact" className="btn-services-cta-primary" id="services-cta-consultation">
                                SCHEDULE A CONSULTATION
                            </Link>
                            <Link to="/case-studies" className="btn-services-cta-secondary" id="services-cta-download">
                                <Download size={16} /> DOWNLOAD TECH STACK
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Services;
