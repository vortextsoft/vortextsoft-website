import React from 'react';
import '../styles/FloatingLogo.css';

const FloatingLogo = () => {
    return (
        <div className="floating-logo-container">
            <div className="logo-wrapper">
                <div className="glasses-3d">
                    {/* Left Lens */}
                    <div className="lens left-lens">
                        <div className="lens-content">
                            <span className="code-symbol">&lt;/&gt;</span>
                        </div>
                    </div>

                    {/* Bridge */}
                    <div className="bridge"></div>

                    {/* Right Lens */}
                    <div className="lens right-lens">
                        <div className="lens-content">
                            {/* Power Icon using simple CSS/SVG */}
                            <div className="power-icon">
                                <div className="power-line"></div>
                                <div className="power-circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="logo-text">
                    <h1 className="company-name">Vorte<span className="highlight-x">X</span>tsoft</h1>
                    <p className="tagline">INNOVATE. ELEVATE. DOMINATE</p>
                </div>
            </div>
        </div>
    );
};

export default FloatingLogo;
