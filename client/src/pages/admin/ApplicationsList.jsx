import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL, API_BASE_URL } from '../../config';
import { Eye, Trash2 } from 'lucide-react';

const ApplicationsList = () => {
    const [apps, setApps] = useState([]);
    const [viewing, setViewing] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchApps();
    }, []);

    const fetchApps = async () => {
        try {
            const res = await fetch(`${API_URL}/applications`); // Helper needed in api/index.js
            const data = await res.json();
            setApps(data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this application?')) {
            await fetch(`${API_URL}/applications/${id}`, { method: 'DELETE' });
            fetchApps();
        }
    };

    const handleView = (app) => {
        setViewing(app);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Job Applications</h2>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Position</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps.map(s => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.position}</td>
                                <td>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '-'}</td>
                                <td>
                                    <button className="action-btn edit-btn" onClick={() => handleView(s)}><Eye size={14} /></button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && viewing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Application Details</h3>
                        <div style={{ lineHeight: '1.8' }}>
                            <p><strong>Position:</strong> {viewing.position}</p>
                            <p><strong>Name:</strong> {viewing.name}</p>
                            <p><strong>Email:</strong> <a href={`mailto:${viewing.email}`}>{viewing.email}</a></p>
                            <p><strong>Phone:</strong> {viewing.phone}</p>
                            <p><strong>Portfolio:</strong> {viewing.portfolio ? <a href={viewing.portfolio} target="_blank" rel="noreferrer">{viewing.portfolio}</a> : '-'}</p>

                            {/* CV and Cover Letter Documents */}
                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '6px' }}>
                                <p style={{ marginBottom: '0.75rem', fontWeight: 'bold' }}>Documents:</p>
                                {viewing.cvLink && (
                                    <p style={{ marginBottom: '0.5rem' }}>
                                        <strong>CV/Resume:</strong>{' '}
                                        <a
                                            href={`${API_BASE_URL}${viewing.cvLink}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#0094FF', textDecoration: 'none', fontWeight: '500' }}
                                        >
                                            📄 View/Download CV
                                        </a>
                                    </p>
                                )}
                                {viewing.coverLetterLink && (
                                    <p style={{ marginBottom: '0' }}>
                                        <strong>Cover Letter:</strong>{' '}
                                        <a
                                            href={`${API_BASE_URL}${viewing.coverLetterLink}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#0094FF', textDecoration: 'none', fontWeight: '500' }}
                                        >
                                            📄 View/Download Cover Letter
                                        </a>
                                    </p>
                                )}
                                {!viewing.cvLink && !viewing.coverLetterLink && (
                                    <p style={{ color: '#666', fontStyle: 'italic', margin: 0 }}>No documents uploaded</p>
                                )}
                            </div>

                            {viewing.message && (
                                <div style={{ marginTop: '1rem', background: '#f9f9f9', padding: '1rem', borderRadius: '4px' }}>
                                    <strong>Additional Message:</strong>
                                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{viewing.message}</p>
                                </div>
                            )}
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationsList;
