import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL } from '../../config';
import { Calendar, Check, X, Trash2, Clock, Mail, User } from 'lucide-react';
import '../../styles/Admin.css';

const MeetingManagement = () => {
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = () => {
        api.getMeetings()
            .then(data => {
                // Sort by date (newest first)
                const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setMeetings(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleStatusUpdate = async (id, status) => {
        let data = {};

        if (status === 'confirmed') {
            const link = window.prompt("Please enter the Google Meet Link for this meeting:");
            if (!link) return; // Cancel if no link provided
            data.meetingLink = link;
        } else if (status === 'cancelled') {
            const reason = window.prompt("Please enter the reason for cancellation:");
            if (!reason) return; // Cancel if no reason provided
            data.cancellationReason = reason;
        }

        try {
            await api.updateMeetingStatus(id, status, data);
            fetchMeetings(); // Refresh list
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this meeting?")) return;
        try {
            await fetch(`${API_URL}/meetings/${id}`, { method: 'DELETE' });
            fetchMeetings();
        } catch (error) {
            console.error("Error deleting meeting:", error);
        }
    };

    const formatDate = (dateString, timeString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString).toLocaleDateString();
        return `${date} at ${timeString}`;
    };

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Meeting Schedules</h1>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Contact Info</th>
                                <th>Topic</th>
                                <th style={{ width: '25%' }}>Reason</th>
                                <th>Requested Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meetings.length === 0 ? (
                                <tr><td colSpan="6">No meeting requests found.</td></tr>
                            ) : (
                                meetings.map(meeting => (
                                    <tr key={meeting.id} className={!meeting.isRead ? 'unread-row' : ''}>
                                        <td>
                                            <div className="meeting-user">
                                                <User size={16} /> <strong>{meeting.name}</strong>
                                            </div>
                                            <div className="meeting-email">
                                                <Mail size={14} /> {meeting.email}
                                            </div>
                                        </td>
                                        <td>{meeting.topic}</td>
                                        <td>
                                            <div style={{ whiteSpace: 'pre-wrap', maxHeight: '100px', overflowY: 'auto', fontSize: '0.9rem', color: '#555' }}>
                                                {meeting.reason || <span style={{ fontStyle: 'italic', color: '#999' }}>No reason provided</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="meeting-time">
                                                <Calendar size={16} /> {meeting.date}
                                                <span style={{ marginLeft: '5px', color: '#666' }}><Clock size={14} /> {meeting.time}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-badge status-${meeting.status}`}>
                                                {meeting.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {meeting.status !== 'confirmed' && (
                                                    <button
                                                        className="action-btn btn-confirm"
                                                        title="Confirm"
                                                        onClick={() => handleStatusUpdate(meeting.id, 'confirmed')}
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                )}
                                                {meeting.status !== 'cancelled' && (
                                                    <button
                                                        className="action-btn btn-cancel"
                                                        title="Cancel"
                                                        onClick={() => handleStatusUpdate(meeting.id, 'cancelled')}
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    className="action-btn btn-delete"
                                                    title="Delete"
                                                    onClick={() => handleDelete(meeting.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MeetingManagement;
