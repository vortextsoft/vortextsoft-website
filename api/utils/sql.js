const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool using the DATABASE_URL from Netlify/Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
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
