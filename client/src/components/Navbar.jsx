import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Layers, User } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="navbar-new">
            <div className="navbar-container">
                {/* Brand Logo */}
                <Link to="/" className="navbar-logo-new" onClick={closeMenu}>
                    <div className="logo-icon-box">
                        <Layers size={18} color="#010409" />
                    </div>
                    <span className="logo-text">VORTEXTSOFT</span>
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="nav-links-new desktop-nav">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>HOME</NavLink></li>
                    <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>SERVICES</NavLink></li>
                    <li><NavLink to="/case-studies" className={({ isActive }) => isActive ? 'active' : ''}>CASE STUDIES</NavLink></li>
                    <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>BLOG</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>ABOUT US</NavLink></li>
                    <li><NavLink to="/careers" className={({ isActive }) => isActive ? 'active' : ''}>CAREERS</NavLink></li>
                </ul>

                {/* Right Action Controls */}
                <div className="navbar-actions">
                    <Link to="/contact" className="btn-nav-contact" id="nav-contact-btn">
                        CONTACT US
                    </Link>
                    <Link to="/admin/login" className="btn-nav-user" aria-label="Admin Portal" id="nav-admin-btn">
                        <User size={18} />
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <div className="menu-icon-new" onClick={toggleMenu}>
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </div>

                {/* Mobile Navigation Drawer */}
                <div className={`mobile-menu-new ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-links-mobile">
                        <li><NavLink to="/" onClick={closeMenu}>HOME</NavLink></li>
                        <li><NavLink to="/services" onClick={closeMenu}>SERVICES</NavLink></li>
                        <li><NavLink to="/case-studies" onClick={closeMenu}>CASE STUDIES</NavLink></li>
                        <li><NavLink to="/blog" onClick={closeMenu}>BLOG</NavLink></li>
                        <li><NavLink to="/about" onClick={closeMenu}>ABOUT US</NavLink></li>
                        <li><NavLink to="/careers" onClick={closeMenu}>CAREERS</NavLink></li>
                        <li><NavLink to="/contact" onClick={closeMenu} className="mobile-contact-link">CONTACT US</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
