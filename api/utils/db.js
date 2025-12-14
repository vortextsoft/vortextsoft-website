const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        // Return default structure if read fails
        return {
            services: [],
            caseStudies: [],
            blogPosts: [],
            team: [],
            jobs: [],
            applications: [],
            messages: [],
            users: [],
            partners: []
        };
    }
}

async function writeDb(data) {
    // In Serverless/Vercel (Production), we cannot write to files.
    if (process.env.NODE_ENV === 'production') {
        console.warn('Write operation ignored: Serverless mode is Read-Only.');
        return; // Do nothing, pretending it worked
    }

    try {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing DB:', error);
        throw error;
    }
}

module.exports = { readDb, writeDb };
