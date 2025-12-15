import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL } from '../../config';
import { Pencil, Trash2, Plus, Ban } from 'lucide-react';

const CareersManagement = () => {
    const [jobs, setJobs] = useState([]);
    const [editing, setEditing] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '', type: '', location: '', description: '', responsibilities: '', requirements: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await api.getJobs();
        setJobs(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this job post?')) {
            await fetch(`${API_URL}/careers/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const handleToggleStatus = async (item) => {
        const newStatus = item.isOpen === false; // If false (closed) -> true (open), else false
        const confirmMsg = newStatus
            ? 'Reopen this job position?'
            : 'Close this job position? It will be hidden from the website.';

        if (window.confirm(confirmMsg)) {
            try {
                await fetch(`${API_URL}/careers/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isOpen: newStatus })
                });
                fetchData();
            } catch (error) {
                console.error("Failed to update status", error);
            }
        }
    };

    const handleEdit = (item) => {
        setEditing(item.id);
        setFormData({
            title: item.title, type: item.type || '', location: item.location || '',
            description: item.description || '', responsibilities: item.responsibilities || '',
            requirements: item.requirements || ''
        });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({ title: '', type: 'Full-time', location: 'Onsite', description: '', responsibilities: '', requirements: '' });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editing ? `${API_URL}/careers/${editing}` : `${API_URL}/careers`;
        const method = editing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(`Error: ${data.details || data.error || 'Failed to save'}`);
                return;
            }

            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Manage Careers</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={16} style={{ marginRight: '5px' }} /> Add Job Post
                </button>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(s => (
                            <tr key={s.id}>
                                <td>{s.title}</td>
                                <td>{s.type}</td>
                                <td>{s.location}</td>
                                <td>
                                    <span style={{
                                        backgroundColor: s.isOpen === false ? '#ffebee' : '#e8f5e9',
                                        color: s.isOpen === false ? '#c62828' : '#2e7d32',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}>
                                        {s.isOpen === false ? 'Closed' : 'Open'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className="action-btn"
                                        title={s.isOpen === false ? "Reopen" : "Close"}
                                        onClick={() => handleToggleStatus(s)}
                                        style={{ color: s.isOpen === false ? '#2e7d32' : '#f57c00' }}
                                    >
                                        {s.isOpen === false ? <Plus size={14} /> : <Ban size={14} />}
                                    </button>
                                    <button className="action-btn edit-btn" onClick={() => handleEdit(s)}><Pencil size={14} /></button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editing ? 'Edit Job' : 'Add New Job'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Job Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label>Type</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Location</label>
                                    <select value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}>
                                        <option>Onsite</option>
                                        <option>Remote</option>
                                        <option>Hybrid</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="3" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Responsibilities</label>
                                <textarea rows="3" value={formData.responsibilities} onChange={e => setFormData({ ...formData, responsibilities: e.target.value })}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Requirements</label>
                                <textarea rows="3" value={formData.requirements} onChange={e => setFormData({ ...formData, requirements: e.target.value })}></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareersManagement;
