import React, { useState, useEffect } from 'react';
import {
    ArrowRight,
    Play,
    CheckCircle2,
    Cpu,
    TrendingUp,
    Users,
    Award,
    Search,
    Filter,
    Rocket,
    Shield,
    X,
    Briefcase,
    Zap,
    CreditCard
} from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Careers.css';

const DEFAULT_JOBS = [
    {
        id: 'job-1',
        title: 'Senior Full Stack Engineer',
        reqId: 'Requisition #24-0891',
        dept: 'CORE ENGINEERING',
        deptColor: 'dept-cyan',
        location: 'London / Remote',
        type: 'Full-time'
    },
    {
        id: 'job-2',
        title: 'AI Researcher (LLM Ops)',
        reqId: 'Requisition #24-0742',
        dept: 'VORTEXT LABS',
        deptColor: 'dept-purple',
        location: 'San Francisco',
        type: 'Contract'
    },
    {
        id: 'job-3',
        title: 'Cloud Architect (Azure/AWS)',
        reqId: 'Requisition #24-0912',
        dept: 'INFRASTRUCTURE',
        deptColor: 'dept-blue',
        location: 'Singapore',
        type: 'Full-time'
    },
    {
        id: 'job-4',
        title: 'Product Designer',
        reqId: 'Requisition #24-0888',
        dept: 'PRODUCT & DESIGN',
        deptColor: 'dept-dark',
        location: 'New York / Hybrid',
        type: 'Full-time'
    }
];

const Careers = () => {
    const [jobs, setJobs] = useState(DEFAULT_JOBS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [talentEmail, setTalentEmail] = useState('');
    const [talentSubmitted, setTalentSubmitted] = useState(false);

    useEffect(() => {
        api.getJobs()
            .then(data => {
                if (data && data.length > 0) {
                    const formatted = data.map((j, idx) => ({
                        id: j.id || `job-${idx}`,
                        title: j.title,
                        reqId: `Requisition #24-00${idx + 1}`,
                        dept: (j.department || 'ENGINEERING').toUpperCase(),
                        deptColor: 'dept-cyan',
                        location: j.location || 'Hybrid',
                        type: j.type || 'Full-time'
                    }));
                    setJobs(formatted);
                }
            })
            .catch(err => {
                console.log("Jobs fetch offline, using default jobs list:", err);
            });
    }, []);

    const filteredJobs = jobs.filter(j =>
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.dept.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleTalentSubmit = (e) => {
        e.preventDefault();
        if (talentEmail) {
            setTalentSubmitted(true);
            setTimeout(() => setTalentSubmitted(false), 5000);
            setTalentEmail('');
        }
    };

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Careers — Build the Future of Precision"
                description="Join Vortextsoft Pentra (Pvt) Ltd's global engineering team. Architecting the infrastructure of the next industrial revolution with competitive benefits and rapid growth."
                path="/careers"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Main Page Wrapper ────────────────────────────────────────────── */}
            <main id="main-content" className="careers-page-new">

                {/* ── 1. Hero Section ── */}
                <section className="careers-hero-new" aria-label="Global Engineering Team">
                    <div className="careers-hero-container">
                        <div className="hero-left-content">
                            <div className="careers-badge">
                                <span className="badge-dot"></span>
                                GLOBAL ENGINEERING TEAM
                            </div>
                            <h1 className="careers-headline">
                                Build the Future of<br />
                                <span className="highlight-cyan">Precision.</span>
                            </h1>
                            <p className="careers-subtitle">
                                Vortextsoft is where elite engineering meets enterprise scale. Join a team dedicated to architecting the infrastructure of the next industrial revolution.
                            </p>
                            <div className="hero-cta-buttons">
                                <a href="#open-positions" className="btn-careers-primary">
                                    VIEW OPENINGS <ArrowRight size={18} />
                                </a>
                                <a href="#ethos" className="btn-careers-secondary">
                                    OUR MISSION
                                </a>
                            </div>
                        </div>

                        {/* Right 2x2 Stats Glass Grid */}
                        <div className="hero-right-stats-grid">
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">94%</div>
                                <div className="careers-stat-lbl">RETENTION RATE</div>
                            </div>
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">12+</div>
                                <div className="careers-stat-lbl">GLOBAL HUBS</div>
                            </div>
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">400+</div>
                                <div className="careers-stat-lbl">ACTIVE PATENTS</div>
                            </div>
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">24/7</div>
                                <div className="careers-stat-lbl">RAPID DEPLOY</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Culture & Purpose Section ("Where Passion Meets Purpose") ── */}
                <section id="ethos" className="purpose-section-new" aria-labelledby="purpose-heading">
                    <div className="purpose-container-new">
                        <div className="section-tag-new center-tag">THE VORTEXT CULTURE</div>
                        <h2 id="purpose-heading" className="purpose-title center-title">
                            Where Passion Meets Purpose
                        </h2>
                        <div className="purple-divider-line"></div>

                        <div className="purpose-content-grid">
                            {/* Left Video Thumbnail Card */}
                            <div className="purpose-video-card">
                                <img
                                    src="/corporate-team-formal.png"
                                    alt="Vortextsoft Collaborative Engineering Culture"
                                    loading="lazy"
                                />
                                <div className="video-card-overlay"></div>
                                <div className="floating-story-badge">
                                    <div className="play-circle-btn">
                                        <Play size={20} color="#00C8CC" style={{ marginLeft: '3px' }} />
                                    </div>
                                    <span>WATCH OUR STORY</span>
                                </div>
                            </div>

                            {/* Right Pillars & Quote */}
                            <div className="purpose-right-details">
                                <blockquote className="culture-quote-italic">
                                    "At Vortextsoft, we don't just solve problems; we redefine what's possible in the enterprise landscape."
                                </blockquote>
                                <p className="culture-description-text">
                                    Our engineering culture is built on the pillars of radical transparency, extreme ownership, and continuous learning. We foster an environment where every voice matters—from our interns to our chief architects.
                                </p>

                                <div className="culture-pillars-list">
                                    <div className="pillar-item">
                                        <CheckCircle2 size={20} color="#00C8CC" className="pillar-icon" />
                                        <div>
                                            <h4 className="pillar-title">Asynchronous Mastery</h4>
                                            <p className="pillar-desc">Focus time is sacred. We minimize meetings and maximize deep work through robust documentation.</p>
                                        </div>
                                    </div>

                                    <div className="pillar-item">
                                        <CheckCircle2 size={20} color="#00C8CC" className="pillar-icon" />
                                        <div>
                                            <h4 className="pillar-title">Innovation Sprints</h4>
                                            <p className="pillar-desc">10% of your time dedicated to personal R&amp;D projects that could become our next flagship product.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Core Benefits Grid ("The Vortext Advantage") ── */}
                <section className="benefits-section-new" aria-labelledby="benefits-heading">
                    <div className="benefits-container-new">
                        <h2 id="benefits-heading" className="benefits-section-title">
                            The Vortext Advantage
                        </h2>

                        <div className="benefits-4cards-grid">
                            <div className="benefit-card-new">
                                <div className="benefit-icon-box">
                                    <Cpu size={24} color="#00C8CC" />
                                </div>
                                <h3 className="benefit-card-title">Cutting-Edge Tech</h3>
                                <p className="benefit-card-desc">Access the latest silicon and distributed computing paradigms months before they hit the general market.</p>
                            </div>

                            <div className="benefit-card-new">
                                <div className="benefit-icon-box">
                                    <TrendingUp size={24} color="#00C8CC" />
                                </div>
                                <h3 className="benefit-card-title">Growth Velocity</h3>
                                <p className="benefit-card-desc">Clear career paths and $5k annual learning stipends for certifications, conferences, and books.</p>
                            </div>

                            <div className="benefit-card-new">
                                <div className="benefit-icon-box">
                                    <Users size={24} color="#00C8CC" />
                                </div>
                                <h3 className="benefit-card-title">Inclusive Pulse</h3>
                                <p className="benefit-card-desc">A truly global workforce with active ERGs and a commitment to radical diversity in leadership.</p>
                            </div>

                            <div className="benefit-card-new">
                                <div className="benefit-icon-box">
                                    <CreditCard size={24} color="#00C8CC" />
                                </div>
                                <h3 className="benefit-card-title">Tier-1 Benefits</h3>
                                <p className="benefit-card-desc">Top-percentile equity packages, comprehensive health for you and yours, and flexible remote options.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Open Positions Table Section ── */}
                <section id="open-positions" className="positions-section-new" aria-labelledby="positions-heading">
                    <div className="positions-container-new">
                        <div className="positions-top-bar">
                            <div>
                                <h2 id="positions-heading" className="positions-title-new">Open Positions</h2>
                                <p className="positions-subtitle-new">Explore opportunities across our global engineering hubs.</p>
                            </div>

                            <div className="positions-search-controls">
                                <div className="search-input-wrapper">
                                    <Search size={16} className="search-icon-inside" />
                                    <input
                                        type="text"
                                        placeholder="Search roles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="btn-filter-toggle">
                                    <Filter size={16} /> FILTERS
                                </button>
                            </div>
                        </div>

                        {/* Open Requisitions Table */}
                        <div className="positions-table-wrapper">
                            <table className="jobs-data-table">
                                <thead>
                                    <tr>
                                        <th>JOB TITLE</th>
                                        <th>DEPARTMENT</th>
                                        <th>LOCATION</th>
                                        <th>TYPE</th>
                                        <th style={{ textAlign: 'right' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredJobs.map((job) => (
                                        <tr key={job.id} className="job-table-row">
                                            <td>
                                                <div className="job-row-title">{job.title}</div>
                                                <div className="job-row-req">{job.reqId}</div>
                                            </td>
                                            <td>
                                                <span className={`department-pill ${job.deptColor}`}>{job.dept}</span>
                                            </td>
                                            <td className="job-row-meta">{job.location}</td>
                                            <td className="job-row-meta">{job.type}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button
                                                    className="btn-apply-table-pill"
                                                    onClick={() => setSelectedJob(job)}
                                                >
                                                    APPLY
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* ── 5. Talent Pool CTA Section ── */}
                <section className="talent-cta-section" aria-labelledby="talent-heading">
                    <div className="talent-cta-container">
                        <div className="talent-cta-card">
                            <div className="bouncing-rocket-circle">
                                <Rocket size={28} color="#0B141C" />
                            </div>

                            <h2 id="talent-heading" className="talent-cta-title">
                                Ready to define the<br />
                                <span className="highlight-cyan">next frontier?</span>
                            </h2>
                            <p className="talent-cta-subtitle">
                                Submit your details to our global talent database and be the first to know when high-impact roles open in your field.
                            </p>

                            {talentSubmitted ? (
                                <div className="form-status-alert success" style={{ maxWidth: '440px', margin: '0 auto' }}>
                                    ✅ Thank you! You've been added to our priority talent network.
                                </div>
                            ) : (
                                <form onSubmit={handleTalentSubmit} className="talent-form-inline">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={talentEmail}
                                        onChange={(e) => setTalentEmail(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="btn-join-talent-pool">
                                        JOIN OUR TALENT POOL
                                    </button>
                                </form>
                            )}

                            <div className="talent-trusted-footer">
                                <span>TRUSTED BY 500+ ENTERPRISES</span>
                                <div className="trusted-icons">
                                    <Shield size={16} />
                                    <Award size={16} />
                                    <Zap size={16} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Application Modal */}
                {selectedJob && (
                    <div className="apply-modal-overlay" onClick={() => setSelectedJob(null)}>
                        <div className="apply-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-top-bar">
                                <h3>Apply for {selectedJob.title}</h3>
                                <button onClick={() => setSelectedJob(null)} className="modal-close-btn">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); alert("Application submitted successfully!"); setSelectedJob(null); }} className="modal-form-body">
                                <div className="form-field-box">
                                    <label>FULL NAME</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-field-box">
                                    <label>EMAIL ADDRESS</label>
                                    <input type="email" placeholder="john@domain.com" required />
                                </div>
                                <div className="form-field-box">
                                    <label>LINKEDIN / PORTFOLIO URL</label>
                                    <input type="url" placeholder="https://linkedin.com/in/username" required />
                                </div>
                                <button type="submit" className="btn-modal-submit">
                                    SUBMIT APPLICATION <ArrowRight size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </>
    );
};

export default Careers;
