import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Settings, FileText, Users, Briefcase, Mail, LogOut, Layers, CalendarCheck, Star } from 'lucide-react';
import { api } from '../api';
import '../styles/Admin.css';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [meetingCount, setMeetingCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        // Fetch pending meetings count
        const fetchCount = () => {
            api.getMeetings()
                .then(data => {
                    if (Array.isArray(data)) {
                        const pending = data.filter(m => !m.isRead && m.status === 'pending').length;
                        setMeetingCount(pending);
                    }
                })
                .catch(console.error);
        };
        fetchCount();
        const interval = setInterval(fetchCount, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [location.pathname]);

    useEffect(() => {
        // Fetch unread messages count
        const fetchMessageCount = async () => {
            try {
                const response = await fetch('/api/messages/unread-count');
                const data = await response.json();
                setMessageCount(data.count || 0);
            } catch (error) {
                console.error('Failed to fetch message count:', error);
            }
        };
        fetchMessageCount();
        const interval = setInterval(fetchMessageCount, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, [location.pathname]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <div className={`mobile-header ${isSidebarOpen ? 'hidden' : ''}`}>
                <button className="menu-btn" onClick={() => setIsSidebarOpen(true)}>
                    <Layers size={24} />
                </button>
                <span className="mobile-brand">VortextAdmin</span>
            </div>

            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    VortextAdmin
                    <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>
                        <LogOut size={20} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/services" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Settings size={20} /> Services
                    </NavLink>
                    <NavLink to="/admin/casestudies" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Layers size={20} /> Case Studies
                    </NavLink>
                    <NavLink to="/admin/blog" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FileText size={20} /> Blog
                    </NavLink>
                    <NavLink to="/admin/team" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Users size={20} /> Team
                    </NavLink>
                    <NavLink to="/admin/partners" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Users size={20} /> Partners
                    </NavLink>
                    <NavLink to="/admin/careers" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Briefcase size={20} /> Careers
                    </NavLink>
                    <NavLink to="/admin/applications" className={({ isActive }) => isActive ? 'active' : ''}>
                        <FileText size={20} /> Applications
                    </NavLink>
                    <NavLink to="/admin/messages" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Mail size={20} /> Messages
                        {messageCount > 0 && <span className="sidebar-badge">{messageCount}</span>}
                    </NavLink>
                    <NavLink to="/admin/meetings" className={({ isActive }) => isActive ? 'active' : ''}>
                        <CalendarCheck size={20} /> Meetings
                        {meetingCount > 0 && <span className="sidebar-badge">{meetingCount}</span>}
                    </NavLink>
                    <NavLink to="/admin/reviews" className={({ isActive }) => isActive ? 'active' : ''}>
                        <Star size={20} /> Reviews
                    </NavLink>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
