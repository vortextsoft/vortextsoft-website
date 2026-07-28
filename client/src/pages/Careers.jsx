import React, { useState, useEffect } from 'react';
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
    X
} from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Careers.css';

const DEFAULT_JOBS = [
    {
        id: 'job-1',
        title: 'Intern – Software Engineer (SE)',
        reqId: 'Requisition #24-0891',
        dept: 'CORE ENGINEERING',
        deptColor: 'dept-navy',
        location: 'Colombo / Hybrid',
        type: 'Full-time'
    },
    {
        id: 'job-2',
        title: 'Senior Full Stack Engineer',
        reqId: 'Requisition #24-0742',
        dept: 'VORTEXT LABS',
        deptColor: 'dept-cyan',
        location: 'Remote',
        type: 'Full-time'
    },
    {
        id: 'job-3',
        title: 'Cloud Architect (Azure/AWS)',
        reqId: 'Requisition #24-0912',
        dept: 'INFRASTRUCTURE',
        deptColor: 'dept-blue',
        location: 'Singapore / Remote',
        type: 'Full-time'
    },
    {
        id: 'job-4',
        title: 'Product Designer',
        reqId: 'Requisition #24-0888',
        dept: 'PRODUCT & DESIGN',
        deptColor: 'dept-dark',
        location: 'Hybrid',
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
                                Architect the Future of<br />
                                <span className="highlight-cyan">Enterprise Systems.</span>
                            </h1>
                            <p className="careers-subtitle">
                                We solve impossible software engineering challenges. Join a multi-disciplinary team of creators, engineers, and researchers working on distributed systems that process billions of events.
                            </p>
                            <div className="hero-cta-buttons">
                                <a href="#open-positions" className="btn-careers-primary">
                                    VIEW OPEN POSITIONS <ArrowUpRight size={18} />
                                </a>
                                <a href="#ethos" className="btn-careers-secondary">
                                    OUR ETHOS
                                </a>
                            </div>
                        </div>

                        {/* Right 2x2 Stats Grid */}
                        <div className="hero-right-stats">
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">100%</div>
                                <div className="careers-stat-lbl">REMOTE-FIRST</div>
                            </div>
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">4.9/5</div>
                                <div className="careers-stat-lbl">CULTURE SCORE</div>
                            </div>
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">92%</div>
                                <div className="careers-stat-lbl">RETENTION RATE</div>
                            </div>
                            <div className="careers-stat-card">
                                <div className="careers-stat-val">15+</div>
                                <div className="careers-stat-lbl">NATIONS</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Culture & Purpose Section ── */}
                <section id="ethos" className="purpose-section-new" aria-labelledby="purpose-heading">
                    <div className="purpose-container-new">
                        <div className="purpose-left-media">
                            <img
                                src="/corporate-team-formal.png"
                                alt="Vortextsoft Global Engineering Culture"
                                loading="lazy"
                            />
                            <div className="media-play-overlay">
                                <div className="play-circle-btn">
                                    <Play size={24} color="#010409" style={{ marginLeft: '4px' }} />
                                </div>
                            </div>
                        </div>

                        <div className="purpose-right-content">
                            <div className="purpose-tag">ENGINEERING CULTURE</div>
                            <h2 id="purpose-heading" className="purpose-title">
                                Where Passion Meets Purpose
                            </h2>
                            <p className="purpose-desc">
                                At Vortextsoft, we value extreme technical autonomy, continuous peer learning, and uncompromised software craft. We build small, elite squads equipped with full ownership from concept to production deployment.
                            </p>

                            <div className="purpose-checklist">
                                <div className="purpose-check-item">
                                    <div className="purpose-icon-box">
                                        <CheckCircle2 size={14} color="#00C8CC" />
                                    </div>
                                    <span>Zero Micromanagement: Full Technical Autonomy</span>
                                </div>
                                <div className="purpose-check-item">
                                    <div className="purpose-icon-box">
                                        <CheckCircle2 size={14} color="#00C8CC" />
                                    </div>
                                    <span>Unlimited Budget for R&amp;D, Books &amp; Conferences</span>
                                </div>
                                <div className="purpose-check-item">
                                    <div className="purpose-icon-box">
                                        <CheckCircle2 size={14} color="#00C8CC" />
                                    </div>
                                    <span>Quarterly Global Team Engineering Retreats</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 3. Benefits Grid Section ── */}
                <section className="benefits-section-new" aria-labelledby="benefits-heading">
                    <div className="benefits-container-new">
                        <div className="benefit-card-new">
                            <div className="benefit-icon-box">
                                <Award size={22} color="#00C8CC" />
                            </div>
                            <h3 className="benefit-card-title">Competitive Equity &amp; Pay</h3>
                            <p className="benefit-card-desc">Top 10% market rates with generous equity packages for all full-time roles.</p>
                        </div>
                        <div className="benefit-card-new">
                            <div className="benefit-icon-box">
                                <TrendingUp size={22} color="#00C8CC" />
                            </div>
                            <h3 className="benefit-card-title">Learning Stipend</h3>
                            <p className="benefit-card-desc">$3,000 annual personal budget for courses, certifications, and technical books.</p>
                        </div>
                        <div className="benefit-card-new">
                            <div className="benefit-icon-box">
                                <Users size={22} color="#00C8CC" />
                            </div>
                            <h3 className="benefit-card-title">Flexible Autonomy</h3>
                            <p className="benefit-card-desc">Asynchronous work culture across global timezones built on high trust.</p>
                        </div>
                        <div className="benefit-card-new">
                            <div className="benefit-icon-box">
                                <Rocket size={22} color="#00C8CC" />
                            </div>
                            <h3 className="benefit-card-title">Global Team Retreats</h3>
                            <p className="benefit-card-desc">Bi-annual fully funded international retreats for team collaboration and fun.</p>
                        </div>
                    </div>
                </section>

                {/* ── 4. Open Positions Table Section ── */}
                <section id="open-positions" className="positions-section-new" aria-labelledby="positions-heading">
                    <div className="positions-container-new">
                        <div className="positions-header-new">
                            <div className="section-tag-new">OPEN REQUISITIONS</div>
                            <h2 id="positions-heading" className="positions-title-new">Open Positions</h2>
                        </div>

                        <div className="positions-table-card">
                            {filteredJobs.map((job) => (
                                <div key={job.id} className="position-row-item">
                                    <div className="job-role-title">{job.title}</div>
                                    <div>
                                        <span className={`department-pill ${job.deptColor}`}>{job.dept}</span>
                                    </div>
                                    <div className="job-meta-text">{job.location}</div>
                                    <div className="job-meta-text">{job.type}</div>
                                    <button
                                        className="btn-apply-role"
                                        onClick={() => setSelectedJob(job)}
                                    >
                                        APPLY NOW <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 5. Talent Pool CTA Section ── */}
                <section className="talent-cta-section" aria-labelledby="talent-heading">
                    <div className="talent-cta-container">
                        <div className="section-tag-new center-tag">FUTURE REQUISITIONS</div>
                        <h2 id="talent-heading" className="talent-cta-title">
                            Don't See Your Role? Join Our Talent Network
                        </h2>
                        <p className="talent-cta-subtitle">
                            We are always looking for exceptional talent. Submit your email and we'll reach out when a position matching your profile opens.
                        </p>
                        {talentSubmitted ? (
                            <div className="form-status-alert success" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                ✅ Thank you! You've been added to our priority talent network.
                            </div>
                        ) : (
                            <form onSubmit={handleTalentSubmit} style={{ display: 'inline-flex', gap: '0.75rem', maxWidth: '480px', width: '100%' }}>
                                <input
                                    type="email"
                                    placeholder="Enter your work email address..."
                                    value={talentEmail}
                                    onChange={(e) => setTalentEmail(e.target.value)}
                                    required
                                    style={{ flex: 1, padding: '0.85rem 1.25rem', borderRadius: '50px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', outline: 'none' }}
                                />
                                <button type="submit" className="btn-join-talent">
                                    JOIN NETWORK
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                {/* Application Modal */}
                {selectedJob && (
                    <div className="apply-modal-overlay" onClick={() => setSelectedJob(null)}>
                        <div className="apply-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                                    Apply for {selectedJob.title}
                                </h3>
                                <button onClick={() => setSelectedJob(null)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); alert("Application submitted successfully!"); setSelectedJob(null); }}>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(186,201,204,0.6)', marginBottom: '0.4rem' }}>FULL NAME</label>
                                    <input type="text" placeholder="John Doe" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                                </div>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(186,201,204,0.6)', marginBottom: '0.4rem' }}>EMAIL ADDRESS</label>
                                    <input type="email" placeholder="john@domain.com" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(186,201,204,0.6)', marginBottom: '0.4rem' }}>LINKEDIN / PORTFOLIO URL</label>
                                    <input type="url" placeholder="https://linkedin.com/in/username" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                                </div>
                                <button type="submit" className="btn-join-talent" style={{ width: '100%', justifyContent: 'center' }}>
                                    SUBMIT APPLICATION <ArrowUpRight size={16} />
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
