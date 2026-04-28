import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { api } from '../api';
import { useParallax, useScrollFade } from '../utils/useParallax';
import '../styles/Home.css';

const Home = () => {
    const [services, setServices] = useState([]);
    const [partners, setPartners] = useState([]);

    // ── Parallax refs ──────────────────────────────────────────
    const heroBgRef = useRef(null);
    const [heroBgY, setHeroBgY] = useState(0);

    // Floating orbs in hero
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Scroll-fade sections
    const servicesFade = useScrollFade(0.1);
    const statsFade    = useScrollFade(0.1);
    const ctaFade      = useScrollFade(0.1);

    useEffect(() => {
        api.getServices().then(data => setServices(data.slice(0, 8))).catch(err => console.log(err));
        api.getPartners().then(data => setPartners(data)).catch(err => console.log(err));

        // Hero background parallax on scroll
        const handleScroll = () => {
            if (!heroBgRef.current) return;
            const scrollY = window.scrollY;
            setHeroBgY(scrollY * 0.35);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse parallax effect for hero orbs
    useEffect(() => {
        const handleMouse = (e) => {
            const x = (e.clientX / window.innerWidth  - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    // Dynamic icon lookup
    const getIcon = (iconName, title) => {
        if (iconName) {
            const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
            const IconComponent = LucideIcons[formattedName] || LucideIcons[iconName];
            if (IconComponent) return <IconComponent />;
        }
        const t = title.toLowerCase();
        if (t.includes('web')) return <LucideIcons.Globe />;
        if (t.includes('ai') || t.includes('intelligence')) return <LucideIcons.Cpu />;
        if (t.includes('app')) return <LucideIcons.Layout />;
        if (t.includes('erp')) return <LucideIcons.Layers />;
        if (t.includes('quality') || t.includes('test')) return <LucideIcons.ShieldCheck />;
        return <LucideIcons.Code />;
    };

    return (
        <div className="home-page">

            {/* ── Hero Section ──────────────────────────────── */}
            <section className="hero-section" ref={heroBgRef}>
                {/* Parallax background image layer */}
                <div
                    className="hero-bg-parallax"
                    style={{ transform: `translateY(${heroBgY}px)` }}
                />

                {/* Floating decorative orbs that react to mouse */}
                <div
                    className="hero-orb orb-1"
                    style={{
                        transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)`,
                    }}
                />
                <div
                    className="hero-orb orb-2"
                    style={{
                        transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)`,
                    }}
                />
                <div
                    className="hero-orb orb-3"
                    style={{
                        transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
                    }}
                />

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">✦ Next-Gen Software Studio</div>
                        <h1>
                            Empower Your Business with{' '}
                            <span className="hero-brand">Vortextsoft</span>
                            <span style={{ color: '#00C8CC' }}>.</span>
                        </h1>
                        <p className="hero-subtitle">
                            Delivering cutting-edge, scalable, and high-performance software solutions
                            tailored to your business needs.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
                            <Link to="/services" className="btn btn-secondary">Our Services</Link>
                        </div>
                    </div>
                </div>

                {/* Scrolling indicator */}
                <div className="hero-scroll-hint">
                    <span>Scroll</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ── Intro / Partners Section ──────────────────── */}
            <section className="section services-preview-section">
                <div className="container">
                    <div
                        className="section-header"
                        ref={servicesFade.ref}
                        style={{ ...servicesFade.style, transition: 'opacity 0.8s ease, transform 0.8s ease' }}
                    >
                        <h2>Your Trusted Tech Partner</h2>
                        <p>
                            Vortextsoft is a cutting-edge technology company specializing in AI/ML, mobile,
                            web, and enterprise solutions. We combine technical expertise with business acumen
                            to deliver solutions that drive growth, efficiency, and innovation.
                        </p>
                    </div>

                    {/* Partners Marquee */}
                    {partners.length > 0 && (
                        <div className="partners-marquee-container">
                            <div className="partners-marquee">
                                <div className="marquee-content">
                                    {partners.map((partner, index) => (
                                        <div key={index} className="partner-logo-item">
                                            <img src={partner.logo} alt={partner.name} title={partner.name} />
                                        </div>
                                    ))}
                                    {partners.map((partner, index) => (
                                        <div key={`dup-${index}`} className="partner-logo-item">
                                            <img src={partner.logo} alt={partner.name} title={partner.name} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Services Overview ─────────────────────────── */}
            <section className="section services-preview-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Services</h2>
                        <p>Comprehensive technology solutions designed to transform your business</p>
                    </div>

                    <div className="services-grid">
                        {services.length === 0 ? (
                            <>
                                <ServiceCard title="Custom Software Solutions"           icon={<LucideIcons.Code />}       description="Tailor-made software development to meet your unique business requirements and workflows." delay={0} />
                                <ServiceCard title="Web & Mobile Application Development" icon={<LucideIcons.Layout />}     description="Create responsive, user-friendly websites and powerful cross-platform mobile applications." delay={80} />
                                <ServiceCard title="AI, Machine Learning & Data Science"  icon={<LucideIcons.Cpu />}        description="Intelligent AI and ML-driven solutions to automate processes and extract valuable insights." delay={160} />
                                <ServiceCard title="Consulting & Virtual Reality"          icon={<LucideIcons.Globe />}      description="Immersive AR/VR experiences that revolutionize training, marketing, and user engagement." delay={240} />
                                <ServiceCard title="IoT & Embedded Systems"               icon={<LucideIcons.Layers />}     description="Connect and automate devices and systems for real-time monitoring, control, and efficiency." delay={320} />
                                <ServiceCard title="Enterprise Resource Planning (ERP)"   icon={<LucideIcons.Layers />}     description="Integrated ERP solutions to streamline and automate all your business operations." delay={400} />
                                <ServiceCard title="Quality Assurance & Testing"          icon={<LucideIcons.ShieldCheck />} description="Ensure your software is secure, reliable, and performs flawlessly with our comprehensive QA services." delay={480} />
                                <ServiceCard title="DevOps, Deployment & Optimization"   icon={<LucideIcons.Code />}       description="Optimized deployment, CI/CD automation, and infrastructure management for peak performance." delay={560} />
                            </>
                        ) : (
                            services.map((s, i) => (
                                <ServiceCard key={s.id} title={s.title} icon={getIcon(s.icon, s.title)} description={s.description} delay={i * 80} />
                            ))
                        )}
                    </div>

                    <div className="center-btn">
                        <Link to="/services" className="btn btn-primary">View All Services <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>

            {/* ── Stats Section ─────────────────────────────── */}
            <section className="section stats-section">
                <div
                    className="container stats-grid"
                    ref={statsFade.ref}
                    style={{ ...statsFade.style, transition: 'opacity 0.9s ease, transform 0.9s ease' }}
                >
                    <StatCard value="15+" label="Projects Completed" delay={0} />
                    <StatCard value="98%" label="Client Satisfaction"  delay={100} />
                    <StatCard value="2+"  label="Years of Experience"  delay={200} />
                    <StatCard value="10+" label="Expert Team Members"  delay={300} />
                </div>
            </section>

            {/* ── CTA Section ───────────────────────────────── */}
            <section className="section cta-section">
                {/* Parallax decorative blobs */}
                <div className="cta-blob cta-blob-1" />
                <div className="cta-blob cta-blob-2" />

                <div
                    className="container cta-content"
                    ref={ctaFade.ref}
                    style={{ ...ctaFade.style, transition: 'opacity 0.9s ease, transform 0.9s ease' }}
                >
                    <h2>Ready to Start Your Project?</h2>
                    <p>Let's innovate together. Share your requirements and our team will get back to you shortly.</p>
                    <Link to="/contact" className="btn btn-primary btn-large">Get in Touch</Link>
                </div>
            </section>
        </div>
    );
};

/* ── Sub-components ──────────────────────────────────────────── */

const ServiceCard = ({ title, icon, description, delay = 0 }) => {
    const { ref, style } = useScrollFade(0.05);
    return (
        <div
            className="service-card"
            ref={ref}
            style={{
                ...style,
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
            }}
        >
            <div className="service-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const StatCard = ({ value, label, delay = 0 }) => {
    const { ref, style } = useScrollFade(0.1);
    return (
        <div
            className="stat-card"
            ref={ref}
            style={{
                ...style,
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
            }}
        >
            <h3>{value}</h3>
            <p>{label}</p>
        </div>
    );
};

export default Home;
