const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool using the DATABASE_URL from Netlify/Neon
// Netlify Neon extension uses NETLIFY_DATABASE_URL
const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false // Required for Neon/Heroku/most cloud DBs
    }
});

// Helper to run queries
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        // console.log('executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Database Error:', error);
        throw error;
    }
};

module.exports = { query };
