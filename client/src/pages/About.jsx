import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Rocket, Eye, Shield, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/About.css';

const TEAM_MEMBERS = [
    {
        id: 1,
        name: "Mathanamohan Madhunicka",
        role: "CO-FOUNDER / SOFTWARE ENGINEER",
        roleColor: "cyan-pill",
        bio: "Passionate about exploring new technologies, quick learner with a knack for innovation. Let's connect and innovate...",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 2,
        name: "Sivasothy Tharsi",
        role: "CO-FOUNDER / SOFTWARE ENGINEER",
        roleColor: "cyan-pill",
        bio: "Passionate about exploring new technologies, quick learner with a knack for innovation. Eager to contribute to dynamic...",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 3,
        name: "Sivasothy Tharsa",
        role: "CO-FOUNDER / SOFTWARE ENGINEER",
        roleColor: "cyan-pill",
        bio: "Exploring new technologies with a knack for innovation. Let's connect and innovate together for digital excellence.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 4,
        name: "Sukumar Anujan",
        role: "CO-FOUNDER / SOFTWARE ENGINEER",
        roleColor: "cyan-pill",
        bio: "Technical specialist focused on high-performance back-end systems and cloud architecture. Built for scale.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 5,
        name: "Sathakaran Thisenthan",
        role: "CO-FOUNDER / ELECTRONIC ENGINEER",
        roleColor: "cyan-pill",
        bio: "Bridging the gap between hardware and software through innovative electronic engineering solutions.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 6,
        name: "Tharshan Selvarasa",
        role: "FRONTEND DEVELOPER / UI/UX DESIGNER",
        roleColor: "blue-pill",
        bio: "Crafting seamless digital experiences through modern UI/UX design and bleeding-edge frontend development.",
        image: "/vortextsoft-3d-logo.png"
    }
];

const About = () => {
    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Driving Digital Transformation"
                description="Learn about Vortextsoft Pentra (Pvt) Ltd — our mission, vision, core values, and architects of innovation."
                path="/about"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Main Page Content ────────────────────────────────────────────── */}
            <main id="main-content" className="about-page-new">

                {/* ── 1. About Hero Section ── */}
                <section className="about-hero-new" aria-label="Driving Digital Transformation">
                    <div className="about-hero-container">
                        <div className="about-hero-left">
                            <div className="about-badge">
                                <span className="badge-dot"></span>
                                PRECISION ENGINEERING
                            </div>
                            <h1 className="about-headline">
                                Driving Digital<br />
                                <span className="highlight-cyan">Transformation</span>
                            </h1>
                            <p className="about-subtitle">
                                We are a collective force of top talents, experts, and visionaries from diverse fields, united by a passion for technology and innovation. Vortextsoft serves as the silent partner for high-performance enterprise operations globally.
                            </p>
                            <div className="about-hero-cta">
                                <Link to="/services" className="btn-about-primary">
                                    EXPLORE OUR SOLUTIONS <ArrowUpRight size={18} />
                                </Link>
                                <Link to="/case-studies" className="btn-about-secondary">
                                    VIEW CASE STUDIES
                                </Link>
                            </div>
                        </div>

                        {/* Right Orbital Radar Visual */}
                        <div className="about-hero-right" aria-hidden="true">
                            <div className="orbital-radar-box">
                                <div className="radar-circle circle-1"></div>
                                <div className="radar-circle circle-2"></div>
                                <div className="radar-circle circle-3"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Ethos / Our Philosophy Section ── */}
                <section className="ethos-section-new" aria-labelledby="ethos-heading">
                    <div className="ethos-container-new">
                        <div className="ethos-header-row">
                            <div>
                                <div className="section-tag-new">ETHOS</div>
                                <h2 id="ethos-heading" className="ethos-title-new">Our Philosophy</h2>
                            </div>
                            <p className="ethos-header-desc">
                                Rooted in technical excellence and human-centric design, we build software that isn't just functional, but transformative.
                            </p>
                        </div>

                        {/* 3 Philosophy Cards */}
                        <div className="philosophy-grid">
                            <div className="philosophy-card">
                                <div className="philosophy-icon-box">
                                    <Rocket size={22} color="#00C8CC" />
                                </div>
                                <h3>Our Mission</h3>
                                <p>To deliver intelligent, future-ready technology solutions that empower businesses to thrive in the digital age through precision engineering.</p>
                            </div>

                            <div className="philosophy-card">
                                <div className="philosophy-icon-box">
                                    <Eye size={22} color="#00C8CC" />
                                </div>
                                <h3>Our Vision</h3>
                                <p>To drive global innovation, efficiency, and digital growth through accessible and scalable software engineering that sets new industry standards.</p>
                            </div>

                            <div className="philosophy-card">
                                <div className="philosophy-icon-box">
                                    <Shield size={22} color="#00C8CC" />
                                </div>
                                <h3>Core Values</h3>
                                <ul className="values-list">
                                    <li><CheckCircle2 size={14} color="#00C8CC" /> Quality &amp; Excellence</li>
                                    <li><CheckCircle2 size={14} color="#00C8CC" /> Reliability &amp; Trust</li>
                                    <li><CheckCircle2 size={14} color="#00C8CC" /> Continuous Innovation</li>
                                    <li><CheckCircle2 size={14} color="#00C8CC" /> Customer-Centricity</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Architects of Innovation (OUR TEAM) ── */}
                <section className="team-section-new" aria-labelledby="team-heading">
                    <div className="team-container-new">
                        <div className="team-header-center">
                            <div className="section-tag-new center-tag">OUR TEAM</div>
                            <h2 id="team-heading" className="team-title-new">Architects of Innovation</h2>
                            <p className="team-subtitle-new">
                                Our professional experts. Our team is a collective force of top talents, experts, and visionaries from diverse fields.
                            </p>
                        </div>

                        <div className="team-grid-new">
                            {TEAM_MEMBERS.map(m => (
                                <div key={m.id} className="team-card-new">
                                    <div className="team-avatar-frame">
                                        <img src={m.image} alt={m.name} loading="lazy" />
                                    </div>
                                    <div className={`role-pill-new ${m.roleColor}`}>
                                        {m.role}
                                    </div>
                                    <h3 className="team-name-new">{m.name}</h3>
                                    <p className="team-bio-new">{m.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. Culture Section ("Collaborative Innovation is our DNA") ── */}
                <section className="dna-section-new" aria-labelledby="dna-heading">
                    <div className="dna-container-new">
                        <div className="dna-content-col">
                            <div className="section-tag-new">CULTURE</div>
                            <h2 id="dna-heading" className="dna-title-new">
                                Collaborative Innovation is our DNA
                            </h2>
                            <p className="dna-description">
                                At Vortextsoft, we've fostered an environment where unconventional thinking meets technical rigor. We believe that the best solutions arise when diverse perspectives are allowed to collide in a culture of radical transparency and trust.
                            </p>
                            <div className="dna-stats-grid">
                                <div className="dna-stat-item">
                                    <div className="stat-value">24/7</div>
                                    <div className="stat-label">GLOBAL SUPPORT OPERATIONS</div>
                                </div>
                                <div className="dna-stat-item">
                                    <div className="stat-value">100+</div>
                                    <div className="stat-label">ENTERPRISE PROJECTS DELIVERED</div>
                                </div>
                                <div className="dna-stat-item">
                                    <div className="stat-value">100%</div>
                                    <div className="stat-label">AGILE WORKFLOW ADOPTION</div>
                                </div>
                                <div className="dna-stat-item">
                                    <div className="stat-value">0%</div>
                                    <div className="stat-label">DEBT FROM LEGACY TECH</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Workstation Image */}
                        <div className="dna-image-col">
                            <div className="workstation-image-frame">
                                <img
                                    src="/corporate-team-formal.png"
                                    alt="Vortextsoft Collaborative Engineering Workspace"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. CTA Section ("Ready to define the next frontier?") ── */}
                <section className="about-cta-section" aria-labelledby="about-cta-heading">
                    <div className="about-cta-container">
                        <h2 id="about-cta-heading" className="about-cta-title">
                            Ready to define the next frontier?
                        </h2>
                        <p className="about-cta-subtitle">
                            Whether you're a potential partner or looking to join our elite team of engineers and visionaries, let's start a conversation that leads to the future.
                        </p>
                        <div className="about-cta-buttons">
                            <Link to="/careers" className="btn-about-cta-primary">
                                JOIN OUR TEAM
                            </Link>
                            <Link to="/contact" className="btn-about-cta-secondary">
                                CONTACT US
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default About;
