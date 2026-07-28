import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Globe, Network, Layers, ArrowRight } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-new">
            <div className="footer-container-new">
                {/* Brand Column */}
                <div className="footer-col brand-col">
                    <Link to="/" className="footer-logo-new">
                        <div className="logo-icon-box">
                            <Layers size={18} color="#010409" />
                        </div>
                        <span className="logo-text">Vortextsoft</span>
                    </Link>
                    <p className="footer-description">
                        Precision-engineered enterprise software for high-performance operations.
                    </p>
                    <div className="social-icons-new">
                        <a href="https://www.linkedin.com/company/vortextsoft/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Share2 size={16} />
                        </a>
                        <a href="https://vortextsoft.com" target="_blank" rel="noopener noreferrer" aria-label="Website">
                            <Globe size={16} />
                        </a>
                        <a href="https://github.com/vortextsoft" target="_blank" rel="noopener noreferrer" aria-label="Network">
                            <Network size={16} />
                        </a>
                    </div>
                </div>

                {/* Solutions Column */}
                <div className="footer-col">
                    <h4>Solutions</h4>
                    <ul>
                        <li><Link to="/services">Enterprise ERP</Link></li>
                        <li><Link to="/services">Cloud Infrastructure</Link></li>
                        <li><Link to="/services">AI & Automation</Link></li>
                        <li><Link to="/services">Cyber Security</Link></li>
                    </ul>
                </div>

                {/* Company Column */}
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/case-studies">Case Studies</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div className="footer-col newsletter-col">
                    <h4>Stay Informed</h4>
                    <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit" className="btn-subscribe">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom-new">
                <p>&copy; {new Date().getFullYear()} Vortextsoft Enterprise Solutions. Built for Precision.</p>
            </div>
        </footer>
    );
};

export default Footer;
