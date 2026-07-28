import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Rocket, ThumbsUp, Calendar, Users, Cpu, Shield, Cloud, Terminal, Code, Layers, Globe } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Home.css';

const Home = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        api.getPartners().then(data => setPartners(data)).catch(err => console.log(err));
    }, []);

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Empower Your Business"
                description="Vortextsoft Pentra (Pvt) Ltd delivers cutting-edge, scalable, and high-performance enterprise software solutions tailored to your business needs."
                path="/"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Main Page Content ────────────────────────────────────────────── */}
            <main id="main-content" className="home-page-new">

                {/* ── 1. Hero Section ── */}
                <section className="hero-section-new" aria-label="Hero — Empower Your Business with Vortextsoft">
                    <div className="hero-container-new">
                        {/* Left Content Column */}
                        <div className="hero-left-content">
                            <div className="hero-badge">
                                <span className="badge-dot"></span>
                                NEXT-GEN ENTERPRISE SOLUTIONS
                            </div>
                            <h1 className="hero-headline">
                                Empower Your<br />
                                Business with<br />
                                <span className="highlight-cyan">Vortextsoft.</span>
                            </h1>
                            <p className="hero-description">
                                Delivering cutting-edge, scalable, and high-performance software solutions tailored to your business needs. We transform complex challenges into streamlined digital reality.
                            </p>
                            <div className="hero-cta-group">
                                <Link to="/contact" className="btn-hero-primary" id="hero-cta-consultation">
                                    SCHEDULE A CONSULTATION <ArrowUpRight size={18} />
                                </Link>
                                <Link to="/services" className="btn-hero-secondary" id="hero-cta-services">
                                    OUR SERVICES
                                </Link>
                            </div>
                        </div>

                        {/* Right Futuristic 3D Hologram Card */}
                        <div className="hero-right-visual">
                            <div className="hologram-card">
                                <div className="card-top-header">
                                    <span className="brand-tag">VORTEXTSOFT</span>
                                    <span className="status-dot"></span>
                                </div>
                                <div className="hologram-orb-container">
                                    <div className="hologram-orb"></div>
                                    <div className="hologram-ring ring-1"></div>
                                    <div className="hologram-ring ring-2"></div>
                                    <div className="particle-grid"></div>
                                </div>
                                <div className="card-bottom-status">
                                    ENTERPRISE INTELLIGENCE CORE | CONNECTIVITY STATUS ACTIVE
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Tech Stack Marquee Band ── */}
                <section className="tech-ticker-section" aria-label="Our Technology Stack">
                    <div className="tech-ticker-track">
                        <div className="tech-ticker-content">
                            <span className="ticker-item"><Terminal size={16} /> REACT.JS</span>
                            <span className="ticker-item"><Cloud size={16} /> AWS CLOUD</span>
                            <span className="ticker-item"><Layers size={16} /> NODE.JS</span>
                            <span className="ticker-item"><Code size={16} /> PYTHON</span>
                            <span className="ticker-item"><Cpu size={16} /> AI/ML</span>
                            <span className="ticker-item"><Shield size={16} /> CYBER SECURITY</span>
                            {/* Duplicated for seamless loop */}
                            <span className="ticker-item"><Terminal size={16} /> REACT.JS</span>
                            <span className="ticker-item"><Cloud size={16} /> AWS CLOUD</span>
                            <span className="ticker-item"><Layers size={16} /> NODE.JS</span>
                            <span className="ticker-item"><Code size={16} /> PYTHON</span>
                            <span className="ticker-item"><Cpu size={16} /> AI/ML</span>
                            <span className="ticker-item"><Shield size={16} /> CYBER SECURITY</span>
                        </div>
                    </div>
                </section>

                {/* ── 3. Metrics / Key Stats Section ── */}
                <section className="stats-section-new" aria-labelledby="stats-heading">
                    <h2 id="stats-heading" className="sr-only">Key Enterprise Metrics</h2>
                    <div className="stats-container-new">
                        {/* Stat Card 1 */}
                        <div className="stat-card-new">
                            <div className="stat-icon-wrapper">
                                <Rocket size={20} color="#00C8CC" />
                            </div>
                            <Rocket className="watermark-icon" size={80} />
                            <div className="stat-number">15</div>
                            <div className="stat-label">PROJECTS COMPLETED</div>
                            <div className="stat-underline"></div>
                        </div>

                        {/* Stat Card 2 */}
                        <div className="stat-card-new">
                            <div className="stat-icon-wrapper">
                                <ThumbsUp size={20} color="#00C8CC" />
                            </div>
                            <ThumbsUp className="watermark-icon" size={80} />
                            <div className="stat-number">98%</div>
                            <div className="stat-label">CLIENT SATISFACTION</div>
                            <div className="stat-underline"></div>
                        </div>

                        {/* Stat Card 3 */}
                        <div className="stat-card-new">
                            <div className="stat-icon-wrapper">
                                <Calendar size={20} color="#00C8CC" />
                            </div>
                            <Calendar className="watermark-icon" size={80} />
                            <div className="stat-number">2+</div>
                            <div className="stat-label">YEARS OF EXPERIENCE</div>
                            <div className="stat-underline"></div>
                        </div>

                        {/* Stat Card 4 */}
                        <div className="stat-card-new">
                            <div className="stat-icon-wrapper">
                                <Users size={20} color="#00C8CC" />
                            </div>
                            <Users className="watermark-icon" size={80} />
                            <div className="stat-number">10+</div>
                            <div className="stat-label">EXPERT TEAM MEMBERS</div>
                            <div className="stat-underline"></div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Featured Case Study Section ── */}
                <section className="featured-case-section" aria-labelledby="case-study-heading">
                    <div className="featured-case-container">
                        <div className="section-tag-new">SUCCESS STORIES</div>
                        <h2 id="case-study-heading" className="section-title-new">Featured Case Study</h2>

                        <div className="featured-case-card">
                            {/* Left Text Column */}
                            <div className="case-card-content">
                                <div className="case-tags">
                                    <span className="case-tag">UI/UX DESIGN</span>
                                    <span className="case-tag">ENTERPRISE SAAS</span>
                                </div>
                                <h3 className="case-title">ARTistryDesign Ecosystem</h3>
                                <p className="case-description">
                                    Developing a comprehensive design management platform for high-end architecture firms. Real-time collaboration, 3D visualization integration, and project tracking scaled for global operations.
                                </p>
                                <Link to="/case-studies" className="btn-view-case" id="home-featured-case-link">
                                    VIEW CASE STUDY <ArrowUpRight size={18} />
                                </Link>
                            </div>

                            {/* Right Image Mockups Column */}
                            <div className="case-card-visuals">
                                <div className="desktop-mockup-frame">
                                    <img
                                        src="/corporate-team-formal.png"
                                        alt="ARTistryDesign Ecosystem Dashboard Interface"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="tablet-mockup-frame">
                                    <img
                                        src="/casestudies-hero.png"
                                        alt="ARTistryDesign Tablet Interface"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. CTA Banner Section ("Ready to Start Your Project?") ── */}
                <section className="cta-banner-new" aria-labelledby="cta-banner-heading">
                    <div className="cta-banner-container">
                        <div className="section-tag-new center-tag">LET'S BUILD TOGETHER</div>
                        <h2 id="cta-banner-heading" className="cta-headline-new">Ready to Start Your Project?</h2>
                        <div className="cta-banner-buttons">
                            <Link to="/contact" className="btn-cta-primary" id="home-cta-get-in-touch">
                                Get in Touch
                            </Link>
                            <Link to="/case-studies" className="btn-cta-secondary" id="home-cta-view-work">
                                View Our Work
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Home;
