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
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                setMessages([]);
            }
        } catch (e) {
            console.error(e);
            setMessages([]);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            await fetch(`${API_URL}/contact/${id}`, { method: 'DELETE' });
            fetchMessages();
        }
    };

    const handleView = async (message) => {
        setViewing(message);
        setIsModalOpen(true);

        // Mark as read if not already
        if (!message.replied) {
            try {
                await fetch(`${API_URL}/contact/${message.id}/replied`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ replied: true })
                });
                // Update local state to reflect read status
                setMessages(prev => prev.map(m => m.id === message.id ? { ...m, replied: true } : m));
            } catch (err) {
                console.error("Failed to mark as read", err);
            }
        }
    };

    const handleReply = () => {
        setIsModalOpen(false);
        setReplyData({
            subject: `Re: Contact from ${viewing.name}`,
            message: `Hi ${viewing.name},\n\nThank you for reaching out.\n\nBest regards,\nVortextSoft Team`
        });
        setIsReplyOpen(true);
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            const res = await fetch(`${API_URL}/contact/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: viewing.email,
                    subject: replyData.subject,
                    message: replyData.message
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.details || 'Failed to send');

            alert('Reply sent successfully!');

            // Mark as replied if successful
            handleView({ ...viewing, read: true });

            setIsReplyOpen(false);
        } catch (error) {
            console.error(error);
            alert(`Error sending email: ${error.message}`);
        } finally {
            setSending(false);
        }
    };

    // ... (rest of component)

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
                        {Array.isArray(messages) && messages.map(s => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.company || '-'}</td>
                                <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : '-'}</td>
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

