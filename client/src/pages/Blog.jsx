import React, { useState } from 'react';
import { ArrowUpRight, Search, Bookmark, ChevronLeft, ChevronRight, TrendingUp, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/Blog.css';

const CATEGORIES = ['ALL UPDATES', 'CYBERSECURITY', 'QUANTUM COMPUTING', 'AI & ML', 'INFRASTRUCTURE'];

const FEATURED_ARTICLES = [
    {
        id: 1,
        category: 'SECURITY',
        date: '18 / 12 / 2025',
        readTime: '8 MIN READ',
        title: 'Supremacy of Privacy and Security in the Digital Era',
        excerpt: 'Explore the critical importance of data privacy and security in today\'s interconnected world. Learn about the latest threats and best practices to safeguard sensitive...',
        image: '/blog-hero.png'
    },
    {
        id: 2,
        category: 'HARDWARE',
        date: '18 / 12 / 2025',
        readTime: '12 MIN READ',
        title: 'Supremacy of Quantum Computers: The New Frontier',
        excerpt: 'Discover how quantum computing is poised to revolutionize industries. Understand the potential of qubits and their impact on optimization, drug discovery, and cryptographic...',
        image: '/careers-hero-abstract.png'
    }
];

const SECONDARY_ARTICLES = [
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
                                <img
                                    src="/casestudies-hero.png"
                                    alt="Active Research Neural Mesh Dashboard"
                                    loading="lazy"
                                />
                                <div className="research-status-badge">
                                    <div className="status-icon"><TrendingUp size={16} color="#00C8CC" /></div>
                                    <div className="status-text">
                                        <span className="status-label">Active Research</span>
                                        <span className="status-title">Neural Mesh v2.4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── 2. Category Filter & Search Bar ── */}
                <section className="blog-filter-section" aria-label="Filter Articles">
                    <div className="blog-filter-container">
                        <div className="blog-categories-bar">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="blog-search-box">
                            <Search size={16} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search insights..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* ── 3. Featured 2 Large Articles Grid ── */}
                <section className="featured-articles-section" aria-label="Featured Articles">
                    <div className="featured-articles-container">
                        {FEATURED_ARTICLES.map(art => (
                            <article key={art.id} className="featured-article-card">
                                <div className="article-image-box">
                                    <img src={art.image} alt={art.title} loading="lazy" />
                                    <span className="article-category-pill">{art.category}</span>
                                </div>
                                <div className="article-card-body">
                                    <div className="article-meta">
                                        {art.date} &nbsp;•&nbsp; {art.readTime}
                                    </div>
                                    <h2 className="article-title">{art.title}</h2>
                                    <p className="article-excerpt">{art.excerpt}</p>
                                    <div className="article-footer-row">
                                        <a href="#read" className="btn-read-article">
                                            READ FULL ARTICLE <ArrowUpRight size={16} />
                                        </a>
                                        <button className="btn-article-action" aria-label="Save Article">
                                            <Bookmark size={16} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ── 4. 3-Column Secondary Articles Grid ── */}
                <section className="secondary-articles-section" aria-label="Secondary Articles">
                    <div className="secondary-articles-container">
                        {SECONDARY_ARTICLES.map(art => (
                            <article key={art.id} className="secondary-article-card">
                                <span className="sec-category">{art.category}</span>
                                <h3 className="sec-title">{art.title}</h3>
                                <p className="sec-excerpt">{art.excerpt}</p>
                                <div className="sec-date">{art.date}</div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* ── 5. Pagination Bar ── */}
                <div className="pagination-bar" aria-label="Pagination">
                    <button className="page-nav-btn"><ChevronLeft size={16} /></button>
                    <button className="page-num-btn active">01</button>
                    <button className="page-num-btn">02</button>
                    <button className="page-num-btn">03</button>
                    <span className="page-ellipsis">...</span>
                    <button className="page-num-btn">12</button>
                    <button className="page-nav-btn"><ChevronRight size={16} /></button>
                </div>

                {/* ── 6. Newsletter Subscription Section ("Stay Ahead of the Curve") ── */}
                <section className="newsletter-banner-section" aria-labelledby="newsletter-heading">
                    <div className="newsletter-banner-container">
                        <div className="newsletter-content-col">
                            <h2 id="newsletter-heading" className="newsletter-title">
                                Stay Ahead of the Curve
                            </h2>
                            <p className="newsletter-subtitle">
                                Join 10,000+ industry professionals. Receive a weekly curation of deep-tech insights delivered straight to your inbox. No fluff, just precision.
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="newsletter-form-inline">
                                <input
                                    type="email"
                                    placeholder="professional@company.com"
                                    required
                                />
                                <button type="submit" className="btn-subscribe-cyan">
                                    SUBSCRIBE NOW
                                </button>
                            </form>
                            <div className="newsletter-disclaimer">
                                * We respect your data. Unsubscribe anytime with one click.
                            </div>
                        </div>

                        {/* Right Icon Graphic */}
                        <div className="newsletter-graphic-col" aria-hidden="true">
                            <div className="book-icon-outer-ring">
                                <BookOpen size={40} color="#00C8CC" />
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default Blog;
