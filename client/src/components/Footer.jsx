import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-section brand">
                    <Link to="/" className="footer-logo">
                        Vorte<span className="highlight-dark">Xt</span>soft
                    </Link>
                    <p className="footer-tagline">
                        Delivering cutting-edge, scalable, and high-performance software solutions tailored to your business needs.
                    </p>
                    <div className="social-icons">
                        <a href="https://www.linkedin.com/company/vortextsoft/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="https://www.facebook.com/share/1AL8FNHvdE/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

                <div className="footer-section links">
                    <h4>Services</h4>
                    <ul className="services-list">
                        <li><Link to="/services">Custom Software</Link></li>
                        <li><Link to="/services">Web & Mobile Apps</Link></li>
                        <li><Link to="/services">AI & Machine Learning</Link></li>
                        <li><Link to="/services">AR/VR Solutions</Link></li>
                    </ul>
                </div>

                <div className="footer-section links">
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/case-studies">Case Studies</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h4>Contact</h4>
                    <div className="contact-item">
                        <Mail size={18} />
                        <a href="mailto:vortextsoft.info@gmail.com">vortextsoft.info@gmail.com</a>
                    </div>
                    <div className="contact-item">
                        <Phone size={18} />
                        <span>0786620583</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} Vortextsoft. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
