import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Sparkles, Filter, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/CaseStudies.css';

const CATEGORIES = ['ALL', 'WEBSITE', 'MOBILE', 'ENTERPRISE'];

const SECONDARY_PROJECTS = [
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

    const filteredProjects = activeCategory === 'ALL'
        ? SECONDARY_PROJECTS
        : SECONDARY_PROJECTS.filter(p => p.category === activeCategory);

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
                                    className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    [{cat}]
                                </button>
                            ))}
                        </div>
                        <div className="filter-count">
                            <Filter size={14} style={{ marginRight: '6px' }} />
                            FILTERING {activeCategory === 'ALL' ? '12' : filteredProjects.length} PROJECTS
                        </div>
                    </div>
                </section>

                {/* ── 3. Featured Case Study Card (#042 ARTistryDesign) ── */}
                <section className="featured-project-section" aria-labelledby="featured-project-heading">
                    <div className="featured-project-container">
                        <div className="featured-project-card">
                            {/* Left Image Mockup */}
                            <div className="project-image-box">
                                <img
                                    src="/about-hero-walking.png"
                                    alt="ARTistryDesign 3D Rendering Platform"
                                    loading="lazy"
                                />
                                <div className="image-badge-overlay">
                                    <Layers size={14} color="#00C8CC" />
                                    <span>3D Rendering Engaged</span>
                                </div>
                            </div>

                            {/* Right Project Details */}
                            <div className="project-details-box">
                                <div className="case-number-tag">—— CASE STUDY #042</div>
                                <h2 id="featured-project-heading" className="featured-project-title">
                                    ARTistryDesign
                                </h2>
                                <p className="featured-project-desc">
                                    A revolutionary interior design platform enabling customers to visualize decoration items with 3D models in their real space before purchasing, featuring precise placement and resizing.
                                </p>

                                {/* Checklist */}
                                <ul className="feature-checklist">
                                    <li>
                                        <CheckCircle2 size={16} color="#00C8CC" />
                                        <span>3D model placing of decoration items on the floor and wall with millimetric precision.</span>
                                    </li>
                                    <li>
                                        <CheckCircle2 size={16} color="#00C8CC" />
                                        <span>Model resizing, rotation, and texture switching for bespoke visualization.</span>
                                    </li>
                                    <li>
                                        <CheckCircle2 size={16} color="#00C8CC" />
                                        <span>User-friendly Admin panel for rapid 3D asset deployment and analytics tracking.</span>
                                    </li>
                                </ul>

                                {/* Tech Stack Tags */}
                                <div className="tech-stack-badges">
                                    <span className="tech-badge">[Three.js]</span>
                                    <span className="tech-badge">[WebGL]</span>
                                    <span className="tech-badge">[React]</span>
                                    <span className="tech-badge">[Node.js]</span>
                                </div>

                                <Link to="/contact" className="btn-view-project" id="casestudy-view-artistry">
                                    VIEW FULL PROJECT <ArrowUpRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. 2-Column Secondary Projects Grid ── */}
                <section className="secondary-projects-section" aria-label="More Case Studies">
                    <div className="secondary-projects-container">
                        {filteredProjects.map(project => (
                            <div key={project.id} className="secondary-project-card">
                                <div className="secondary-card-image">
                                    <img src={project.image} alt={project.title} loading="lazy" />
                                </div>
                                <div className="secondary-card-body">
                                    <h3 className="secondary-card-title">{project.title}</h3>
                                    <p className="secondary-card-desc">{project.description}</p>
                                    <div className="secondary-card-tags">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="secondary-tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 5. CTA Section ("Ready to Build Your Success Story?") ── */}
                <section className="casestudies-cta-section" aria-labelledby="casestudies-cta-heading">
                    <div className="casestudies-cta-container">
                        <h2 id="casestudies-cta-heading" className="casestudies-cta-title">
                            Ready to Build Your Success Story?
                        </h2>
                        <p className="casestudies-cta-subtitle">
                            Let's combine your industry expertise with our precision engineering to create something world-class.
                        </p>
                        <div className="casestudies-cta-buttons">
                            <Link to="/contact" className="btn-casestudies-cta-primary" id="casestudies-strategy-btn">
                                BOOK A STRATEGY CALL
                            </Link>
                            <Link to="/services" className="btn-casestudies-cta-secondary" id="casestudies-explore-services-btn">
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
