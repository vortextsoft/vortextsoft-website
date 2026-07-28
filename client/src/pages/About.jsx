import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Eye, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/About.css';

const DEFAULT_TEAM_MEMBERS = [
    {
        id: 1,
        name: "Mathanamohan Madhunicka",
        role: "Co-founder / Software Engineer",
        bio: "Passionate about exploring new technologies, quick learner with a knack for innovation. Let's connect and innovate together!",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 2,
        name: "Sivasothy Tharsi",
        role: "Co-founder / Software Engineer",
        bio: "Passionate about exploring new technologies, quick learner with a knack for innovation. Eager to contribute to dynamic environments.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 3,
        name: "Sivasothy Tharsa",
        role: "Co-founder / Software Engineer",
        bio: "Exploring new technologies with a knack for innovation. Let's connect and innovate together for digital excellence.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 4,
        name: "Sukumar Anujan",
        role: "Co-founder / Software Engineer",
        bio: "Technical specialist focused on high-performance back-end systems and cloud architecture. Built for scale.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 5,
        name: "Sathakaran Thisenthan",
        role: "Co-founder / Electronic Engineer",
        bio: "Bridging the gap between hardware and software through innovative electronic engineering solutions.",
        image: "/vortextsoft-3d-logo.png"
    },
    {
        id: 6,
        name: "Tharshan Selvarasa",
        role: "Frontend Developer / UI UX Designer",
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
                        role: t.role || DEFAULT_TEAM_MEMBERS[idx % DEFAULT_TEAM_MEMBERS.length].role,
                        bio: t.shortDescription || t.bio || DEFAULT_TEAM_MEMBERS[idx % DEFAULT_TEAM_MEMBERS.length].bio,
                        image: t.profileImage || DEFAULT_TEAM_MEMBERS[idx % DEFAULT_TEAM_MEMBERS.length].image
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
                                <span className="highlight-gradient">Transformation</span>
                            </h1>
                            <p className="about-subtitle">
                                We are a collective force of top talents, experts, and visionaries from diverse fields, united by a passion for technology and innovation. Vortextsoft serves as the silent partner for high-performance enterprise operations globally.
                            </p>
                            <div className="about-hero-cta">
                                <Link to="/services" className="btn-about-primary">
                                    EXPLORE OUR SOLUTIONS <ArrowRight size={18} />
                                </Link>
                                <Link to="/case-studies" className="btn-about-secondary">
                                    VIEW CASE STUDIES
                                </Link>
                            </div>
                        </div>

                        {/* Right Abstract Data Visualization SVG Radar */}
                        <div className="about-hero-right" aria-hidden="true">
                            <div className="radar-visual-wrapper">
                                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" className="spinning-radar-svg">
                                    <circle cx="200" cy="200" r="190" stroke="#00C8CC" strokeDasharray="10 10" strokeWidth="0.5" opacity="0.3" />
                                    <circle cx="200" cy="200" r="150" stroke="#00C8CC" strokeWidth="1" opacity="0.4" />
                                    <circle cx="200" cy="200" r="100" stroke="#b6c4ff" strokeDasharray="5 15" strokeWidth="2" opacity="0.6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Ethos / Philosophy Section ── */}
                <section className="ethos-section-new" aria-labelledby="ethos-heading">
                    <div className="ethos-container-new">
                        <div className="ethos-top-header">
                            <div>
                                <span className="section-tag-new">ETHOS</span>
                                <h2 id="ethos-heading" className="ethos-title-new">Our Philosophy</h2>
                            </div>
                            <div className="ethos-header-line"></div>
                            <p className="ethos-header-desc">
                                Rooted in technical excellence and human-centric design, we build software that isn't just functional, but transformative.
                            </p>
                        </div>

                        <div className="ethos-cards-grid">
                            {/* Mission Card */}
                            <div className="ethos-card-new">
                                <div className="ethos-icon-box">
                                    <Rocket size={32} color="#00C8CC" />
                                </div>
                                <h3 className="ethos-card-title">Our Mission</h3>
                                <p className="ethos-card-desc">
                                    To deliver intelligent, future-ready technology solutions that empower businesses to thrive in the digital age through precision engineering.
                                </p>
                            </div>

                            {/* Vision Card */}
                            <div className="ethos-card-new">
                                <div className="ethos-icon-box">
                                    <Eye size={32} color="#00C8CC" />
                                </div>
                                <h3 className="ethos-card-title">Our Vision</h3>
                                <p className="ethos-card-desc">
                                    To drive global innovation, efficiency, and digital growth through accessible and scalable software engineering that sets new industry standards.
                                </p>
                            </div>

                            {/* Core Values Card */}
                            <div className="ethos-card-new">
                                <div className="ethos-icon-box">
                                    <ShieldCheck size={32} color="#00C8CC" />
                                </div>
                                <h3 className="ethos-card-title">Core Values</h3>
                                <ul className="values-checklist">
                                    <li><span className="bullet-dot"></span> Quality &amp; Excellence</li>
                                    <li><span className="bullet-dot"></span> Reliability &amp; Trust</li>
                                    <li><span className="bullet-dot"></span> Continuous Innovation</li>
                                    <li><span className="bullet-dot"></span> Customer-Centricity</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Leadership Team Section ("Architects of Innovation") ── */}
                <section className="team-section-new" aria-labelledby="team-heading">
                    <div className="team-container-new">
                        <div className="team-header-center">
                            <span className="section-tag-new center-tag">OUR TEAM</span>
                            <h2 id="team-heading" className="team-title-new">Architects of Innovation</h2>
                            <p className="team-subtitle-new">
                                Our professional experts. Our team is a collective force of top talents, experts, and visionaries from diverse fields.
                            </p>
                        </div>

                        <div className="team-grid-3col">
                            {teamMembers.map((member) => (
                                <div key={member.id} className="team-member-card-new">
                                    <div className="member-avatar-frame">
                                        <div className="avatar-glow-ring"></div>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            loading="lazy"
                                        />
                                        <div className="role-pill-badge">
                                            <span>{member.role}</span>
                                        </div>
                                    </div>
                                    <h4 className="member-name-new">{member.name}</h4>
                                    <p className="member-bio-new">"{member.bio}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. Culture & Innovation Section ── */}
                <section className="culture-dna-section" aria-label="Collaborative Innovation is our DNA">
                    <div className="culture-dna-container">
                        <div className="culture-dna-grid">
                            <div className="culture-dna-left">
                                <span className="section-tag-new">CULTURE</span>
                                <h2 className="dna-headline">Collaborative Innovation is our DNA</h2>
                                <p className="dna-description">
                                    At Vortextsoft, we've fostered an environment where unconventional thinking meets technical rigor. We believe that the best solutions arise when diverse perspectives are allowed to collide in a culture of radical transparency and trust.
                                </p>

                                <div className="dna-metrics-grid">
                                    <div className="dna-metric-box">
                                        <div className="metric-val">24/7</div>
                                        <div className="metric-lbl">GLOBAL SUPPORT OPERATIONS</div>
                                    </div>
                                    <div className="dna-metric-box">
                                        <div className="metric-val">100+</div>
                                        <div className="metric-lbl">ENTERPRISE PROJECTS DELIVERED</div>
                                    </div>
                                    <div className="dna-metric-box">
                                        <div className="metric-val">100%</div>
                                        <div className="metric-lbl">AGILE WORKFLOW ADOPTION</div>
                                    </div>
                                    <div className="dna-metric-box">
                                        <div className="metric-val">0%</div>
                                        <div className="metric-lbl">DEBT FROM LEGACY TECH</div>
                                    </div>
                                </div>
                            </div>

                            <div className="culture-dna-right">
                                <div className="workspace-img-card">
                                    <img
                                        src="/corporate-team-formal.png"
                                        alt="Vortextsoft High-tech Collaborative Workspace"
                                        loading="lazy"
                                    />
                                    <div className="workspace-overlay-gradient"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 5. Join Our Journey CTA Section ── */}
                <section className="about-cta-section-new" aria-labelledby="about-cta-heading">
                    <div className="about-cta-container-new">
                        <h2 id="about-cta-heading" className="about-cta-title-new">
                            Ready to define the<br />
                            <span className="highlight-cyan-italic">next frontier?</span>
                        </h2>
                        <p className="about-cta-subtitle-new">
                            Whether you're a potential partner or looking to join our elite team of engineers and visionaries, let's start a conversation that leads to the future.
                        </p>
                        <div className="about-cta-buttons-new">
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
