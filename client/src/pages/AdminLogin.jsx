import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [canResend, setCanResend] = useState(true);
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/request-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setStep(2);
                setMessage('Verification code sent to your email');
                setCanResend(false);
                setCountdown(60);
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setCanResend(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                if (data.otp) {
                    console.log('Development OTP:', data.otp);
                }
            } else {
                setError(data.error || 'Failed to send verification code');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user, data.token);
                navigate('/admin');
            } else {
                setError(data.error || 'Invalid verification code');
                setOtp('');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = () => {
        setOtp('');
        setError('');
        handleRequestOTP({ preventDefault: () => { } });
    };

    const handleBackToEmail = () => {
        setStep(1);
        setOtp('');
        setError('');
        setMessage('');
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-card">
                    {/* Header */}
                    <div className="login-header">
                        <img
                            src="/vortextsoft-logo.jpg"
                            alt="VortextSoft"
                            className="login-logo"
                        />
                        <h1 className="login-title">Admin Portal</h1>
                        <p className="login-subtitle">
                            {step === 1
                                ? 'Enter your email to receive a verification code'
                                : 'Enter the 6-digit code sent to your email'
                            }
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="step-indicator">
                        <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
                        <div className={`step-line ${step >= 2 ? 'completed' : ''}`}></div>
                        <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="message-box error">
                            <span className="message-icon">⚠️</span>
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="message-box success">
                            <span className="message-icon">✓</span>
                            {message}
                        </div>
                    )}

                    {/* Step 1: Email */}
                    {step === 1 ? (
                        <form onSubmit={handleRequestOTP} className="login-form">
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@vortextsoft.com"
                                    autoFocus
                                    autoComplete="email"
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <div className="btn-spinner"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <span>→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        /* Step 2: OTP Verification */
                        <form onSubmit={handleVerifyOTP} className="login-form">
                            <div className="email-display">
                                <span className="email-display-text">
                                    Code sent to <span className="email-display-address">{email}</span>
                                </span>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Verification Code</label>
                                <input
                                    type="text"
                                    className="form-input otp-input"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    required
                                    placeholder="000000"
                                    maxLength="6"
                                    autoFocus
                                    autoComplete="one-time-code"
                                />
                                <span className="otp-hint">Check your email inbox and spam folder</span>
                            </div>

                            <button type="submit" className="submit-btn" disabled={loading || otp.length !== 6}>
                                {loading ? (
                                    <>
                                        <div className="btn-spinner"></div>
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Verify & Login
                                        <span>🔐</span>
                                    </>
                                )}
                            </button>

                            <div className="secondary-actions">
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={!canResend || loading}
                                    className="link-btn"
                                >
                                    {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                                </button>
                                <div className="action-separator"></div>
                                <button
                                    type="button"
                                    onClick={handleBackToEmail}
                                    className="link-btn primary"
                                >
                                    Change Email
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Footer */}
                    <div className="login-footer">
                        <p className="login-footer-text">
                            © 2024 VortextSoft. Secure Admin Access.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
