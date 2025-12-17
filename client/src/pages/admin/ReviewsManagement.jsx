import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import { Pencil, Trash2, Plus, ArrowUp, ArrowDown, Star } from 'lucide-react';

const ReviewsManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [editing, setEditing] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company_name: '',
        review: '',
        star_rating: 5,
        profile_image: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${API_URL}/reviews`);
            const data = await response.json();
            setReviews(data);
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            await fetch(`${API_URL}/reviews/${id}`, { method: 'DELETE' });
            fetchReviews();
        }
    };

    const handleEdit = (review) => {
        setEditing(review.id);
        setFormData({
            name: review.name,
            company_name: review.company_name || '',
            review: review.review,
            star_rating: review.star_rating,
            profile_image: review.profile_image || ''
        });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({
            name: '',
            company_name: '',
            review: '',
            star_rating: 5,
            profile_image: ''
        });
        setIsFormOpen(true);
    };

    const handleMoveUp = async (review, index) => {
        if (index === 0) return;
        const targetPosition = reviews[index - 1].order_position;

        try {
            await fetch(`${API_URL}/reviews/reorder`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewId: review.id, targetPosition })
            });
            fetchReviews();
        } catch (error) {
            console.error('Failed to reorder:', error);
        }
    };

    const handleMoveDown = async (review, index) => {
        if (index === reviews.length - 1) return;
        const targetPosition = reviews[index + 1].order_position;

        try {
            await fetch(`${API_URL}/reviews/reorder`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reviewId: review.id, targetPosition })
            });
            fetchReviews();
        } catch (error) {
            console.error('Failed to reorder:', error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profile_image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editing ? `${API_URL}/reviews/${editing}` : `${API_URL}/reviews`;
        const method = editing ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to save review');
            }

            setIsFormOpen(false);
            fetchReviews();
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}. Make sure you've run /api/setup to create the database tables.`);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return (
            <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                    <Star
                        key={star}
                        size={16}
                        fill={star <= rating ? '#FFD700' : 'none'}
                        stroke={star <= rating ? '#FFD700' : '#ccc'}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="admin-header">
                <h2>Manage Reviews/Testimonials</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={16} style={{ marginRight: '5px' }} /> Add New Review
                </button>
            </div>

            <div className="admin-card">
                {/* Desktop Table View */}
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Order</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Likes</th>
                            <th style={{ width: '120px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r, index) => (
                            <tr key={r.id}>
                                <td>
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <button
                                            className="action-btn"
                                            onClick={() => handleMoveUp(r, index)}
                                            disabled={index === 0}
                                            style={{ opacity: index === 0 ? 0.3 : 1, cursor: index === 0 ? 'not-allowed' : 'pointer' }}
                                            title="Move up"
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                        <button
                                            className="action-btn"
                                            onClick={() => handleMoveDown(r, index)}
                                            disabled={index === reviews.length - 1}
                                            style={{ opacity: index === reviews.length - 1 ? 0.3 : 1, cursor: index === reviews.length - 1 ? 'not-allowed' : 'pointer' }}
                                            title="Move down"
                                        >
                                            <ArrowDown size={14} />
                                        </button>
                                        <span style={{ fontSize: '0.85rem', color: '#666', minWidth: '20px' }}>#{index + 1}</span>
                                    </div>
                                </td>
                                <td>{r.name}</td>
                                <td>{r.company_name || '-'}</td>
                                <td>{renderStars(r.star_rating)}</td>
                                <td>{r.review.substring(0, 50)}...</td>
                                <td>{r.likes_count || 0}</td>
                                <td>
                                    <button className="action-btn edit-btn" onClick={() => handleEdit(r)}><Pencil size={14} /></button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(r.id)}><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="mobile-card-list">
                    {reviews.map((r, index) => (
                        <div key={r.id} className="mobile-service-card">
                            <div className="mobile-card-header">
                                <div>
                                    <div className="mobile-card-title">{r.name}</div>
                                    {r.company_name && <div style={{ fontSize: '0.9rem', color: '#666' }}>{r.company_name}</div>}
                                    <div style={{ marginTop: '0.5rem' }}>{renderStars(r.star_rating)}</div>
                                </div>
                                <div className="mobile-card-order">
                                    <button
                                        className="action-btn"
                                        onClick={() => handleMoveUp(r, index)}
                                        disabled={index === 0}
                                        style={{ opacity: index === 0 ? 0.3 : 1 }}
                                        title="Move up"
                                    >
                                        <ArrowUp size={16} />
                                    </button>
                                    <button
                                        className="action-btn"
                                        onClick={() => handleMoveDown(r, index)}
                                        disabled={index === reviews.length - 1}
                                        style={{ opacity: index === reviews.length - 1 ? 0.3 : 1 }}
                                        title="Move down"
                                    >
                                        <ArrowDown size={16} />
                                    </button>
                                    <div className="mobile-card-position">#{index + 1}</div>
                                </div>
                            </div>
                            <div className="mobile-card-body">
                                <div className="mobile-card-description">{r.review}</div>
                                <div style={{ marginTop: '0.5rem', color: '#999', fontSize: '0.85rem' }}>
                                    ❤️ {r.likes_count || 0} likes
                                </div>
                            </div>
                            <div className="mobile-card-actions">
                                <button className="action-btn edit-btn" onClick={() => handleEdit(r)}>
                                    <Pencil size={14} style={{ marginRight: '5px' }} /> Edit
                                </button>
                                <button className="action-btn delete-btn" onClick={() => handleDelete(r.id)}>
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
                        <h3>{editing ? 'Edit Review' : 'Add New Review'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    value={formData.company_name}
                                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Review *</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.review}
                                    onChange={e => setFormData({ ...formData, review: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Star Rating *</label>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={32}
                                            fill={star <= formData.star_rating ? '#FFD700' : 'none'}
                                            stroke={star <= formData.star_rating ? '#FFD700' : '#ccc'}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setFormData({ ...formData, star_rating: star })}
                                        />
                                    ))}
                                    <span style={{ marginLeft: '8px', color: '#666' }}>({formData.star_rating} stars)</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formData.profile_image && (
                                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img
                                            src={formData.profile_image}
                                            alt="Preview"
                                            style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setFormData({ ...formData, profile_image: '' })}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save Review'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewsManagement;
