import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL } from '../../config';
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';

const ServicesManagement = () => {
    const [services, setServices] = useState([]);
    const [editing, setEditing] = useState(null); // ID of service being edited or null
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', icon: '' });
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
        setFormData({
            title: service.title,
            description: service.description || service.shortDescription || '',
            icon: service.icon || ''
        });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({ title: '', description: '', icon: '' });
        setIsFormOpen(true);
    };

    const handleMoveUp = async (service, index) => {
        if (index === 0) return; // Already at top
        const targetPosition = services[index - 1].order_position;

        try {
            await fetch(`${API_URL}/services/reorder`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serviceId: service.id, targetPosition })
            });
            fetchServices();
        } catch (error) {
            console.error('Failed to reorder:', error);
        }
    };

    const handleMoveDown = async (service, index) => {
        if (index === services.length - 1) return; // Already at bottom
        const targetPosition = services[index + 1].order_position;

        try {
            await fetch(`${API_URL}/services/reorder`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ serviceId: service.id, targetPosition })
            });
            fetchServices();
        } catch (error) {
            console.error('Failed to reorder:', error);
        }
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
                {/* Desktop Table View */}
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Order</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th style={{ width: '120px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((s, index) => (
                            <tr key={s.id}>
                                <td>
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <button
                                            className="action-btn"
                                            onClick={() => handleMoveUp(s, index)}
                                            disabled={index === 0}
                                            style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                                            title="Move up"
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                        <button
                                            className="action-btn"
                                            onClick={() => handleMoveDown(s, index)}
                                            disabled={index === services.length - 1}
                                            style={{ opacity: index === services.length - 1 ? 0.3 : 1, cursor: index === services.length - 1 ? 'not-allowed' : 'pointer' }}
                                            title="Move down"
                                        >
                                            <ArrowDown size={14} />
                                        </button>
                                        <span style={{ fontSize: '0.85rem', color: '#666', minWidth: '20px' }}>#{index + 1}</span>
                                    </div>
                                </td>
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

                {/* Mobile Card View */}
                <div className="mobile-card-list">
                    {services.map((s, index) => (
                        <div key={s.id} className="mobile-service-card">
                            <div className="mobile-card-header">
                                <div className="mobile-card-title">{s.title}</div>
                                <div className="mobile-card-order">
                                    <button
                                        className="action-btn"
                                        onClick={() => handleMoveUp(s, index)}
                                        disabled={index === 0}
                                        style={{ opacity: index === 0 ? 0.3 : 1 }}
                                        title="Move up"
                                    >
                                        <ArrowUp size={16} />
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={() => handleMoveDown(s, index)}
                                        disabled={index === services.length - 1}
                                        style={{ opacity: index === services.length - 1 ? 0.3 : 1 }}
                                        title="Move down"
                                    >
                                        <ArrowDown size={16} />
                                    </button>
                                    <div className="mobile-card-position">#{index + 1}</div>
                                </div>
                            </div>
                            <div className="mobile-card-body">
                                <div className="mobile-card-description">
                                    {s.description || s.shortDescription}
                                </div>
                            </div>
                            <div className="mobile-card-actions">
                                <button className="action-btn edit-btn" onClick={() => handleEdit(s)}>
                                    <Pencil size={14} style={{ marginRight: '5px' }} /> Edit
                                </button>
                                <button className="action-btn delete-btn" onClick={() => handleDelete(s.id)}>
                                    <Trash2 size={14} style={{ marginRight: '5px' }} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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
                            <div className="form-group">
                                <label>Icon Name (e.g., Globe, Code, Cpu)</label>
                                <input type="text" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="Enter Lucide icon name" />
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
