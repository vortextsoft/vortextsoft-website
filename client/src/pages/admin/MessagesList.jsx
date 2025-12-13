import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { Eye, Trash2, Send } from 'lucide-react';

const MessagesList = () => {
    const [messages, setMessages] = useState([]);
    const [viewing, setViewing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [replyData, setReplyData] = useState({ subject: '', message: '' });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${API_URL}/contact`);
            const data = await res.json();
            setMessages(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            await fetch(`${API_URL}/contact/${id}`, { method: 'DELETE' });
            fetchMessages();
        }
    };

    const handleView = (msg) => {
        setViewing(msg);
        setIsModalOpen(true);
    };

    const handleReply = () => {
        setReplyData({
            subject: `Re: Your inquiry to Vortextsoft`,
            message: ''
        });
        setIsModalOpen(false);
        setIsReplyOpen(true);
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            const response = await fetch(`${API_URL}/email/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: viewing.email,
                    subject: replyData.subject,
                    message: replyData.message,
                    recipientName: viewing.name
                })
            });

            const result = await response.json();

            if (result.success) {
                // Mark message as replied
                await fetch(`${API_URL}/contact/${viewing.id}/replied`, {
                    method: 'PATCH'
                });

                alert('Email sent successfully!');
                setIsReplyOpen(false);
                setViewing(null);
                setReplyData({ subject: '', message: '' });
                fetchMessages(); // Refresh the list to show replied status
            } else {
                alert('Failed to send email: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please check your email configuration.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Contact Messages</h2>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(s => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.company || '-'}</td>
                                <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '-'}</td>
                                <td>
                                    {s.replied ? (
                                        <span style={{
                                            background: '#d4edda',
                                            color: '#155724',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}>
                                            ✓ Replied
                                        </span>
                                    ) : (
                                        <span style={{
                                            background: '#fff3cd',
                                            color: '#856404',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: '500'
                                        }}>
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <button className="action-btn edit-btn" onClick={() => handleView(s)} title="View Details"><Eye size={14} /></button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(s.id)} title="Delete"><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Message Modal */}
            {isModalOpen && viewing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Message Details</h3>
                        <div style={{ lineHeight: '1.8' }}>
                            <p><strong>Name:</strong> {viewing.name}</p>
                            <p><strong>Email:</strong> {viewing.email}</p>
                            <p><strong>Phone:</strong> {viewing.phone}</p>
                            <p><strong>Company:</strong> {viewing.company}</p>
                            <div style={{ marginTop: '1rem', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
                                <strong>Message:</strong>
                                <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{viewing.message}</p>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-primary" onClick={handleReply}>
                                <Send size={16} style={{ marginRight: '5px' }} /> Reply via Email
                            </button>
                            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reply Email Modal */}
            {isReplyOpen && viewing && (
                <div className="modal-overlay">
                    <div className="modal-content" style={{ maxWidth: '600px' }}>
                        <h3>Reply to {viewing.name}</h3>
                        <form onSubmit={handleSendEmail}>
                            <div className="form-group">
                                <label>To:</label>
                                <input type="email" value={viewing.email} disabled style={{ background: '#f5f5f5' }} />
                            </div>
                            <div className="form-group">
                                <label>Subject:</label>
                                <input
                                    type="text"
                                    required
                                    value={replyData.subject}
                                    onChange={e => setReplyData({ ...replyData, subject: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message:</label>
                                <textarea
                                    required
                                    rows="10"
                                    value={replyData.message}
                                    onChange={e => setReplyData({ ...replyData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary" disabled={sending}>
                                    {sending ? 'Sending...' : 'Send Email'}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsReplyOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesList;

