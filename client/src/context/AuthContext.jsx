import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token on mount
        const token = localStorage.getItem('token');
        if (token) {
            // ideally verify token with backend, for now assume valid if present
            // and decode or just set dummy user state
            setUser({ email: 'admin@vortextsoft.com' });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await api.login({ email, password });
            localStorage.setItem('token', data.token);
            setUser(data.user);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}
