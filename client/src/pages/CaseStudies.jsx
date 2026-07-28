import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/CaseStudies.css';

const CATEGORIES = ['ALL', 'WEBSITE', 'MOBILE', 'ENTERPRISE'];

const DEFAULT_SECONDARY_PROJECTS = [
    {
        id: 'cloud-sync',
        title: 'CloudSync Enterprise',
        category: 'ENTERPRISE',
        description: 'Optimizing global multi-region cloud infrastructure for high-traffic financial platforms.',
        image: '/casestudies-hero.png',
        tags: ['#AWS', '#DevOps']
    },
    {
        id: 'ecogrid-ai',
        title: 'EcoGrid AI',
        category: 'MOBILE',
        description: 'Machine learning models for predictive maintenance of national renewable energy grids.',
        image: '/careers-hero-abstract.png',
        tags: ['#Python', '#TensorFlow']
    }
];

const CaseStudies = () => {
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [projects, setProjects] = useState(DEFAULT_SECONDARY_PROJECTS);

    useEffect(() => {
        api.getCaseStudies()
            .then(data => {
                if (data && data.length > 0) {
                    setProjects(data);
                }
            })
            .catch(err => {
                console.log("Case studies fetch offline, using default projects:", err);
            });
    }, []);

    const filteredProjects = activeCategory === 'ALL'
        ? projects
        : projects.filter(p => (p.category || 'ENTERPRISE').toUpperCase() === activeCategory);

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Success Stories & Case Studies"
                description="Explore Vortextsoft Pentra (Pvt) Ltd's portfolio of enterprise case studies: ARTistryDesign Ecosystem, CloudSync Enterprise, and EcoGrid AI."
                path="/case-studies"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Page Content ─────────────────────────────────────────────────── */}
            <main id="main-content" className="casestudies-page-new">

                {/* ── 1. Hero Section ── */}
                <section className="casestudies-hero-new" aria-label="Portfolio & Outcomes">
                    <div className="casestudies-hero-container">
                        <div className="hero-left-col">
                            <div className="casestudies-badge">
                                <span className="badge-dot"></span>
                                PORTFOLIO & OUTCOMES
                            </div>
                            <h1 className="casestudies-headline">
                                Success Stories:<br />
                                <span className="highlight-cyan">Real Results,</span><br />
                                Real Impact.
                            </h1>
                            <p className="casestudies-subtitle">
                                From architecture to finance, we engineer custom digital solutions that redefine industry standards and drive measurable growth for enterprise partners.
                            </p>
                        </div>

                        {/* Right Sparkle Card */}
                        <div className="hero-right-col">
                            <div className="sparkle-card-box">
                                <div className="sparkle-icon-wrapper">
                                    <Sparkles size={32} color="#010409" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Category Filter Bar ── */}
                <section className="filter-bar-section" aria-label="Project Filter Categories">
                    <div className="filter-bar-container">
                        <div className="filter-tabs">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    [{cat}]
                                </button>
                            ))}
                        </div>
                        <div className="filter-count">
                            <Filter size={14} style={{ marginRight: '6px' }} />
                            FILTERING {filteredProjects.length} PROJECTS
                        </div>
                    </div>
                </section>

                {/* ── 3. Featured Case Study Card (#042 ARTistryDesign) ── */}
                <section className="featured-project-section" aria-labelledby="featured-project-heading">
                    <div className="featured-project-container">
                        <div className="project-card-featured">
                            {/* Left Text Column */}
                            <div className="featured-left-col">
                                <div className="project-number-badge">#042 // FEATURED SYSTEM</div>
                                <h2 id="featured-project-heading" className="featured-project-title">
                                    ARTistryDesign Ecosystem
                                </h2>
                                <p className="featured-project-desc">
                                    A comprehensive design management and 3D visualization platform engineered for high-end global architecture firms. Integrates real-time cloud collaboration, BIM data parsing, and automated asset rendering.
                                </p>

                                <div className="checklist-grid">
                                    <div className="checklist-item">
                                        <div className="check-box-icon">
                                            <CheckCircle2 size={14} color="#00C8CC" />
                                        </div>
                                        <span>Real-time Multi-user 3D Viewport Synchronization</span>
                                    </div>
                                    <div className="checklist-item">
                                        <div className="check-box-icon">
                                            <CheckCircle2 size={14} color="#00C8CC" />
                                        </div>
                                        <span>Automated WebGL Shader Pipeline Optimization</span>
                                    </div>
                                    <div className="checklist-item">
                                        <div className="check-box-icon">
                                            <CheckCircle2 size={14} color="#00C8CC" />
                                        </div>
                                        <span>Enterprise Role-based Permissions & Audit Logs</span>
                                    </div>
                                </div>

                                <div className="tech-badges-row">
                                    <span className="tech-badge">REACT.JS</span>
                                    <span className="tech-badge">THREE.JS</span>
                                    <span className="tech-badge">NODE.JS</span>
                                    <span className="tech-badge">AWS</span>
                                </div>

                                <Link to="/contact" className="btn-explore-case" id="casestudies-featured-cta">
                                    VIEW CASE STUDY <ArrowUpRight size={18} />
                                </Link>
                            </div>

                            {/* Right Image Visuals Column */}
                            <div className="featured-right-col">
                                <img
                                    className="mockup-desktop-img"
                                    src="/corporate-team-formal.png"
                                    alt="ARTistryDesign Desktop Dashboard Interface"
                                    loading="lazy"
                                />
                                <div className="mockup-tablet-frame">
                                    <img
                                        className="mockup-tablet-img"
                                        src="/casestudies-hero.png"
                                        alt="ARTistryDesign Tablet Interface"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Secondary Projects Grid ── */}
                <section className="secondary-projects-section" aria-label="Secondary Project Case Studies">
                    <div className="secondary-projects-container">
                        {filteredProjects.map((project, index) => (
                            <div key={project.id || index} className="project-card-secondary">
                                <div className="secondary-card-header">
                                    <div className="secondary-number">#{String(index + 40).padStart(3, '0')} // PROJECT</div>
                                    <h3 className="secondary-title">{project.title}</h3>
                                    <p className="secondary-desc">{project.description}</p>
                                </div>
                                <div className="tech-badges-row">
                                    {(project.tags || []).map(t => (
                                        <span key={t} className="tech-badge">{t}</span>
                                    ))}
                                </div>
                                <Link to="/contact" className="btn-secondary-case">
                                    EXPLORE <ArrowUpRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 5. Enterprise CTA Banner Section ── */}
                <section className="casestudies-cta-section" aria-labelledby="cs-cta-heading">
                    <div className="casestudies-cta-container">
                        <h2 id="cs-cta-heading" className="casestudies-cta-title">
                            Have a Project in Mind?
                        </h2>
                        <p className="casestudies-cta-subtitle">
                            Let's build software that drives real business metrics. Our senior engineering team is ready to analyze your codebase or blueprint your new platform.
                        </p>
                        <div className="casestudies-cta-buttons">
                            <Link to="/contact" className="btn-cta-primary-pill" id="cs-cta-get-in-touch">
                                Get in Touch
                            </Link>
                            <Link to="/contact" className="btn-cta-secondary-pill" id="cs-cta-schedule">
                                Schedule Consultation
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default CaseStudies;
