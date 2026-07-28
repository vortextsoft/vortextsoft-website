import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Rocket, Eye, Shield, CheckCircle2 } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/About.css';

const DEFAULT_TEAM_MEMBERS = [
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
    const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM_MEMBERS);

    useEffect(() => {
        api.getTeam()
            .then(data => {
                if (data && data.length > 0) {
                    const formatted = data.map((t, idx) => ({
                        id: t.id || idx,
                        name: t.name,
                        role: (t.role || "ENGINEER").toUpperCase(),
                        roleColor: "cyan-pill",
                        bio: t.shortDescription || "Passionate about exploring new technologies and software innovation.",
                        image: t.profileImage || "/vortextsoft-3d-logo.png"
                    }));
                    setTeamMembers(formatted);
                }
            })
            .catch(err => {
                console.log("Team fetch offline, using default team data:", err);
            });
    }, []);

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
                                <div className="radar-core-dot"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Ethos Section (Mission, Vision, Values) ── */}
                <section className="ethos-section-new" aria-labelledby="ethos-heading">
                    <div className="ethos-container-new">
                        <div className="ethos-header-content">
                            <div className="section-tag-new">ORGANIZATIONAL PHILOSOPHY</div>
                            <h2 id="ethos-heading" className="section-title-new">Our Ethos</h2>
                        </div>

                        <div className="ethos-cards-grid">
                            {/* Mission Card */}
                            <div className="ethos-card-new">
                                <div className="ethos-icon-box">
                                    <Rocket size={22} color="#00C8CC" />
                                </div>
                                <h3 className="ethos-card-title">Our Mission</h3>
                                <p className="ethos-card-desc">
                                    To deliver cutting-edge, scalable, and high-performance software solutions tailored to our clients' unique business needs. We aim to solve complex challenges with elegance and speed.
                                </p>
                            </div>

                            {/* Vision Card */}
                            <div className="ethos-card-new">
                                <div className="ethos-icon-box">
                                    <Eye size={22} color="#00C8CC" />
                                </div>
                                <h3 className="ethos-card-title">Our Vision</h3>
                                <p className="ethos-card-desc">
                                    To be the global leader in digital transformation, empowering businesses through innovation, reliability, and technical supremacy.
                                </p>
                            </div>

                            {/* Core Values Card */}
                            <div className="ethos-card-new">
                                <div className="ethos-icon-box">
                                    <Shield size={22} color="#00C8CC" />
                                </div>
                                <h3 className="ethos-card-title">Core Values</h3>
                                <p className="ethos-card-desc">
                                    Innovation, Excellence, Integrity, and Client-Centric Collaboration. We take pride in building long-term partnerships anchored in uncompromised code quality.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Team Section ("Architects of Innovation") ── */}
                <section className="team-section-new" aria-labelledby="team-heading">
                    <div className="team-container-new">
                        <div className="team-header-content">
                            <div className="section-tag-new">LEADERSHIP &amp; ENGINEERING</div>
                            <h2 id="team-heading" className="section-title-new">Architects of Innovation</h2>
                        </div>

                        <div className="team-cards-grid">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="team-member-card">
                                    <div className="team-member-img-frame">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="team-member-info">
                                        <h3 className="member-name">{member.name}</h3>
                                        <div className="member-role-badge">
                                            <span className={`role-pill ${member.roleColor}`}>{member.role}</span>
                                        </div>
                                        <p className="member-bio">{member.bio}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. Collaborative Innovation Section ── */}
                <section className="culture-stats-section" aria-label="Collaborative Culture & Metrics">
                    <div className="culture-stats-container">
                        <div className="culture-left-content">
                            <div className="section-tag-new">GLOBAL IMPACT</div>
                            <h2 className="culture-title-new">Collaborative Innovation</h2>
                            <p className="culture-desc-new">
                                We believe the strongest software is forged through diverse perspectives. Our remote-first engineering culture brings together specialists across AI, cloud architecture, and spatial computing to architect solutions that scale seamlessly.
                            </p>

                            <div className="culture-checklist-new">
                                <div className="culture-check-item">
                                    <div className="culture-check-box">
                                        <CheckCircle2 size={14} color="#00C8CC" />
                                    </div>
                                    <span>Agile Sprint Delivery &amp; Continuous Integration</span>
                                </div>
                                <div className="culture-check-item">
                                    <div className="culture-check-box">
                                        <CheckCircle2 size={14} color="#00C8CC" />
                                    </div>
                                    <span>Military-Grade Code Audits &amp; Data Encryption</span>
                                </div>
                                <div className="culture-check-item">
                                    <div className="culture-check-box">
                                        <CheckCircle2 size={14} color="#00C8CC" />
                                    </div>
                                    <span>24/7 Dedicated Enterprise Support &amp; Maintenance</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Stats Grid */}
                        <div className="culture-stats-grid">
                            <div className="culture-stat-box">
                                <div className="c-stat-number">15+</div>
                                <div className="c-stat-label">PROJECTS DELIVERED</div>
                            </div>
                            <div className="culture-stat-box">
                                <div className="c-stat-number">98%</div>
                                <div className="c-stat-label">CLIENT SATISFACTION</div>
                            </div>
                            <div className="culture-stat-box">
                                <div className="c-stat-number">2+</div>
                                <div className="c-stat-label">YEARS OF EXCELLENCE</div>
                            </div>
                            <div className="culture-stat-box">
                                <div className="c-stat-number">10+</div>
                                <div className="c-stat-label">EXPERT TEAM MEMBERS</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. Enterprise CTA Banner Section ── */}
                <section className="about-cta-section" aria-labelledby="about-cta-heading">
                    <div className="about-cta-container">
                        <h2 id="about-cta-heading" className="about-cta-title">
                            Ready to Build Something Extraordinary?
                        </h2>
                        <p className="about-cta-subtitle">
                            Partner with Vortextsoft to transform your digital strategy into high-performance software engineering.
                        </p>
                        <div className="about-cta-buttons">
                            <Link to="/contact" className="btn-about-cta-primary" id="about-cta-contact">
                                Get in Touch
                            </Link>
                            <Link to="/case-studies" className="btn-about-cta-secondary" id="about-cta-work">
                                View Our Work
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default About;
