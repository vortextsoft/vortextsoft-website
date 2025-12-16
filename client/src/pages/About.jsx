import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { api } from '../api';
import '../styles/About.css';

const About = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        api.getTeam().then(data => setTeam(data)).catch(console.error);
    }, []);

    return (
        <div className="page-container">
            {/* Intro Section */}
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>Driving Digital Transformation</h1>
                        <p className="lead">
                            We are a collective force of top talents, experts, and visionaries from diverse fields,
                            united by a passion for technology and innovation.
                        </p>
                    </div>
                    <div className="hero-visual">
                        <div className="future-gyro">
                            <div className="gyro-ring ring-1"></div>
                            <div className="gyro-ring ring-2"></div>
                            <div className="gyro-ring ring-3"></div>
                            <div className="gyro-core"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section mv-section">
                <div className="container mv-grid">
                    <div className="mv-card">
                        <h3>Our Mission</h3>
                        <p>To deliver intelligent, future-ready technology solutions that empower businesses to thrive in the digital age.</p>
                    </div>
                    <div className="mv-card">
                        <h3>Our Vision</h3>
                        <p>To drive global innovation, efficiency, and digital growth through accessible and scalable software engineering.</p>
                    </div>
                    <div className="mv-card">
                        <h3>Core Values</h3>
                        <ul>
                            <li>Quality & Excellence</li>
                            <li>Reliability & Trust</li>
                            <li>Continuous Innovation</li>
                            <li>Customer-Centricity</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section team-section">
                <div className="container">
                    <div className="section-header">
                        <h2>OUR TEAM</h2>
                        <p>Our professional experts</p>
                        <div className="section-desc">
                            Our team is a collective force of top talents, experts, and visionaries from diverse fields.
                        </div>
                    </div>

                    <div className="team-grid">
                        {team.length === 0 ? (
                            // Fallback if no data in API
                            <>
                                <TeamCard
                                    name="Sivasothy Tharsa"
                                    role="Co-founder and Software Engineer"
                                    email="tharsa@vortextsoft.com"
                                />
                                <TeamCard
                                    name="Sivasothy Tharsi"
                                    role="Co-founder and Software Engineer"
                                    email="tharsi@vortextsoft.com"
                                />
                                <TeamCard
                                    name="Madunicka"
                                    role="Co-founder and Software Engineer"
                                    email="madunicka@vortextsoft.com"
                                />
                                <TeamCard
                                    name="Sukumar Anujan"
                                    role="Software Engineer"
                                    email="anujan@vortextsoft.com"
                                />
                                <TeamCard
                                    name="Sathakaran Thisenthan"
                                    role="Project Manager, Business Analyst"
                                    email="thisenthan@vortextsoft.com"
                                />
                            </>
                        ) : (
                            team.map(member => (
                                <TeamCard
                                    key={member.id}
                                    name={member.name}
                                    role={member.role}
                                    email={member.email}
                                    shortDescription={member.shortDescription}
                                    profileImage={member.profileImage}
                                    linkedin={member.linkedin}
                                    github={member.github}
                                />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

const TeamCard = ({ name, role, email, shortDescription, profileImage, linkedin, github }) => {
    const getImageUrl = (img) => {
        if (!img) return null;
        if (img.startsWith('http') || img.startsWith('data:')) return img;
        return `${API_BASE_URL}${img}`;
    };

    return (
        <div className="team-card">
            {profileImage ? (
                <img src={getImageUrl(profileImage)} alt={name} className="team-avatar-image" />
            ) : (
                <div className="team-avatar-placeholder">
                    {name.charAt(0)}
                </div>
            )}
            <h3>{name}</h3>
            <p className="team-role">{role}</p>
            {shortDescription && <p className="team-description">{shortDescription}</p>}
            {email && <p className="team-email"><a href={`mailto:${email}`}>{email}</a></p>}
            {(linkedin || github) && (
                <div className="team-social-links">
                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    )}
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default About;
