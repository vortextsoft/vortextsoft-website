import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/Blog.css';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getBlogPosts()
            .then(data => {
                setPosts(data.filter(post => post.isVisible));
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    // Hero Animation Logic
    const handleMouseMove = (e) => {
        const hero = e.currentTarget;
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;

        const image = hero.querySelector('.hero-main-image');
        const circle = hero.querySelector('.hero-circle-bg');
        const decor1 = hero.querySelector('.hero-decoration-1');
        const decor2 = hero.querySelector('.hero-decoration-2');

        if (image) image.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
        if (circle) circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if (decor1) decor1.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        if (decor2) decor2.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px)`;
    };

    const handleMouseLeave = (e) => {
        const hero = e.currentTarget;
        const elements = hero.querySelectorAll('.hero-main-image, .hero-circle-bg, .hero-decoration-1, .hero-decoration-2');
        elements.forEach(el => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.5s ease-out';
        });
    };

    return (
        <div className="page-container">
            <div
                className="blog-hero"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>Insights, Updates & Tech News</h1>
                        <p>Explore the latest trends, expert opinions, and company updates from the world of technology and innovation.</p>
                        <button className="btn-hero" onClick={() => document.getElementById('blog-list-section').scrollIntoView({ behavior: 'smooth' })}>
                            Read Our Blog
                        </button>
                    </div>
                    <div className="hero-image-wrapper">
                        <div className="hero-circle-bg"></div>
                        <img src="/blog-hero.png" alt="Blog Hero" className="hero-main-image" />
                        <div className="hero-decoration-1"></div>
                        <div className="hero-decoration-2"></div>
                    </div>
                </div>
            </div>

            <div className="container section" id="blog-list-section">

                {loading ? <p>Loading...</p> : (
                    <div className="blog-list">
                        {posts.length === 0 ? <p>No blog posts available.</p> : null}
                        {posts.map(post => (
                            <div key={post.id} className="blog-item">
                                {post.imageUrl && (
                                    <div className="blog-image">
                                        <img src={`http://localhost:3001${post.imageUrl}`} alt={post.title} />
                                    </div>
                                )}
                                <div className="blog-content">
                                    <h3>{post.title}</h3>
                                    <div className="blog-meta">
                                        <span>{post.publishDate ? new Date(post.publishDate).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                                        <span className="separator">•</span>
                                        <span>{post.tags || "Tech"}</span>
                                    </div>
                                    <p className="blog-excerpt">
                                        {post.content || "No content available."}
                                    </p>
                                    {post.link && (
                                        <button className="read-more-btn" onClick={() => window.open(post.link, '_blank')}>
                                            Read full article
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
