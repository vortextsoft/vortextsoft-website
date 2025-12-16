import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL, API_BASE_URL } from '../../config';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Editor from 'react-simple-wysiwyg';

const CaseStudiesManagement = () => {
    const [cases, setCases] = useState([]);
    const [editing, setEditing] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        clientName: '',
        category: '',
        clientType: '',
        subtitle: '',
        problemStatement: '',
        solution: '',
        results: '',
        features: [],
        heroImage: '',
        heroVideo: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await api.getCaseStudies();
        setCases(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this case study?')) {
            await fetch(`${API_URL}/casestudies/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const handleEdit = (item) => {
        setEditing(item.id);
        setFormData({
            title: item.title,
            clientName: item.client_name || '',
            category: item.category || '',
            clientType: item.client_type || '',
            subtitle: item.subtitle || '',
            problemStatement: item.problem_statement || '',
            solution: item.solution || '',
            results: item.results || '',
            features: item.features || [],
            heroImage: item.hero_image || '',
            heroVideo: item.hero_video || ''
        });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({
            title: '',
            clientName: '',
            category: '',
            clientType: '',
            subtitle: '',
            problemStatement: '',
            solution: '',
            results: '',
            features: [],
            heroImage: '',
            heroVideo: ''
        });
        setIsFormOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validImageTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }

        setUploadingImage(true);
        const formDataUpload = new FormData();
        formDataUpload.append('document', file);

        try {
            const response = await fetch(`${API_URL}/upload/document`, {
                method: 'POST',
                body: formDataUpload
            });
            const data = await response.json();
            if (data.fileUrl) {
                setFormData({ ...formData, heroImage: data.fileUrl });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if (!validVideoTypes.includes(file.type)) {
            alert('Please upload a valid video file (MP4, WebM, or OGG)');
            return;
        }

        setUploadingVideo(true);
        const formDataUpload = new FormData();
        formDataUpload.append('document', file);

        try {
            const response = await fetch(`${API_URL}/upload/document`, {
                method: 'POST',
                body: formDataUpload
            });
            const data = await response.json();
            if (data.fileUrl) {
                setFormData({ ...formData, heroVideo: data.fileUrl });
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Failed to upload video');
        } finally {
            setUploadingVideo(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editing ? `${API_URL}/casestudies/${editing}` : `${API_URL}/casestudies`;
        const method = editing ? 'PUT' : 'POST';

        try {
            const payload = {
                ...formData,
                features: Array.isArray(formData.features) ? formData.features : [formData.features]
            };
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
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
                <h2>Manage Case Studies</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={16} style={{ marginRight: '5px' }} /> Add New Case Study
                </button>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Client Name</th>
                            <th>Client/Industry</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map(s => (
                            <tr key={s.id}>
                                <td>{s.title}</td>
                                <td>{s.client_name || '-'}</td>
                                <td>{s.client_type}</td>
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
                        <h3>{editing ? 'Edit Case Study' : 'Add Case Study'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Project Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Client Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., SmartMart, TechCorp, etc."
                                    value={formData.clientName}
                                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    placeholder="e.g., WEBSITE DEVELOPMENT, MOBILE APP, etc."
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Client Type / Industry</label>
                                <input type="text" value={formData.clientType} onChange={e => setFormData({ ...formData, clientType: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Subtitle / Brief Description</label>
                                <textarea
                                    rows="2"
                                    placeholder="A brief description that appears below the title"
                                    value={formData.subtitle}
                                    onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Features</label>
                                <Editor
                                    value={Array.isArray(formData.features) ? '<ul>' + formData.features.map(f => `<li>${f}</li>`).join('') + '</ul>' : formData.features}
                                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Problem Statement</label>
                                <Editor value={formData.problemStatement} onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Solution</label>
                                <Editor value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Results</label>
                                <Editor value={formData.results} onChange={(e) => setFormData({ ...formData, results: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Upload Image</label>
                                <div className="file-upload-wrapper">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        id="image-upload"
                                    />
                                    {uploadingImage && <span className="upload-status">Uploading...</span>}
                                    {formData.heroImage && <span className="upload-status success">✓ Uploaded</span>}
                                </div>
                                {formData.heroImage && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={`${API_BASE_URL}${formData.heroImage}`} alt="Preview" style={{ maxWidth: '200px', maxHeight: '150px', borderRadius: '4px' }} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Upload Video (Optional)</label>
                                <div className="file-upload-wrapper">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={handleVideoUpload}
                                        id="video-upload"
                                    />
                                    {uploadingVideo && <span className="upload-status">Uploading...</span>}
                                    {formData.heroVideo && <span className="upload-status success">✓ Uploaded</span>}
                                </div>
                                {formData.heroVideo && (
                                    <div style={{ marginTop: '10px' }}>
                                        <video src={`${API_BASE_URL}${formData.heroVideo}`} controls style={{ maxWidth: '300px', maxHeight: '200px', borderRadius: '4px' }} />
                                    </div>
                                )}
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

export default CaseStudiesManagement;
