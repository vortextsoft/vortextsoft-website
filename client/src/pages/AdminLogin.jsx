import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Admin.css';

const AdminLogin = () => {
    const [step, setStep] = useState(1); // 1 = email, 2 = OTP
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [canResend, setCanResend] = useState(true);
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();
    const { login } = useAuth();

    // Request OTP - Step 1
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
                setMessage('OTP sent to registered phone numbers. Please check your phone.');
                // Start 60 second countdown for resend
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

                // FOR DEVELOPMENT: show OTP in console
                if (data.otp) {
                    console.log('Development OTP:', data.otp);
                }
            } else {
                setError(data.error || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Network error. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP - Step 2
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
                setError(data.error || 'Invalid OTP');
                setOtp(''); // Clear OTP field
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
        <div className="admin-login-container">
            <div className="login-card">
                <h2>Admin Login</h2>
                <p className="login-subtitle">
                    {step === 1 ? 'Enter your email to receive OTP' : 'Enter the 6-digit code sent to your phone'}
                </p>

                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}

                {step === 1 ? (
                    <form onSubmit={handleRequestOTP}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@vortextsoft.com"
                                autoFocus
                            />
                        </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Request OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP}>
                        <div className="form-group">
                            <label htmlFor="otp">OTP Code</label>
                            <input
                                id="otp"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                required
                                placeholder="000000"
                                maxLength="6"
                                autoFocus
                                style={{
                                    fontSize: '24px',
                                    letterSpacing: '8px',
                                    textAlign: 'center',
                                    fontFamily: 'monospace'
                                }}
                            />
                            <small style={{ display: 'block', marginTop: '8px', color: '#666' }}>
                                OTP sent to: {email}
                            </small>
                        </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={!canResend || loading}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: canResend ? '#00C8CC' : '#999',
                                    cursor: canResend ? 'pointer' : 'not-allowed',
                                    textDecoration: 'underline',
                                    fontSize: '14px'
                                }}
                            >
                                {canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
                            </button>
                            <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>
                            <button
                                type="button"
                                onClick={handleBackToEmail}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#00C8CC',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    fontSize: '14px'
                                }}
                            >
                                Change Email
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
