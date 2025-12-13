import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    Vorte<span className="highlight">Xt</span>soft
                </Link>

                {/* Desktop Menu */}
                <ul className="nav-links desktop-nav">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>Home</NavLink></li>
                    <li><NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink></li>
                    <li><NavLink to="/case-studies" className={({ isActive }) => isActive ? 'active' : ''}>Case Studies</NavLink></li>
                    <li><NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
                    <li><NavLink to="/careers" className={({ isActive }) => isActive ? 'active' : ''}>Careers</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact Us</NavLink></li>
                </ul>

                {/* Mobile Menu Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Mobile Overlay Menu */}
                <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-links-mobile">
                        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
                        <li><NavLink to="/case-studies" onClick={closeMenu}>Case Studies</NavLink></li>
                        <li><NavLink to="/blog" onClick={closeMenu}>Blog</NavLink></li>
                        <li><NavLink to="/about" onClick={closeMenu}>About Us</NavLink></li>
                        <li><NavLink to="/careers" onClick={closeMenu}>Careers</NavLink></li>
                        <li><NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
