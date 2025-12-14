import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL, API_BASE_URL } from '../../config';
import { Pencil, Trash2, Plus } from 'lucide-react';

const TeamManagement = () => {
    const [team, setTeam] = useState([]);
    const [editing, setEditing] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        shortDescription: '',
        profileImage: '',
        linkedin: '',
        github: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await api.getTeam();
        setTeam(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this team member?')) {
            await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const handleEdit = (item) => {
        setEditing(item.id);
        setFormData({
            name: item.name,
            role: item.role,
            shortDescription: item.shortDescription || '',
            profileImage: item.profileImage || '',
            linkedin: item.linkedin || '',
            github: item.github || '',
            email: item.email || ''
        });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({
            name: '',
            role: '',
            shortDescription: '',
            profileImage: '',
            linkedin: '',
            github: '',
            email: ''
        });
        setIsFormOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formDataUpload = new FormData();
        formDataUpload.append('profileImage', file);

        try {
            const response = await fetch(`${API_URL}/upload/upload`, {
                method: 'POST',
                body: formDataUpload
            });
            const data = await response.json();
            if (data.imageUrl) {
                setFormData({ ...formData, profileImage: data.imageUrl });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editing ? `${API_URL}/team/${editing}` : `${API_URL}/team`;
        const method = editing ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Manage Team</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={16} style={{ marginRight: '5px' }} /> Add Member
                </button>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(s => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                <td>{s.role}</td>
                                <td>{s.email || '-'}</td>
                                <td>
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
                    <div className="modal-content" style={{ maxWidth: '600px' }}>
                        <h3>{editing ? 'Edit Team Member' : 'Add Team Member'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name *</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Role *</label>
                                <input type="text" required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Short Description</label>
                                <textarea rows="3" value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} placeholder="Brief bio or description"></textarea>
                            </div>
                            <div className="form-group">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formData.profileImage && (
                                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                        <img
                                            src={formData.profileImage.startsWith('http') || formData.profileImage.startsWith('data:') ? formData.profileImage : `${API_BASE_URL}${formData.profileImage}`}
                                            alt="Preview"
                                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>LinkedIn URL</label>
                                <input type="url" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} placeholder="https://linkedin.com/in/username" />
                            </div>
                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input type="url" value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} placeholder="https://github.com/username" />
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

export default TeamManagement;
