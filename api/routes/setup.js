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
    "imageUrl" TEXT,
    "isVisible" BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Case Studies (Projects)
DROP TABLE IF EXISTS case_studies;
CREATE TABLE IF NOT EXISTS case_studies (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    video VARCHAR(255),
    category VARCHAR(255),
    results TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners Table
DROP TABLE IF EXISTS partners;
CREATE TABLE IF NOT EXISTS partners (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
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
    "jobId" VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    portfolio VARCHAR(255),
    message TEXT,
    "cvLink" TEXT,
    "coverLetterLink" TEXT,
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
    "isRead" BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
