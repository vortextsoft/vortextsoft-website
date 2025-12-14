import { API_URL } from '../config';


// Helper to handle responses
const handleResponse = async (res) => {
    if (!res.ok) {
        const errorText = await res.text();
        try {
            const errorJson = JSON.parse(errorText);
            throw new Error(errorJson.error || 'API Request Failed');
        } catch (e) {
            throw new Error(`API Request Failed: ${res.status} ${res.statusText}`);
        }
    }
    return res.json();
};

export const api = {
    getServices: () => fetch(`${API_URL}/services`).then(handleResponse),
    getCaseStudies: () => fetch(`${API_URL}/casestudies`).then(handleResponse),
    getBlogPosts: () => fetch(`${API_URL}/blog`).then(handleResponse),
    getTeam: () => fetch(`${API_URL}/team`).then(handleResponse),
    getJobs: () => fetch(`${API_URL}/careers`).then(handleResponse),
    getPartners: () => fetch(`${API_URL}/partners`).then(handleResponse),
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
