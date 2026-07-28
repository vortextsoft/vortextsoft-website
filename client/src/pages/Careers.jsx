import React, { useState } from 'react';
import {
    ArrowUpRight,
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
    ChevronDown,
    X
} from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/Careers.css';

const OPEN_JOBS_DATA = [
    {
        id: 'job-1',
        title: 'Senior Full Stack Engineer',
        reqId: 'Requisition #24-0891',
        dept: 'CORE ENGINEERING',
        deptColor: 'dept-navy',
        location: 'London / Remote',
        type: 'Full-time'
    },
    {
        id: 'job-2',
        title: 'AI Researcher (LLM Ops)',
        reqId: 'Requisition #24-0742',
        dept: 'VORTEXT LABS',
        deptColor: 'dept-cyan',
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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [talentEmail, setTalentEmail] = useState('');
    const [talentSubmitted, setTalentSubmitted] = useState(false);

    const filteredJobs = OPEN_JOBS_DATA.filter(j =>
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
                                Precision
                            </h1>
                            <p className="careers-subtitle">
                                Vortextsoft is where elite engineering meets enterprise scale. Join a team dedicated to architecting the infrastructure of the next industrial revolution.
                            </p>
                            <div className="hero-cta-buttons">
                                <a href="#open-positions" className="btn-careers-primary">
                                    VIEW OPENINGS <ArrowUpRight size={18} />
                                </a>
                                <a href="#culture" className="btn-careers-secondary">
                                    OUR MISSION
                                </a>
                            </div>
                        </div>

                        {/* Right 2x2 Stats Grid */}
                        <div className="hero-right-stats-grid">
                            <div className="hero-stat-card">
                                <div className="stat-value">94%</div>
                                <div className="stat-label">Retention Rate</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="stat-value">400+</div>
                                <div className="stat-label">Active Patents</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="stat-value">12+</div>
                                <div className="stat-label">Global Hubs</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="stat-value">24/7</div>
                                <div className="stat-label">Rapid Deploy</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Culture Section ("Where Passion Meets Purpose") ── */}
                <section className="culture-section-new" id="culture" aria-labelledby="culture-heading">
                    <div className="culture-container-new">
                        <div className="culture-header">
                            <div className="section-tag-new">THE VORTEXT CULTURE</div>
                            <h2 id="culture-heading" className="culture-title-new">
                                Where Passion Meets Purpose
                            </h2>
                            <div className="culture-title-underline"></div>
                        </div>

                        <div className="culture-grid-card">
                            {/* Left Video Thumbnail */}
                            <div className="video-thumbnail-box">
                                <img
                                    src="/corporate-team-formal.png"
                                    alt="Vortextsoft Engineering Team in Interactive Workspace"
                                    loading="lazy"
                                />
                                <div className="play-button-overlay">
                                    <div className="play-icon-circle">
                                        <Play size={20} color="#010409" fill="#010409" style={{ marginLeft: '3px' }} />
                                    </div>
                                    <span className="play-label">WATCH OUR STORY</span>
                                </div>
                            </div>

                            {/* Right Culture Description */}
                            <div className="culture-content-box">
                                <blockquote className="culture-quote">
                                    "At Vortextsoft, we don't just solve problems; we redefine what's possible in the enterprise landscape."
                                </blockquote>
                                <p className="culture-paragraph">
                                    Our engineering culture is built on the pillars of radical transparency, extreme ownership, and continuous learning. We foster an environment where every voice matters—from our interns to our chief architects.
                                </p>
                                <ul className="culture-checklist">
                                    <li>
                                        <CheckCircle2 size={18} color="#00C8CC" className="check-icon" />
                                        <div>
                                            <strong>Asynchronous Mastery</strong>
                                            <p>Focus time is sacred. We minimize meetings and maximize deep work through robust documentation.</p>
                                        </div>
                                    </li>
                                    <li>
                                        <CheckCircle2 size={18} color="#00C8CC" className="check-icon" />
                                        <div>
                                            <strong>Innovation Sprints</strong>
                                            <p>10% of your time dedicated to personal R&amp;D projects that could become our next flagship product.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. The Vortext Advantage (4 Benefit Cards) ── */}
                <section className="advantage-section-new" aria-labelledby="advantage-heading">
                    <div className="advantage-container-new">
                        <h2 id="advantage-heading" className="advantage-title-new">The Vortext Advantage</h2>
                        <div className="advantage-grid-new">
                            <div className="advantage-card-new">
                                <div className="advantage-icon-box">
                                    <Cpu size={22} color="#00C8CC" />
                                </div>
                                <h3>Cutting-Edge Tech</h3>
                                <p>Access the latest silicon and distributed computing paradigms months before they hit the general market.</p>
                            </div>

                            <div className="advantage-card-new">
                                <div className="advantage-icon-box">
                                    <TrendingUp size={22} color="#00C8CC" />
                                </div>
                                <h3>Growth Velocity</h3>
                                <p>Clear career paths and $5k annual learning stipends for certifications, conferences, and books.</p>
                            </div>

                            <div className="advantage-card-new">
                                <div className="advantage-icon-box">
                                    <Users size={22} color="#00C8CC" />
                                </div>
                                <h3>Inclusive Pulse</h3>
                                <p>A truly global workforce with active ERGs and a commitment to radical diversity in leadership.</p>
                            </div>

                            <div className="advantage-card-new">
                                <div className="advantage-icon-box">
                                    <Award size={22} color="#00C8CC" />
                                </div>
                                <h3>Tier-1 Benefits</h3>
                                <p>Top-percentile equity packages, comprehensive health for you and yours, and flexible remote options.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 4. Open Positions Table ── */}
                <section className="positions-section-new" id="open-positions" aria-labelledby="positions-heading">
                    <div className="positions-container-new">
                        <div className="positions-header-row">
                            <div>
                                <h2 id="positions-heading" className="positions-title-new">Open Positions</h2>
                                <p className="positions-subtitle-new">Explore opportunities across our global engineering hubs.</p>
                            </div>
                            <div className="positions-controls">
                                <div className="search-input-box">
                                    <Search size={16} className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search roles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="btn-filter-toggle">
                                    <Filter size={14} /> FILTERS
                                </button>
                            </div>
                        </div>

                        {/* Roles Table */}
                        <div className="roles-table-wrapper">
                            <div className="roles-table-header">
                                <div className="col-title">JOB TITLE</div>
                                <div className="col-dept">DEPARTMENT</div>
                                <div className="col-location">LOCATION</div>
                                <div className="col-type">TYPE</div>
                                <div className="col-action"></div>
                            </div>
                            {filteredJobs.map(job => (
                                <div key={job.id} className="role-table-row">
                                    <div className="col-title">
                                        <div className="role-name">{job.title}</div>
                                        <div className="role-req">{job.reqId}</div>
                                    </div>
                                    <div className="col-dept">
                                        <span className={`dept-badge ${job.deptColor}`}>{job.dept}</span>
                                    </div>
                                    <div className="col-location">{job.location}</div>
                                    <div className="col-type">{job.type}</div>
                                    <div className="col-action">
                                        <button
                                            className="btn-apply-role"
                                            onClick={() => setSelectedJob(job)}
                                        >
                                            APPLY
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="roles-footer-note">
                            <p>Don't see a role that fits? We are always looking for exceptional talent.</p>
                            <a href="#talent-pool" className="btn-view-all-roles">
                                VIEW ALL ROLES <ChevronDown size={16} />
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── 5. Talent Pool Banner Section ── */}
                <section className="talent-banner-section" id="talent-pool" aria-labelledby="talent-heading">
                    <div className="talent-banner-container">
                        <div className="talent-rocket-badge">
                            <Rocket size={24} color="#010409" />
                        </div>
                        <h2 id="talent-heading" className="talent-headline">Ready to define the next frontier?</h2>
                        <p className="talent-subtitle">
                            Submit your details to our global talent database and be the first to know when high-impact roles open in your field.
                        </p>
                        {talentSubmitted ? (
                            <div className="talent-success-alert">
                                ✅ Thank you! Your profile has been added to our global talent pool.
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
                        <div className="talent-trust-bar">
                            <span>TRUSTED BY 500+ ENTERPRISES</span>
                            <Shield size={14} color="rgba(240, 246, 252, 0.4)" />
                        </div>
                    </div>
                </section>

                {/* ── Apply Modal ── */}
                {selectedJob && (
                    <div className="apply-modal-overlay" onClick={() => setSelectedJob(null)}>
                        <div className="apply-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Apply for {selectedJob.title}</h3>
                                <button className="btn-close-modal" onClick={() => setSelectedJob(null)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully!'); setSelectedJob(null); }} className="modal-body-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>LinkedIn / Portfolio URL</label>
                                    <input type="url" placeholder="https://linkedin.com/in/johndoe" required />
                                </div>
                                <button type="submit" className="btn-submit-application">
                                    SUBMIT APPLICATION
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
