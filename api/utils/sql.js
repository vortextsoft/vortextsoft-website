const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool using the DATABASE_URL from Netlify/Neon
// Netlify Neon extension uses NETLIFY_DATABASE_URL
// Connection priority: Unpooled (transaction mode) > Pooled > Standard > Fallback
const connectionString = process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL;

if (!connectionString) {
    console.error("CRITICAL: No database connection string found! Checked NETLIFY_DATABASE_URL_UNPOOLED, NETLIFY_DATABASE_URL, DATABASE_URL.");
} else {
    console.log("Database connection string found (masked):", connectionString.replace(/:[^:]*@/, ':****@'));
}

const pool = new Pool({
    connectionString,
    ssl: connectionString && connectionString.includes('localhost') ? false : {
        rejectUnauthorized: false
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
