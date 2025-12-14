import React, { useEffect, useState } from 'react';
import { api } from '../../api';
import { API_URL } from '../../config';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        services: 0,
        caseStudies: 0,
        posts: 0,
        jobs: 0,
        applications: 0,
        messages: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all parallel for simple stats (could be optimized with a dedicated /stats endpoint)
                const [s, c, b, j, a, m] = await Promise.all([
                    api.getServices(),
                    api.getCaseStudies(),
                    api.getBlogPosts(),
                    api.getJobs(),
                    api.submitApplication ? fetch(`${API_URL}/applications`).then(r => r.json()) : Promise.resolve([]),
                    fetch(`${API_URL}/contact`).then(r => r.json())
                ]);
                setStats({
                    services: s.length,
                    caseStudies: c.length,
                    posts: b.length,
                    jobs: j.length,
                    applications: a.length,
                    messages: m.length
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <div className="admin-header">
                <h2>Dashboard Overview</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <StatCard title="Services" count={stats.services} color="#0094FF" />
                <StatCard title="Case Studies" count={stats.caseStudies} color="#00E89F" />
                <StatCard title="Blog Posts" count={stats.posts} color="#FFD700" />
                <StatCard title="Open Jobs" count={stats.jobs} color="#FF6B6B" />
                <StatCard title="Applications" count={stats.applications} color="#9B59B6" />
                <StatCard title="Messages" count={stats.messages} color="#34495E" />
            </div>

            <div style={{ marginTop: '3rem' }}>
                <h3>Quick Actions</h3>
                <p>Use the sidebar to manage content.</p>
            </div>
        </div>
    );
};

const StatCard = ({ title, count, color }) => (
    <div className="admin-card" style={{ borderLeft: `5px solid ${color}` }}>
        <h4 style={{ color: '#666', marginBottom: '0.5rem' }}>{title}</h4>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{count}</div>
    </div>
);

export default AdminDashboard;
