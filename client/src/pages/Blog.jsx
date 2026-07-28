import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Search, TrendingUp, BookOpen } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Blog.css';

const CATEGORIES = ['ALL UPDATES', 'CYBERSECURITY', 'QUANTUM COMPUTING', 'AI & ML', 'INFRASTRUCTURE'];

const DEFAULT_FEATURED_ARTICLES = [
    {
        id: 1,
        category: 'SECURITY',
        date: '18 / 12 / 2025',
        readTime: '8 MIN READ',
        title: 'Supremacy of Privacy and Security in the Digital Era',
        excerpt: 'Explore the critical importance of data privacy and security in today\'s interconnected world. Learn about the latest threats and best practices to safeguard sensitive data.',
        image: '/blog-hero.png'
    },
    {
        id: 2,
        category: 'HARDWARE',
        date: '18 / 12 / 2025',
        readTime: '12 MIN READ',
        title: 'Supremacy of Quantum Computers: The New Frontier',
        excerpt: 'Discover how quantum computing is poised to revolutionize industries. Understand the potential of qubits and their impact on optimization, drug discovery, and cryptography.',
        image: '/careers-hero-abstract.png'
    }
];

const DEFAULT_SECONDARY_ARTICLES = [
    {
        id: 3,
        category: 'AI SYSTEMS',
        title: 'The Ethics of Generative AI in Code Production',
        excerpt: 'Balancing efficiency with intellectual property integrity.',
        date: 'Dec 15, 2024'
    },
    {
        id: 4,
        category: 'CLOUD INFRA',
        title: 'Serverless Architectures: Cost vs. Performance',
        excerpt: 'A technical audit of modern cloud deployment strategies.',
        date: 'Dec 12, 2024'
    },
    {
        id: 5,
        category: 'NETWORKING',
        title: '5G Enterprise Mesh: Reducing Latency to 1ms',
        excerpt: 'The future of real-time industrial IoT connectivity.',
        date: 'Dec 10, 2024'
    }
];

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('ALL UPDATES');
    const [searchQuery, setSearchQuery] = useState('');
    const [featuredArticles, setFeaturedArticles] = useState(DEFAULT_FEATURED_ARTICLES);
    const [secondaryArticles, setSecondaryArticles] = useState(DEFAULT_SECONDARY_ARTICLES);

    useEffect(() => {
        api.getBlogPosts()
            .then(data => {
                if (data && data.length > 0) {
                    const formatted = data.map(post => ({
                        id: post.id,
                        title: post.title,
                        category: (post.tags || post.category || 'TECH').toUpperCase(),
                        date: new Date(post.createdAt || Date.now()).toLocaleDateString(),
                        excerpt: post.excerpt || post.content ? post.content.substring(0, 140) + '...' : '',
                        image: post.imageUrl || post.image_url || '/blog-hero.png',
                        link: post.link
                    }));

                    if (formatted.length >= 2) {
                        setFeaturedArticles(formatted.slice(0, 2));
                        setSecondaryArticles(formatted.slice(2));
                    } else {
                        setFeaturedArticles(formatted);
                    }
                }
            })
            .catch(err => {
                console.log("Blog posts fetch offline, using default articles:", err);
            });
    }, []);

    const filteredFeatured = featuredArticles.filter(art =>
        (art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const filteredSecondary = secondaryArticles.filter(art =>
        (art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            {/* ── SEO Meta Tags ─────────────────────────────────────────────────── */}
            <SEO
                title="Insights, Updates & Tech News"
                description="Deep dives into the architectural paradigms and security frameworks shaping the next generation of enterprise performance by Vortextsoft Pentra (Pvt) Ltd."
                path="/blog"
                image="/vortextsoft-3d-logo.png"
            />

            {/* ── Page Content ─────────────────────────────────────────────────── */}
            <main id="main-content" className="blog-page-new">

                {/* ── 1. Hero Section ── */}
                <section className="blog-hero-new" aria-label="Latest Intelligence">
                    <div className="blog-hero-container">
                        <div className="blog-hero-left">
                            <div className="blog-badge">
                                <span className="badge-dot"></span>
                                LATEST INTELLIGENCE
                            </div>
                            <h1 className="blog-headline">
                                Insights, Updates &amp;<br />
                                Tech News
                            </h1>
                            <p className="blog-subtitle">
                                Deep dives into the architectural paradigms and security frameworks shaping the next generation of enterprise performance.
                            </p>
                            <div className="blog-stats-row">
                                <div className="blog-stat">
                                    <div className="stat-value">240+</div>
                                    <div className="stat-tag">ARTICLES PUBLISHED</div>
                                </div>
                                <div className="blog-stat">
                                    <div className="stat-value">12k</div>
                                    <div className="stat-tag">MONTHLY READERS</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Dashboard Visual */}
                        <div className="blog-hero-right">
                            <div className="research-dashboard-card">
                                <div className="dashboard-header">
                                    <span className="dash-dot"></span>
                                    <span className="dash-title">ACTIVE RESEARCH NETWORK V2.4</span>
                                </div>
                                <div className="dashboard-body-image">
                                    <img
                                        src="/blog-hero.png"
                                        alt="Active Research Network Visualization"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="dashboard-badge-overlay">
                                    <TrendingUp size={14} color="#00C8CC" />
                                    <span>NEURAL MESH ACTIVE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Category Filter & Search Bar ── */}
                <section className="controls-section" aria-label="Search & Categories">
                    <div className="controls-container">
                        <div className="category-pills-row">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="search-input-box">
                            <Search className="search-icon" size={16} />
                            <input
                                type="text"
                                placeholder="Search research..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* ── 3. Featured 2 Articles Grid ── */}
                <section className="featured-articles-section" aria-label="Featured Research Articles">
                    <div className="featured-articles-container">
                        {filteredFeatured.map(article => (
                            <div key={article.id} className="article-card-featured">
                                <div className="featured-img-frame">
                                    <img src={article.image} alt={article.title} loading="lazy" />
                                </div>
                                <div className="featured-article-body">
                                    <div className="article-meta-row">
                                        <span className="art-tag">{article.category}</span>
                                        {article.date && <span className="art-tag">{article.date}</span>}
                                    </div>
                                    <h3 className="art-title">{article.title}</h3>
                                    <p className="art-excerpt">{article.excerpt}</p>
                                    {article.link ? (
                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn-read-article">
                                            READ ARTICLE <ArrowUpRight size={18} />
                                        </a>
                                    ) : (
                                        <span className="btn-read-article">
                                            READ ARTICLE <ArrowUpRight size={18} />
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 4. Secondary 3 Articles Grid ── */}
                {filteredSecondary.length > 0 && (
                    <section className="secondary-articles-section" aria-label="Secondary Articles Grid">
                        <div className="secondary-articles-container">
                            {filteredSecondary.map(article => (
                                <div key={article.id} className="article-card-secondary">
                                    <div>
                                        <div className="article-meta-row">
                                            <span className="art-tag">{article.category}</span>
                                        </div>
                                        <h4 className="sec-art-title">{article.title}</h4>
                                        <p className="sec-art-excerpt">{article.excerpt}</p>
                                    </div>
                                    {article.link ? (
                                        <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn-sec-read">
                                            READ NOW <ArrowUpRight size={16} />
                                        </a>
                                    ) : (
                                        <span className="btn-sec-read">
                                            READ NOW <ArrowUpRight size={16} />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 5. Newsletter Banner ("Stay Ahead of the Curve") ── */}
                <section className="newsletter-banner-new" aria-labelledby="newsletter-heading">
                    <div className="newsletter-container-new">
                        <div className="section-tag-new center-tag">STAY INFORMED</div>
                        <h2 id="newsletter-heading" className="newsletter-title-new">
                            Stay Ahead of the Curve
                        </h2>
                        <p className="newsletter-subtitle-new">
                            Subscribe to our technical briefing. Published bi-weekly with zero noise, only deep architectural breakdowns.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Vortextsoft Briefing!"); }} className="newsletter-form-inline">
                            <input
                                type="email"
                                placeholder="Enter your work email address..."
                                required
                            />
                            <button type="submit" className="btn-subscribe-pill">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Blog;
