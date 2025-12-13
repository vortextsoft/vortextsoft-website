import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL } from '../../config';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ServicesManagement = () => {
    const [services, setServices] = useState([]);
    const [editing, setEditing] = useState(null); // ID of service being edited or null
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const data = await api.getServices();
        setServices(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
            fetchServices();
        }
    };

    const handleEdit = (service) => {
        setEditing(service.id);
        setFormData({ title: service.title, description: service.description || service.shortDescription || '' });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({ title: '', description: '' });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editing ? `${API_URL}/services/${editing}` : `${API_URL}/services`;
        const method = editing ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setIsFormOpen(false);
            fetchServices();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Manage Services</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={16} style={{ marginRight: '5px' }} /> Add New Service
                </button>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(s => (
                            <tr key={s.id}>
                                <td>{s.title}</td>
                                <td>{(s.description || s.shortDescription)?.substring(0, 50)}...</td>
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
                    <div className="modal-content">
                        <h3>{editing ? 'Edit Service' : 'Add New Service'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea required rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Service'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServicesManagement;
