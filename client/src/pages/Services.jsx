import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/Services.css';
import { Code, Cpu, Globe, Layout, Layers, ShieldCheck } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getServices()
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes('web')) return <Globe />;
        if (t.includes('ai') || t.includes('intelligence')) return <Cpu />;
        if (t.includes('app')) return <Layout />;
        if (t.includes('erp')) return <Layers />;
        if (t.includes('quality') || t.includes('test')) return <ShieldCheck />;
        return <Code />;
    };

    return (
        <div className="page-container">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="hero-motion-bg">
                    <Globe className="motion-icon icon-1" />
                    <Cpu className="motion-icon icon-2" />
                    <Code className="motion-icon icon-3" />
                    <Layout className="motion-icon icon-4" />
                    <Layers className="motion-icon icon-5" />
                    <ShieldCheck className="motion-icon icon-6" />
                </div>
                <div className="container hero-content-center">
                    <h1>Comprehensive Tech Solutions</h1>
                    <p>Comprehensive technology solutions tailored to modernize your business.</p>
                </div>
            </section>

            <div className="container section">

                {loading ? (
                    <p>Loading services...</p>
                ) : (
                    <div className="services-list">
                        {!Array.isArray(services) || services.length === 0 ? <p>No services found.</p> : null}
                        {Array.isArray(services) && services.map(service => (
                            <div key={service.id} className="service-item">
                                <div className="service-icon-large">{getIcon(service.title)}</div>
                                <div className="service-content">
                                    <h2>{service.title}</h2>
                                    <p className="service-short">{service.shortDescription}</p>
                                    <div className="service-details">
                                        {service.detailedDescription || service.description || "More details coming soon."}
                                    </div>
                                    {/* Benefits could be listed here if available in data */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;
