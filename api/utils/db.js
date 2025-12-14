const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

// In Netlify Production, we MUST use 'require' to ensure the file is bundled.
// fs.readFile often fails because the file isn't where we expect it in Lambda.
const staticDb = require('../data/db.json');

async function readDb() {
    // If production, return static require data (Read-Only)
    if (process.env.NODE_ENV === 'production' || process.env.NETLIFY) {
        return staticDb;
    }

    // Local Development: Continue using FS so we can update it
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading DB:', error);
        return staticDb; // Fallback
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
