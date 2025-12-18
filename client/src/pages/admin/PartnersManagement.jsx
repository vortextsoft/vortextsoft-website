import React, { useState, useEffect } from 'react';
import { api } from '../../api';
import { API_BASE_URL } from '../../config';
import { Trash2, Plus, Upload, ImageIcon } from 'lucide-react';

const PartnersManagement = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        logoFile: null,
        previewUrl: ''
    });

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = () => {
        api.getPartners()
            .then(data => {
                setPartners(data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch partners', err);
                setLoading(false);
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                logoFile: file,
                previewUrl: URL.createObjectURL(file)
            });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.logoFile) {
            alert('Please provide both company name and logo.');
            return;
        }

        setSubmitting(true);

        try {
            // 1. Upload Image
            const uploadData = new FormData();
            uploadData.append('logo', formData.logoFile);

            const uploadRes = await api.uploadPartnerLogo(uploadData);

            if (!uploadRes.imageUrl) {
                throw new Error('Upload failed');
            }

            const logoUrl = `${API_BASE_URL}${uploadRes.imageUrl}`; // Ensure absolute URL for frontend

            // 2. Create Partner
            const newPartner = await api.addPartner({
                name: formData.name,
                logo: logoUrl
            });

            setPartners([...partners, newPartner]);
            setFormData({ name: '', logoFile: null, previewUrl: '' });
            alert('Partner added successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add partner. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this partner?')) {
            api.deletePartner(id)
                .then(() => {
                    setPartners(partners.filter(p => p.id !== id));
                })
                .catch(err => alert('Failed to delete partner'));
        }
    };

    return (
        <div className="admin-section">
            <div className="section-header-admin">
                <h2>Partners Management</h2>
                <p>Manage your ecosystem partners and display their logos on the home page.</p>
            </div>

            <div className="admin-grid-layout">
                {/* Form Section */}
                <div className="admin-card form-card">
                    <h3><Plus size={18} /> Add New Partner</h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Acme Corp"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Company Logo</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    id="logo-upload"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input-hidden"
                                />
                                <label htmlFor="logo-upload" className="file-upload-label">
                                    {formData.previewUrl ? (
                                        <img src={formData.previewUrl} alt="Preview" className="upload-preview" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <Upload size={24} />
                                            <span>Click to upload logo</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={submitting}
                        >
                            {submitting ? 'Adding...' : 'Add Partner'}
                        </button>
                    </form>
                </div>

                {/* List Section */}
                <div className="admin-card list-card">
                    <h3>Current Partners ({partners.length})</h3>

                    {loading ? (
                        <div className="loading-state">Loading...</div>
                    ) : (
                        <div className="partners-grid-responsive">
                            {partners.length === 0 ? (
                                <div className="empty-state">
                                    <ImageIcon size={48} color="#ccc" />
                                    <p>No partners added yet.</p>
                                </div>
                            ) : (
                                partners.map(partner => (
                                    <div key={partner.id} className="partner-card-item">
                                        <div className="partner-logo-container">
                                            <img src={partner.logo} alt={partner.name} />
                                        </div>
                                        <div className="partner-details">
                                            <h4>{partner.name}</h4>
                                            <button
                                                onClick={() => handleDelete(partner.id)}
                                                className="btn-icon delete"
                                                title="Delete Partner"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .admin-grid-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                @media (min-width: 1024px) {
                    .admin-grid-layout {
                        grid-template-columns: 350px 1fr;
                    }
                }

                .section-header-admin {
                    margin-bottom: 2rem;
                }
                
                .section-header-admin p {
                    color: #666;
                }

                .form-input {
                    width: 100%;
                    padding: 0.8rem;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    margin-top: 0.5rem;
                    color: #333;
                    background: #fff;
                    font-size: 1rem;
                }

                .file-upload-wrapper {
                    margin-top: 0.5rem;
                }

                .file-input-hidden {
                    display: none;
                }

                .file-upload-label {
                    display: block;
                    width: 100%;
                    height: 150px;
                    border: 2px dashed #ddd;
                    border-radius: 8px;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.2s;
                    background: #f9f9f9;
                }

                .file-upload-label:hover {
                    border-color: var(--color-primary);
                    background: #f0f7ff;
                }

                .upload-placeholder {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: #888;
                    gap: 0.5rem;
                }

                .upload-preview {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    padding: 1rem;
                }

                .btn-block {
                    width: 100%;
                    margin-top: 1rem;
                }

                .partners-grid-responsive {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 1.5rem;
                }

                .partner-card-item {
                    background: white;
                    border: 1px solid #eee;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .partner-card-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                }

                .partner-logo-container {
                    height: 100px;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f8f9fa;
                    border-bottom: 1px solid #eee;
                }

                .partner-logo-container img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                .partner-details {
                    padding: 0.8rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .partner-details h4 {
                    font-size: 0.9rem;
                    font-weight: 600;
                    margin: 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 80%;
                }

                .delete {
                    color: #ff4d4f;
                    background: rgba(255, 77, 79, 0.1);
                    padding: 6px;
                    border-radius: 4px;
                }
                
                .delete:hover {
                    background: #ff4d4f;
                    color: white;
                }

                .empty-state {
                    text-align: center;
                    padding: 3rem;
                    color: #999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
            `}</style>
        </div>
    );
};

export default PartnersManagement;
