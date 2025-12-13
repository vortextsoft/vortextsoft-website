// Automatically determine the backend URL
// In production (Vercel), set VITE_API_URL environment variable.
// In development, it defaults to localhost:3001.

const hostname = window.location.hostname;

export const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${hostname}:3001`;

// Helper for full API routes
export const API_URL = `${API_BASE_URL}/api`;

console.log('API Configured at:', API_BASE_URL);
