const express = require('express');
const router = express.Router();
const db = require('../utils/sql');
const { v4: uuidv4 } = require('uuid');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// GET single post
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
});

// POST (Create) post
router.post('/', async (req, res) => {
    try {
        const { title, excerpt, content, author, image, category, tags, published } = req.body;
        const id = uuidv4();

        const query = `
            INSERT INTO blog_posts (id, title, excerpt, content, author, image, category, tags, published)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [id, title, excerpt, content, author, image, category, tags, published !== undefined ? published : true];

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('SQL Error:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
});

// PUT (Update) post
router.put('/:id', async (req, res) => {
    try {
        const { title, excerpt, content, author, image, category, tags, published } = req.body;

        const query = `
            UPDATE blog_posts 
            SET title = $1, excerpt = $2, content = $3, author = $4, image = $5, category = $6, tags = $7, published = $8
            WHERE id = $9
            RETURNING *
        `;
        const values = [title, excerpt, content, author, image, category, tags, published, req.params.id];

        const result = await db.query(query, values);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update item' });
    }
});

// PATCH (Update Partial)
router.patch('/:id', async (req, res) => {
    // For simplicity in this migration, we'll reuse the PUT logic or generic update
    // But typically PATCH handles partials. 
    // Given the previous code just did a merge, let's stick to the previous pattern but we need all fields for the SQL Update unless we build it dynamically.
    // For now, let's assume the frontend sends the full object or we instruct to use PUT.
    // OR we can implement a dynamic query builder.
    try {
        // Dynamic Update
        const fields = Object.keys(req.body);
        if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

        const setClause = fields.map((field, idx) => `${field} = $${idx + 2}`).join(', ');
        const values = [req.params.id, ...Object.values(req.body)];

        const query = `UPDATE blog_posts SET ${setClause} WHERE id = $1 RETURNING *`;

        // Note: This is risky for SQL injection if keys aren't sanitized, but purely internal admin API is strictly controlled.
        // Better to be explicit if possible, but for 'patch' generic behavior:

        // Safe approach: only map known columns
        const allowed = ['title', 'excerpt', 'content', 'author', 'image', 'category', 'tags', 'published'];
        const validFields = fields.filter(f => allowed.includes(f));
        if (validFields.length === 0) return res.status(400).json({ error: 'No valid fields' });

        const safeSet = validFields.map((f, i) => `${f} = $${i + 2}`).join(', ');
        const safeValues = [req.params.id, ...validFields.map(f => req.body[f])];

        const result = await db.query(`UPDATE blog_posts SET ${safeSet} WHERE id = $1 RETURNING *`, safeValues);

        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });
        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update item' });
    }
});


// DELETE post
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM blog_posts WHERE id = $1 RETURNING id', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Item not found' });

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
