// Automatically determine the backend URL based on the current hostname
// This allows the app to work on localhost and local network IPs (e.g., 10.x.x.x, 192.168.x.x)

// Production-ready config
const isDevelopment = window.location.hostname === 'localhost';

export const API_BASE_URL = isDevelopment
    ? 'http://localhost:3001'
    : ''; // Relative path in production (Netlify handles /api proxy)

// Helper for full API routes
export const API_URL = `${API_BASE_URL}/api`;

console.log('API Configured at:', API_BASE_URL || 'Relative Path (Netlify)');
