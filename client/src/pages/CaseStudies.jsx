import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Filter, TrendingUp, Cpu, Box, Sparkles, Layers } from 'lucide-react';
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
                                PORTFOLIO &amp; OUTCOMES
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

                        {/* Right Decorative Isometric Visual Box */}
                        <div className="hero-right-col">
                            <div className="insights-card-box">
                                <div className="insights-icon-wrapper">
                                    <TrendingUp size={36} color="#0B141C" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Category Filter & Navigation Bar ── */}
                <section className="filter-bar-section" aria-label="Project Filter Categories">
                    <div className="filter-bar-container">
                        <div className="filter-tabs-pills">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    [{cat}]
                                </button>
                            ))}
                        </div>

                        <div className="filter-meta-info">
                            <Filter size={14} color="rgba(186,201,204,0.6)" />
                            <span>FILTERING {filteredProjects.length + 1} PROJECTS</span>
                        </div>
                    </div>
                </section>

                {/* ── 3. Featured Case Study: ARTistryDesign ── */}
                <section className="featured-study-section" aria-labelledby="featured-study-heading">
                    <div className="featured-study-container">
                        <div className="featured-study-card-new">
                            <div className="featured-card-grid">
                                {/* Left Mockup Image Side */}
                                <div className="mockup-column">
                                    <div className="laptop-mockup-wrapper">
                                        <img
                                            src="/corporate-team-formal.png"
                                            alt="ARTistryDesign 3D Interior Design Workstation Platform"
                                            loading="lazy"
                                        />
                                    </div>
                                    {/* Floating 3D Rendering Badge */}
                                    <div className="floating-rendering-badge">
                                        <div className="badge-render-icon">
                                            <Box size={16} color="#00C8CC" />
                                        </div>
                                        <span>3D Rendering Engaged</span>
                                    </div>
                                </div>

                                {/* Right Content Description Side */}
                                <div className="content-column">
                                    <div className="req-number-row">
                                        <div className="cyan-line-indicator"></div>
                                        <span className="case-id-text">CASE STUDY #042</span>
                                    </div>
                                    <h2 id="featured-study-heading" className="study-title-new">
                                        ARTistryDesign
                                    </h2>
                                    <p className="study-description-new">
                                        A revolutionary interior design platform enabling customers to visualize decoration items with 3D models in their real space before purchasing, featuring precise placement and resizing.
                                    </p>

                                    <div className="study-checklist-new">
                                        <div className="check-item-new">
                                            <CheckCircle2 size={16} color="#00C8CC" />
                                            <span>3D model placing of decoration items on the floor and wall with millimetric precision.</span>
                                        </div>
                                        <div className="check-item-new">
                                            <CheckCircle2 size={16} color="#00C8CC" />
                                            <span>Model resizing, rotation, and texture switching for bespoke visualization.</span>
                                        </div>
                                        <div className="check-item-new">
                                            <CheckCircle2 size={16} color="#00C8CC" />
                                            <span>User-friendly Admin panel for rapid 3D asset deployment and analytics tracking.</span>
                                        </div>
                                    </div>

                                    <div className="tech-stack-group">
                                        <div className="tech-stack-label">TECH STACK</div>
                                        <div className="tech-pills-row">
                                            <span className="tech-pill">[Three.js]</span>
                                            <span className="tech-pill">[WebGL]</span>
                                            <span className="tech-pill">[React]</span>
                                            <span className="tech-pill">[Node.js]</span>
                                        </div>
                                    </div>

                                    <a href="#view-project" className="btn-view-full-project">
                                        VIEW FULL PROJECT <ArrowUpRight size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Secondary Projects Grid ── */}
                <section className="secondary-grid-section" aria-label="Secondary Enterprise Case Studies">
                    <div className="secondary-grid-container">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="secondary-project-card">
                                <div className="secondary-card-img-frame">
                                    <img
                                        src={project.image || '/casestudies-hero.png'}
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="secondary-card-body">
                                    <h3 className="sec-project-title">{project.title}</h3>
                                    <p className="sec-project-desc">{project.description}</p>
                                    <div className="sec-tags-row">
                                        {(project.tags || [project.category || '#ENTERPRISE']).map((t, idx) => (
                                            <span key={idx} className="sec-tag-pill">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 5. Strategy Call CTA Banner ── */}
                <section className="strategy-cta-section" aria-labelledby="strategy-cta-heading">
                    <div className="strategy-cta-container">
                        <h2 id="strategy-cta-heading" className="strategy-cta-title">
                            Ready to Build Your Success Story?
                        </h2>
                        <p className="strategy-cta-subtitle">
                            Let's combine your industry expertise with our precision engineering to create something world-class.
                        </p>
                        <div className="strategy-cta-buttons">
                            <Link to="/contact" className="btn-strategy-primary">
                                BOOK A STRATEGY CALL
                            </Link>
                            <Link to="/services" className="btn-strategy-secondary">
                                EXPLORE SERVICES
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default CaseStudies;
