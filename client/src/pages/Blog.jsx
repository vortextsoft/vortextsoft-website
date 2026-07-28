import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Search, TrendingUp, Bookmark, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { api } from '../api';
import SEO from '../components/SEO';
import '../styles/Blog.css';

const CATEGORIES = ['ALL UPDATES', 'CYBERSECURITY', 'QUANTUM COMPUTING', 'AI & ML', 'INFRASTRUCTURE'];

const DEFAULT_FEATURED_ARTICLES = [
    {
        id: 1,
        category: 'SECURITY',
        badgeColor: 'badge-cyan',
        date: '18 / 12 / 2025',
        readTime: '8 MIN READ',
        title: 'Supremacy of Privacy and Security in the Digital Era',
        excerpt: 'Explore the critical importance of data privacy and security in today\'s interconnected world. Learn about the latest threats and best practices to safeguard sensitive information.',
        image: '/blog-hero.png',
        accentColor: '#00C8CC'
    },
    {
        id: 2,
        category: 'HARDWARE',
        badgeColor: 'badge-purple',
        date: '18 / 12 / 2025',
        readTime: '12 MIN READ',
        title: 'Supremacy of Quantum Computers: The New Frontier',
        excerpt: 'Discover how quantum computing is poised to revolutionize industries. Understand the potential of qubits and their impact on optimization, drug discovery, and cryptographic systems.',
        image: '/careers-hero-abstract.png',
        accentColor: '#b6c4ff'
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
    const [bookmarked, setBookmarked] = useState({});

    useEffect(() => {
        api.getBlogPosts()
            .then(data => {
                if (data && data.length > 0) {
                    const formatted = data.map((post, idx) => ({
                        id: post.id || idx,
                        title: post.title,
                        category: (post.tags || post.category || 'SECURITY').toUpperCase(),
                        date: new Date(post.createdAt || Date.now()).toLocaleDateString(),
                        readTime: '8 MIN READ',
                        excerpt: post.excerpt || (post.content ? post.content.substring(0, 140) + '...' : ''),
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

    const toggleBookmark = (id) => {
        setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
    };

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
                                Insights, Updates <span className="highlight-cyan">&amp;</span><br />
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
                                <div className="blog-stat-divider"></div>
                                <div className="blog-stat">
                                    <div className="stat-value">12k</div>
                                    <div className="stat-tag">MONTHLY READERS</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Floating Image Card */}
                        <div className="blog-hero-right">
                            <div className="research-dashboard-card">
                                <img
                                    src="/blog-hero.png"
                                    alt="Active Research Visualization"
                                    className="dash-hero-img"
                                    loading="lazy"
                                />
                                <div className="dashboard-overlay-gradient"></div>
                                <div className="floating-active-research-card">
                                    <div className="active-icon-box">
                                        <TrendingUp size={20} color="#00C8CC" />
                                    </div>
                                    <div className="active-text-box">
                                        <span className="active-label">Active Research</span>
                                        <span className="active-title">Neural Mesh v2.4</span>
                                    </div>
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
                                placeholder="Search insights..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* ── 3. Featured 2 Articles Grid ── */}
                <section className="featured-articles-section" aria-label="Featured Articles">
                    <div className="featured-articles-container">
                        {filteredFeatured.map((article, idx) => (
                            <div key={article.id} className="article-card-featured">
                                <div className="featured-img-frame">
                                    <img src={article.image} alt={article.title} loading="lazy" />
                                    <div className="badge-tag-overlay">
                                        {article.category}
                                    </div>
                                </div>
                                <div className="featured-article-body">
                                    <div className="article-meta-row">
                                        <span>{article.date}</span>
                                        <span className="meta-dot"></span>
                                        <span>{article.readTime}</span>
                                    </div>
                                    <h3 className="art-title">{article.title}</h3>
                                    <p className="art-excerpt">{article.excerpt}</p>

                                    <div className="art-footer-row">
                                        {article.link ? (
                                            <a href={article.link} target="_blank" rel="noopener noreferrer" className="btn-read-article-link">
                                                READ FULL ARTICLE <ArrowRight size={16} />
                                            </a>
                                        ) : (
                                            <span className="btn-read-article-link">
                                                READ FULL ARTICLE <ArrowRight size={16} />
                                            </span>
                                        )}

                                        <button
                                            className={`bookmark-btn ${bookmarked[article.id] ? 'active' : ''}`}
                                            onClick={() => toggleBookmark(article.id)}
                                            title="Bookmark Article"
                                        >
                                            <Bookmark size={18} color={bookmarked[article.id] ? "#00C8CC" : "rgba(186,201,204,0.6)"} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── 4. Secondary 3 Articles Grid ── */}
                {filteredSecondary.length > 0 && (
                    <section className="secondary-articles-section" aria-label="Secondary Technical Audits">
                        <div className="secondary-articles-container">
                            {filteredSecondary.map(article => (
                                <div key={article.id} className="article-card-secondary">
                                    <span className="sec-cat-tag">{article.category}</span>
                                    <h4 className="sec-art-title">{article.title}</h4>
                                    <p className="sec-art-excerpt">{article.excerpt}</p>
                                    <div className="sec-art-footer">
                                        <span className="sec-date">{article.date}</span>
                                        <span className="sec-arrow-icon">
                                            <ArrowRight size={16} color="#00C8CC" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── 5. Pagination Bar ── */}
                <section className="pagination-section" aria-label="Blog Navigation Pages">
                    <div className="pagination-container">
                        <button className="pagination-nav-btn">
                            <ChevronLeft size={18} />
                        </button>
                        <div className="pagination-numbers">
                            <button className="page-num active">01</button>
                            <button className="page-num">02</button>
                            <button className="page-num">03</button>
                            <span className="page-dots">...</span>
                            <button className="page-num">12</button>
                        </div>
                        <button className="pagination-nav-btn">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </section>

                {/* ── 6. Newsletter Banner ("Stay Ahead of the Curve") ── */}
                <section className="newsletter-banner-new" aria-labelledby="newsletter-heading">
                    <div className="newsletter-container-new">
                        <div className="newsletter-gradient-card">
                            <div className="newsletter-left-content">
                                <h2 id="newsletter-heading" className="newsletter-title-new">
                                    Stay Ahead of the Curve
                                </h2>
                                <p className="newsletter-subtitle-new">
                                    Join 10,000+ industry professionals. Receive a weekly curation of deep-tech insights delivered straight to your inbox. No fluff, just precision.
                                </p>
                                <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }} className="newsletter-form-inline">
                                    <input
                                        type="email"
                                        placeholder="professional@company.com"
                                        required
                                    />
                                    <button type="submit" className="btn-subscribe-now">
                                        SUBSCRIBE NOW
                                    </button>
                                </form>
                                <p className="newsletter-footnote">
                                    * We respect your data. Unsubscribe anytime with one click.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Blog;
