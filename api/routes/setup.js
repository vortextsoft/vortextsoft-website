const express = require('express');
const router = express.Router();
const db = require('../utils/sql');

const schemaSql = `
-- Users Table
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
DROP TABLE IF EXISTS services;
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    order_position INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Table
DROP TABLE IF EXISTS team;
CREATE TABLE IF NOT EXISTS team (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    email VARCHAR(255),
    "shortDescription" TEXT,
    "profileImage" TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
DROP TABLE IF EXISTS blog_posts;
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    tags TEXT,
    link VARCHAR(255),
    image_url TEXT,
    is_visible BOOLEAN DEFAULT true,
    excerpt TEXT,
    author VARCHAR(255),
    category VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Case Studies (Projects)
DROP TABLE IF EXISTS case_studies;
CREATE TABLE IF NOT EXISTS case_studies (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    client_name VARCHAR(255),
    client_type VARCHAR(255),
    category VARCHAR(255),
    description TEXT,
    problem_statement TEXT,
    solution TEXT,
    results TEXT,
    features TEXT[],
    hero_image TEXT,
    hero_video TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners Table
DROP TABLE IF EXISTS partners;
CREATE TABLE IF NOT EXISTS partners (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Careers (Job Openings) Table
DROP TABLE IF EXISTS careers;
CREATE TABLE IF NOT EXISTS careers (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    location VARCHAR(100),
    description TEXT,
    responsibilities TEXT,
    requirements TEXT,
    "isOpen" BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages (Contact Form)
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(100),
    message TEXT NOT NULL,
    replied BOOLEAN DEFAULT false,
    "repliedAt" TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications (Job Applications)
DROP TABLE IF EXISTS applications;
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(255) PRIMARY KEY,
    job_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    portfolio VARCHAR(255),
    message TEXT,
    cv_link TEXT,
    cover_letter_link TEXT,
    position VARCHAR(255),
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meetings
DROP TABLE IF EXISTS meetings;
CREATE TABLE IF NOT EXISTS meetings (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date VARCHAR(50),
    time VARCHAR(50),
    topic VARCHAR(255),
    reason TEXT,
    status VARCHAR(50) DEFAULT 'pending', 
    is_read BOOLEAN DEFAULT false,
    meeting_link VARCHAR(255),
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews/Testimonials (drop review_likes first due to foreign key)
DROP TABLE IF EXISTS review_likes;
DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    review TEXT NOT NULL,
    star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
    profile_image TEXT,
    order_position INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review Likes
CREATE TABLE IF NOT EXISTS review_likes (
    id SERIAL PRIMARY KEY,
    review_id VARCHAR(255) REFERENCES reviews(id) ON DELETE CASCADE,
    user_identifier VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(review_id, user_identifier)
);

-- Initial Admin User
INSERT INTO users (email, password) 
VALUES ('admin@vortextsoft.com', 'admin')
ON CONFLICT (email) DO NOTHING;
`;

router.get('/', async (req, res) => {
    try {
        await db.query(schemaSql);
        res.send('Database RESET and initialized successfully! Table structures matched to DB.json.');
    } catch (error) {
        console.error('Setup Error:', error);
        res.status(500).send(`Setup failed: ${error.message}`);
    }
});

module.exports = router;
