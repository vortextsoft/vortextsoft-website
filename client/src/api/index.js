import { API_URL } from '../config';


export const api = {
    getServices: () => fetch(`${API_URL}/services`).then(res => res.json()),
    getCaseStudies: () => fetch(`${API_URL}/casestudies`).then(res => res.json()),
    getBlogPosts: () => fetch(`${API_URL}/blog`).then(res => res.json()),
    getTeam: () => fetch(`${API_URL}/team`).then(res => res.json()),
    getJobs: () => fetch(`${API_URL}/careers`).then(res => res.json()),
    getPartners: () => fetch(`${API_URL}/partners`).then(res => res.json()),
    addPartner: (data) => fetch(`${API_URL}/partners`, { // No auth header for now based on context
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    deletePartner: (id) => fetch(`${API_URL}/partners/${id}`, {
        method: 'DELETE'
    }).then(res => res.json()),

    // Post methods
    sendContactMessage: (data) => fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    submitApplication: (data) => fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Auth
    login: (credentials) => fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(res => {
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    }),

    // Uploads
    uploadPartnerLogo: (formData) => fetch(`${API_URL}/upload/partner`, {
        method: 'POST',
        body: formData
    }).then(res => res.json()),
    // Meetings
    getMeetings: async () => {
        const response = await fetch(`${API_URL}/meetings`);
        return response.json();
    },
    scheduleMeeting: async (meetingData) => {
        const response = await fetch(`${API_URL}/meetings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meetingData)
        });
        if (!response.ok) throw new Error('Failed to schedule meeting');
        return response.json();
    },
    updateMeetingStatus: async (id, status, data = {}) => {
        const response = await fetch(`${API_URL}/meetings/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, ...data })
        });
        return response.json();
    },
    markMeetingAsRead: async (id) => {
        const response = await fetch(`${API_URL}/meetings/${id}/read`, {
            method: 'PATCH'
        });
        return response.json();
    }
};
