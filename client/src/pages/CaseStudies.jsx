

import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { API_BASE_URL, API_URL } from '../config';
import { Star, Heart } from 'lucide-react';
import '../styles/CaseStudies.css';

const CaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [likedReviews, setLikedReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

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

        if (image) image.style.transform = `translate(${moveX * - 1}px, ${moveY * - 1}px)`;
        if (circle) circle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if (decor1) decor1.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        if (decor2) decor2.style.transform = `translate(${moveX * - 0.5}px, ${moveY * - 0.5}px)`;
    };

    const handleMouseLeave = (e) => {
        const hero = e.currentTarget;
        const elements = hero.querySelectorAll('.hero-main-image, .hero-circle-bg, .hero-decoration-1, .hero-decoration-2');
        elements.forEach(el => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.5s ease-out';
        });
    };

    // Get/set user identifier for likes
    const getUserId = () => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    };

    // Handle like toggle
    const handleLike = async (reviewId) => {
        try {
            const response = await fetch(`${API_URL}/reviews/${reviewId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userIdentifier: getUserId() })
            });
            const data = await response.json();

            // Update like status
            if (data.liked) {
                setLikedReviews([...likedReviews, reviewId]);
            } else {
                setLikedReviews(likedReviews.filter(id => id !== reviewId));
            }

            // Update local state
            setReviews(reviews.map(r =>
                r.id === reviewId
                    ? { ...r, likes_count: data.likes_count }
                    : r
            ));
        } catch (error) {
            console.error('Like failed:', error);
        }
    };

    // Get unique categories
    const getUniqueCategories = () => {
        const categories = caseStudies.map(study => study.category || study.client_type || 'Other');
        return ['All', ...new Set(categories)];
    };

    // Filter case studies by category
    const filteredCaseStudies = selectedCategory === 'All'
        ? caseStudies
        : caseStudies.filter(study =>
            (study.category || study.client_type || 'Other') === selectedCategory
        );

    // Carousel Navigation
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === filteredCaseStudies.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? filteredCaseStudies.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        // Fetch case studies
        api.getCaseStudies()
            .then(data => {
                setCaseStudies(data);
                setLoading(false);
            })
            .catch(err => setLoading(false));

        // Fetch reviews
        fetch(`${API_URL}/reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error('Failed to fetch reviews:', err));
    }, []);

    return (
        <div className="page-container">
            <div
                className="casestudies-hero"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1>Success Stories:<br />Real Results, Real Impact</h1>
                        <p>Discover how we've helped businesses transform their operations and achieve measurable success through innovative technology solutions.</p>
                        <button className="btn-hero" onClick={() => document.getElementById('case-studies-section').scrollIntoView({ behavior: 'smooth' })}>
                            View Case Studies
                        </button>
                    </div>
                    <div className="hero-image-wrapper">
                        <div className="hero-circle-bg"></div>
                        <img src="/casestudies-hero.png" alt="Case Studies" className="hero-main-image" />
                        <div className="hero-decoration-1"></div>
                        <div className="hero-decoration-2"></div>
                    </div>
                </div>
            </div>

            <div className="container section" id="case-studies-section">
                {loading ? <p>Loading...</p> : caseStudies.length === 0 ? (
                    <p>No case studies available yet.</p>
                ) : (
                    <div className="case-studies-carousel">
                        {/* Category Filters */}
                        <div className="category-filters">
                            {getUniqueCategories().map((category) => (
                                <button
                                    key={category}
                                    className={`category - btn ${selectedCategory === category ? 'active' : ''} `}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setCurrentIndex(0);
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Main Display */}
                        <div className="carousel-container">
                            {filteredCaseStudies.map((study, index) => (
                                <div
                                    key={study.id}
                                    className={`case-study-card-horizontal ${index === currentIndex ? 'active' : ''}`}
                                    style={{ display: index === currentIndex ? 'flex' : 'none' }}
                                >
                                    <div className="case-study-image">
                                        {study.hero_image ? (
                                            <div className="image-container">
                                                <img src={study.hero_image.startsWith('http') ? study.hero_image : `${API_BASE_URL}${study.hero_image}`} alt={study.title} />
                                                {study.hero_video && (
                                                    <button
                                                        className="video-play-overlay"
                                                        onClick={() => {
                                                            setCurrentVideo(study.hero_video);
                                                            setVideoModalOpen(true);
                                                        }}
                                                        aria-label="Play video"
                                                    >
                                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                                            <circle cx="40" cy="40" r="40" fill="rgba(0, 200, 204, 0.9)" />
                                                            <path d="M32 25L55 40L32 55V25Z" fill="white" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                        ) : study.hero_video ? (
                                            <video
                                                src={study.hero_video.startsWith('http') ? study.hero_video : `${API_BASE_URL}${study.hero_video}`}
                                                controls
                                                muted
                                                className="case-video"
                                            />
                                        ) : (
                                            <div className="placeholder-image">
                                                <span>No Media</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="case-study-content-horizontal">
                                        <span className="case-category">{study.category || study.client_type || 'TECHNOLOGY'}</span>
                                        <h3>{study.title}</h3>
                                        <div
                                            className="case-description"
                                            dangerouslySetInnerHTML={{ __html: study.subtitle || study.problem_statement }}
                                        />

                                        {study.features && study.features.length > 0 && (
                                            <ul className="case-features">
                                                {study.features.slice(0, 5).map((feature, idx) => (
                                                    <li key={idx}>{feature}</li>
                                                ))}
                                            </ul>
                                        )}

                                        <button className="case-arrow-btn">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Controls */}
                        <div className="carousel-controls">
                            <button className="carousel-btn prev-btn" onClick={prevSlide} aria-label="Previous">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <div className="carousel-pagination">
                                {filteredCaseStudies.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`pagination - dot ${index === currentIndex ? 'active' : ''} `}
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Go to slide ${index + 1} `}
                                    />
                                ))}
                            </div>

                            <button className="carousel-btn next-btn" onClick={nextSlide} aria-label="Next">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Reviews/Testimonials Section */}
            {reviews.length > 0 && (
                <div className="container section" style={{ paddingTop: '4rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', color: '#1a1a1a' }}>
                        What Our Clients Say
                    </h2>
                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        overflowX: 'auto',
                        paddingBottom: '1rem',
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#00C8CC #e0e0e0'
                    }}>
                        {reviews.map(review => (
                            <div key={review.id} style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '16px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                minWidth: '300px',
                                maxWidth: '300px',
                                flexShrink: 0,
                                scrollSnapAlign: 'start'
                            }}>
                                {/* Profile */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {review.profile_image ? (
                                        <img
                                            src={review.profile_image}
                                            alt={review.name}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '3px solid #00C8CC'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #00C8CC, #0094FF)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <div style={{ fontWeight: '600', fontSize: '1.1rem', color: '#1a1a1a' }}>{review.name}</div>
                                        {review.company_name && (
                                            <div style={{ color: '#666', fontSize: '0.9rem' }}>{review.company_name}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Stars */}
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            fill={i < review.star_rating ? '#FFD700' : 'none'}
                                            stroke={i < review.star_rating ? '#FFD700' : '#ddd'}
                                        />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p style={{
                                    color: '#444',
                                    lineHeight: '1.7',
                                    marginBottom: '1.5rem',
                                    fontSize: '1rem',
                                    fontStyle: 'italic'
                                }}>
                                    "{review.review}"
                                </p>

                                {/* Like Button */}
                                <button
                                    onClick={() => handleLike(review.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'none',
                                        border: likedReviews.includes(review.id) ? '1px solid #e74c3c' : '1px solid #e0e0e0',
                                        borderRadius: '20px',
                                        padding: '0.5rem 1rem',
                                        color: likedReviews.includes(review.id) ? '#e74c3c' : '#666',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Heart size={18} fill={likedReviews.includes(review.id) ? '#e74c3c' : 'none'} />
                                    <span>{review.likes_count || 0} {review.likes_count === 1 ? 'like' : 'likes'}</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {videoModalOpen && currentVideo && (
                <div className="video-modal-overlay" onClick={() => setVideoModalOpen(false)}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setVideoModalOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                        <video
                            src={`${API_BASE_URL}${currentVideo} `}
                            controls
                            autoPlay
                            className="modal-video"
                        />
                    </div >
                </div >
            )}
        </div >
    );
};

export default CaseStudies;
