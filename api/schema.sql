-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    icon VARCHAR(255),
    image VARCHAR(255),
    features TEXT[], -- Array of strings
    technologies TEXT[], -- Array of strings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Table
CREATE TABLE IF NOT EXISTS team (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    email VARCHAR(255),
    shortDescription TEXT,
    profileImage TEXT,
    linkedin VARCHAR(255),
    github VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT,
    author VARCHAR(255),
    image VARCHAR(255),
    category VARCHAR(255),
    tags TEXT[],
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Case Studies (Projects)
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
CREATE TABLE IF NOT EXISTS partners (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Careers (Job Openings) Table
CREATE TABLE IF NOT EXISTS careers (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- Full-time, Part-time
    location VARCHAR(100), -- Remote, Hybrid, On-site
    description TEXT,
    requirements TEXT[],
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages (Contact Form)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Applications (Job Applications)
CREATE TABLE IF NOT EXISTS applications (
    id VARCHAR(255) PRIMARY KEY,
    job_id VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    linkedin VARCHAR(255),
    portfolio VARCHAR(255),
    resume VARCHAR(255), -- URL to file
    cover_letter TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Meetings
CREATE TABLE IF NOT EXISTS meetings (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date VARCHAR(50),
    time VARCHAR(50),
    topic VARCHAR(255),
    reason TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
    is_read BOOLEAN DEFAULT false,
    meeting_link VARCHAR(255),
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Admin User (Default: admin / admin)
INSERT INTO users (email, password) 
VALUES ('admin@vortextsoft.com', 'admin')
ON CONFLICT (email) DO NOTHING;
