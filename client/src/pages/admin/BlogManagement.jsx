import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL, API_BASE_URL } from '../../config';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import Editor from 'react-simple-wysiwyg';

const BlogManagement = () => {
    const [posts, setPosts] = useState([]);
    const [editing, setEditing] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', tags: '', content: '', imageUrl: '', link: '', isVisible: true });
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await api.getBlogPosts();
        setPosts(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this post?')) {
            await fetch(`${API_URL}/blog/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const toggleVisibility = async (post) => {
        try {
            await fetch(`${API_URL}/blog/${post.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_visible: !post.is_visible })
            });
            fetchData();
        } catch (error) {
            console.error("Error updating visibility:", error);
        }
    };

    const handleEdit = (item) => {
        setEditing(item.id);
        setFormData({
            title: item.title,
            tags: item.tags || '',
            content: item.content || '',
            imageUrl: item.image_url || '',
            link: item.link || '',
            isVisible: item.is_visible !== undefined ? item.is_visible : true
        });
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditing(null);
        setFormData({ title: '', tags: '', content: '', imageUrl: '', link: '', isVisible: true });
        setIsFormOpen(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append('document', file);

        setUploadingImage(true);
        try {
            const res = await fetch(`${API_URL}/upload/document`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (res.ok) {
                setFormData(prev => ({ ...prev, imageUrl: result.fileUrl }));
            } else {
                alert('Upload failed: ' + result.message);
            }
        } catch (error) {
            console.error(error);
            alert('Upload error');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const url = editing ? `${API_URL}/blog/${editing}` : `${API_URL}/blog`;
        const method = editing ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData) // Add publishDate automatically in backend or here?
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
                <h2>Manage Blog Posts</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    <Plus size={16} style={{ marginRight: '5px' }} /> Add New Post
                </button>
            </div>

            <div className="admin-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Published</th>
                            <th>Mark (Visible)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(s => (
                            <tr key={s.id}>
                                <td>{s.title}</td>
                                <td>{s.tags}</td>
                                <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : 'Now'}</td>
                                <td>
                                    <button
                                        className="action-btn"
                                        onClick={() => toggleVisibility(s)}
                                        title={s.is_visible ? "Marked Visible" : "Marked Hidden"}
                                    >
                                        {s.is_visible ? <Eye size={18} color="green" /> : <EyeOff size={18} color="gray" />}
                                    </button>
                                </td>
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
                        <h3>{editing ? 'Edit Post' : 'Add New Post'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Tags (comma separated)</label>
                                <input type="text" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label>Image</label>
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploadingImage}
                                        className="file-input"
                                    />
                                    {uploadingImage && <span className="upload-status">Uploading...</span>}
                                    {formData.imageUrl && (
                                        <div className="image-preview-mini">
                                            <img src={`${API_BASE_URL}${formData.imageUrl}`} alt="Preview" style={{ height: '50px', objectFit: 'cover', marginTop: '10px' }} />
                                            <button
                                                type="button"
                                                className="remove-file-btn"
                                                onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                                style={{ marginLeft: '10px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>External Link (Read More URL)</label>
                                <input type="text" placeholder="https://..." value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(value) => setFormData({ ...formData, content: value })}
                                    style={{ height: '300px', marginBottom: '50px' }}
                                />
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

export default BlogManagement;
